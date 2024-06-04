import mariadb from "mariadb";
const DATABASE_URL: string = process.env.DATABASE_URL!;

declare global {
  var pool: mariadb.Pool;
}

const options = mariadb.defaultOptions(DATABASE_URL);

export const pool =
  globalThis.pool ||
  mariadb.createPool({
    ...options,
    connectionLimit: 3,
  });

if (process.env.NODE_ENV !== "production") globalThis.pool = pool;
