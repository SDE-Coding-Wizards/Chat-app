import mysql from "mysql2/promise";
const DATABASE_URL: string | undefined = process.env.DATABASE_URL!;

//for creating a single querey
export const getClient = async () => {
  const connection = await mysql.createConnection({
    uri: DATABASE_URL,
  });

  return connection;
};

//for multiple queries
export const getPool = async () => {
  const pool = await mysql.createPool({
    uri: DATABASE_URL,
  });

  return pool;
};
