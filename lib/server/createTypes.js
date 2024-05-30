import fs from "fs";
import mariadb from "mariadb";
import dotenv from "dotenv";

dotenv.config();

const pool = mariadb.createPool(process.env.DATABASE_URL);

const datatypes = {
  varchar: "string",
  text: "string",
  int: "number",
  datetime: "Date",
  tinyint: "boolean",
  uuid: "UUID",
};

async function createTypes() {
  const sqlQuery = fs.readFileSync("lib/server/getSQLTables.sql").toString();

  const conn = await pool.getConnection();

  const allColumns = await conn.query(sqlQuery);

  await conn.end();

  const newTables = {};
  const reffingTables = {};
  const reffedTables = {};

  allColumns
    .sort((a, b) => Number(a.ORDINAL_POSITION) - Number(b.ORDINAL_POSITION))
    .sort((a, b) => a.TABLE_NAME.localeCompare(b.TABLE_NAME));

  for (const column of allColumns) {
    let {
      TABLE_NAME: table,
      COLUMN_NAME: name,
      DATA_TYPE: type,
      REFERENCED_TABLE_NAME: ref_table_name,
      REFERENCED_COLUMN_NAME: ref_col_name,
      COLUMN_DEFAULT: _default,
    } = column;

    if (!newTables[table]) newTables[table] = {};

    name += column.IS_NULLABLE === "NO" ? "" : "?";

    newTables[table][name] = datatypes[type];

    if (name == "uuid") newTables[table][name] = "UUID";

    if (ref_col_name) {
      if (!reffingTables[table]) reffingTables[table] = {};
      reffingTables[table][ref_table_name] = ref_col_name;

      if (!reffedTables[ref_table_name]) reffedTables[ref_table_name] = {};
      reffedTables[ref_table_name][table] = ref_col_name;
    }
  }

  for (let [table, value] of Object.entries(reffingTables)) {
    newTables[table]["space1"] = "";
    for (let refTable in value) {
      let trimS = refTable.slice(0, -1);
      if (refTable == "statuses") trimS = "status";

      newTables[table][trimS] = refTable;
    }
  }

  for (let [table, value] of Object.entries(reffedTables)) {
    newTables[table]["space2"] = "";
    for (let refTable in value) {
      newTables[table][refTable] = `${refTable}[]`;
    }
  }

  fs.writeFileSync(
    `lib/server/types.ts`,
    "type UUID = `${string}-${string}-${string}-${string}-${string}`;\n\n"
  );

  for (let newTable in newTables) {
    let tableString = `export interface ${newTable} {\n`;

    for (let column in newTables[newTable]) {
      if (column.startsWith("space")) {
        tableString += "\n";
        continue;
      }

      tableString += `  ${column}: ${newTables[newTable][column]};\n`;
    }

    tableString += "}\n\n";

    fs.writeFileSync(`lib/server/types.ts`, tableString, { flag: "a" });
  }
}

createTypes().then(() => {
  process.exit();
});
