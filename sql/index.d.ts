interface FetchResults {
  table: Tables;
  name: string;
  pos: number;
  type: "varchar" | "text" | "int" | "datetime" | "tinyint" | "uuid";
  ref_table?: Tables;
  ref_col?: string;
  nullable: boolean;
}

interface AllTables {
  table: SingularTables;
  columns: { key: string; type: string }[];
  reffing: { key: string; type: string }[];
  reffed: { key: string; type: string }[];
}

type Singular<T extends string> = T extends "statuses"
  ? "status"
  : T extends `${infer U}s`
  ? U
  : T;

type SingularTables = {
  [K in Tables]: Singular<K>;
}[Tables];
