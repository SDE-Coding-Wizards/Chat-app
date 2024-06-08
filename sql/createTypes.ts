import fs from "fs";
import mariadb from "mariadb";
import dotenv from "dotenv";
import path from "path";
import datatypes from "./datatypes.json";
import { toSingular, generateString } from "./utils";

dotenv.config();

const dbUrl = mariadb.defaultOptions(process.env.DATABASE_URL);
const pool = mariadb.createPool({ ...dbUrl, bigIntAsNumber: true });

const typesPath = path.join(import.meta.dirname, "types");
const sqlPath = path.join(import.meta.dirname, "getSQLTables.sql");

const sqlQuery = fs.readFileSync(sqlPath).toString();

async function createTypes() {
  const fetchResults: FetchResults[] = await pool.query(sqlQuery);

  fetchResults.sort((a, b) => a.pos - b.pos);
  fetchResults.sort((a, b) => a.table.localeCompare(b.table));

  const allTables: AllTables[] = [
    ...new Set(fetchResults.map(({ table }) => table)),
  ].map((table) => ({
    table: toSingular(table),
    columns: [],
    reffing: [],
    reffed: [],
  }));

  for (const column of fetchResults) {
    let { table, name, type, ref_table, ref_col, nullable, pos } = column;

    let newTable = toSingular(table);

    if (nullable) name += "?";

    let newType = datatypes[type];
    if (name == "uuid") newType = "UUID";
    if (ref_table) newType = toSingular(ref_table) + `["${ref_col}"]`;

    let findTable = allTables.find(({ table }) => table === newTable)!;

    findTable.columns[pos - 1] = {
      key: name,
      type: newType,
    };

    if (ref_table) {
      const newName = name.replace("_uuid", "").replace("_id", "");

      findTable.reffing.push({
        key: newName,
        type: toSingular(ref_table),
      });

      const reffedTable = allTables.find(
        ({ table }) => table == toSingular(ref_table!)
      )!;

      if (reffedTable.reffed.find(({ key }) => key == table)) continue;
      reffedTable.reffed.push({ key: table!, type: newTable + "[]" });
    }
  }

  if (!fs.existsSync(typesPath)) fs.mkdirSync(typesPath);

  for (let table of allTables) {
    let reffings = generateString(table, "reffing");
    let reffeds = generateString(table, "reffed");

    let columns = `interface ${table.table} extends ${table.table}.referencing, ${table.table}.referenced {\n`;

    for (let { key, type } of table.columns) {
      columns += `  ${key}: ${type};\n`;
    }

    columns += "}\n";

    const finalString =
      `declare namespace ${table.table} {\n` +
      reffings +
      "\n" +
      reffeds +
      "}\n\n" +
      columns;

    fs.writeFileSync(typesPath + `/${table.table}.d.ts`, finalString);
  }

  fs.writeFileSync(
    typesPath + "/tables.d.ts",
    `type Tables =${[...new Set(fetchResults.map(({ table }) => table))]
      .map((table) => `\n  | "${table}"`)
      .join("")};\n`
  );

  const UUID = "`${string}-${string}-${string}-${string}-${string}`";
  fs.writeFileSync(typesPath + "/uuid.d.ts", `type UUID = ${UUID};\n`);

  return null;
}

createTypes().then(process.exit);
