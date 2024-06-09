export function toSingular(table: Tables): SingularTables {
  if (table === "statuses") return "status";
  return table.slice(0, -1) as SingularTables;
}