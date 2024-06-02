import fs from "fs";
import mariadb from "mariadb";
import dotenv from "dotenv";
import path from "path";

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

const typesPath = path.join(import.meta.dirname, "types");

async function createTypes() {
  const sqlQuery = fs
    .readFileSync(path.join(import.meta.dirname, "getSQLTables.sql"))
    .toString();

  const allColumns = await pool.query(sqlQuery);

  const newTables = {};
  const reffingTables = {};
  const reffedTables = {};

  let allTables = [];

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

    allTables.push(table);

    if (table !== "statuses") table = table.slice(0, -1);
    else table = "status";
    if (ref_table_name && ref_table_name !== "statuses")
      ref_table_name = ref_table_name.slice(0, -1);
    else ref_table_name = "status";

    if (!newTables[table]) newTables[table] = {};

    name += column.IS_NULLABLE === "NO" ? "" : "?";

    newTables[table][name] = datatypes[type];

    if (name == "uuid") newTables[table][name] = "UUID";

    if (ref_col_name) {
      newTables[table][name] = `${ref_table_name}["uuid"]`;

      if (!reffingTables[table]) reffingTables[table] = {};
      reffingTables[table][ref_table_name] = ref_col_name;

      if (!reffedTables[ref_table_name]) reffedTables[ref_table_name] = {};
      reffedTables[ref_table_name][table] = ref_col_name;
    }
  }

  for (let [table, value] of Object.entries(reffingTables)) {
    newTables[table]["space1"] = "";
    for (let refTable in value) {
      newTables[table][refTable] = refTable;
    }
  }

  for (let [table, value] of Object.entries(reffedTables)) {
    newTables[table]["space2"] = "";
    for (let refTable in value) {
      newTables[table][refTable + "s"] = `${refTable}[]`;
    }
  }

  if (!fs.existsSync(typesPath)) fs.mkdirSync(typesPath);

  fs.writeFileSync(
    typesPath + `/uuid.d.ts`,
    "type UUID = `${string}-${string}-${string}-${string}-${string}`;"
  );

  allTables = [...new Set(allTables)];

  fs.writeFileSync(
    typesPath + "/tables.d.ts",
    `type Tables = "${allTables.join('" | "')}";`
  );

  for (let newTable in newTables) {
    let tableString = `interface ${newTable} {\n`;

    for (let column in newTables[newTable]) {
      if (column.startsWith("space")) {
        tableString += "\n";
        continue;
      }

      tableString += `  ${column}: ${newTables[newTable][column]};\n`;
    }

    tableString += "}\n";

    fs.writeFileSync(typesPath + `/${newTable}.d.ts`, tableString);
  }
}

createTypes().then(() => {
  process.exit();
});
