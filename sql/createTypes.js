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

    newTables[table] ??= {};

    name += column.IS_NULLABLE === "NO" ? "" : "?";

    newTables[table][name] = datatypes[type];

    if (name == "uuid") newTables[table][name] = "UUID";

    if (ref_col_name) {
      newTables[table][name] = `${ref_table_name}["uuid"]`;

      (reffingTables[table] ??= {})[ref_table_name] = ref_col_name;
      (reffedTables[ref_table_name] ??= {})[table] = ref_col_name;
    }
  }

  if (fs.existsSync(typesPath)) fs.rmSync(typesPath, { recursive: true });

  fs.mkdirSync(typesPath);

  fs.writeFileSync(
    typesPath + `/uuid.d.ts`,
    "type UUID = `${string}-${string}-${string}-${string}-${string}`;"
  );

  allTables = [...new Set(allTables)];

  fs.writeFileSync(
    typesPath + "/tables.d.ts",
    `type Tables =${allTables.map((table) => `\n  | "${table}"`).join("")};
    `
  );

  function tablesString(newTable, type = "reffing") {
    let tables, name, s, l;

    if (type === "reffed") {
      tables = reffedTables;
      name = "referenced";
      s = "s";
      l = "[]";
    } else {
      tables = reffingTables;
      name = "referencing";
      s = "";
      l = "";
    }

    let returnString = `export interface ${name} {`;
    if (!tables[newTable]) return returnString + "}";

    returnString += "\n    ";
    returnString += Object.keys(tables[newTable] || {})
      .map((table) => `${table + s}: ${table + l};`)
      .join("\n    ");

    return returnString + "\n  }";
  }

  for (let newTable in newTables) {
    let tableString = `\
declare namespace ${newTable} {
  ${tablesString(newTable, "reffing")}

  ${tablesString(newTable, "reffed")}
}

interface ${newTable} extends ${newTable}.referencing, ${newTable}.referenced {
  ${Object.entries(newTables[newTable])
    .map(([column, value]) => `${column}: ${value};`)
    .join("\n  ")}
}
`;

    fs.writeFileSync(typesPath + `/${newTable}.d.ts`, tableString);
  }
}

createTypes().then(() => {
  process.exit();
});
