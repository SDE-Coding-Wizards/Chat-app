import mariadb from "mariadb";
const DATABASE_URL: string | undefined = process.env.DATABASE_URL!;

//for creating a single querey
export const getClient = async () => {
  const connection = await mariadb.createConnection(DATABASE_URL);

  return connection;
};

let pool: mariadb.Pool | null = null;

//for multiple queries
export const getPool = async () => {
  if (pool) return pool.getConnection();

  pool = mariadb.createPool(DATABASE_URL);

  return await pool.getConnection();
};
