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
};

async function createTypes() {
  const sqlQuery = fs.readFileSync("lib/server/getSQLTables.sql").toString();

  const conn = await pool.getConnection();

  const allColumns = await conn.query(sqlQuery);

  await conn.end();

  const newTables = {};

  allColumns.sort(
    (a, b) => Number(a.ORDINAL_POSITION) - Number(b.ORDINAL_POSITION)
  );

  for (const column of allColumns) {
    const {
      TABLE_NAME: table,
      COLUMN_NAME: name,
      DATA_TYPE: type,
      REFERENCED_TABLE_NAME: ref_table_name,
      REFERENCED_COLUMN_NAME: ref_col_name,
      COLUMN_DEFAULT: _default,
    } = column;

    if (!newTables[table]) newTables[table] = {};

    let nullable = "";
    if (column.IS_NULLABLE === "YES") nullable = "?";

    newTables[table][name + nullable] = datatypes[type];
    if (ref_col_name)
      newTables[table][
        name + nullable
      ] = `${ref_table_name}["${ref_col_name}"]`;
  }

  fs.writeFileSync(`lib/server/types.ts`, "");

  for (let newTable in newTables) {
    let tableString = `export interface ${newTable} {\n`;

    for (let column in newTables[newTable]) {
      tableString += `  ${column}: ${newTables[newTable][column]};\n`;
    }

    tableString += "}\n\n";

    fs.writeFileSync(`lib/server/types.ts`, tableString, { flag: "a" });
  }
}

createTypes().then(() => {
  process.exit();
});
