import fs from "fs";
import mariadb from "mariadb";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const dbUrl = mariadb.defaultOptions(process.env.DATABASE_URL);

const pool = mariadb.createPool({ ...dbUrl, bigIntAsNumber: true });

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
    .sort((a, b) => a.pos - b.pos)
    .sort((a, b) => a.table.localeCompare(b.table));

  for (const column of allColumns) {
    let { table, name, type, ref_table, ref_col } = column;

    allTables.push(table);

    if (table !== "statuses") table = table.slice(0, -1);
    else table = "status";
    if (ref_table && ref_table !== "statuses")
      ref_table = ref_table.slice(0, -1);
    else ref_table = "status";

    newTables[table] ??= {};

    if (column.nullable) name += "?";

    newTables[table][name] = datatypes[type];

    if (name == "uuid") newTables[table][name] = "UUID";

    if (ref_col) {
      newTables[table][name] = `${ref_table}["uuid"]`;

      // console.log(name.replace("_uuid", ""), ref_col);

      // (reffingTables[table] ??= {})[name.replace("_uuid", "")] = ref_col;
      (reffingTables[table] ??= {})[ref_table] = ref_col;
      (reffedTables[ref_table] ??= {})[table] = ref_col;
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
    `type Tables =${allTables.map((table) => `\n  | "${table}"`).join("")};\n`
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

    // Object.entries(tables[newTable] || {}).forEach(([table, column]) => {
    //   console.log(newTable, table, column);
    // });

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
