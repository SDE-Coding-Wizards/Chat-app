import mariadb from "mariadb";

declare global {
  var pool: mariadb.Pool;
}

export const pool = globalThis.pool = mariadb.createPool(process.env.DATABASE_URL!);
if (process.env.NODE_ENV !== "production") globalThis.pool = pool;