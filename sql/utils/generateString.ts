export function generateString(
  table: AllTables,
  stringType: "reffing" | "reffed"
): string {
  const intf = stringType === "reffing" ? "referencing" : "referenced";

  let string = `  export interface ${intf} {\n`;

  for (let { key, type } of table[stringType]) {
    string += `    ${key}: ${type};\n`;
  }

  string += "  }\n";

  if (table[stringType].length == 0) string = `  export interface ${intf} {}\n`;

  return string;
}
