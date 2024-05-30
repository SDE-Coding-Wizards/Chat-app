import mariadb from "mariadb";
const DATABASE_URL: string | undefined = process.env.DATABASE_URL!;

//for creating a single querey
export const getClient = async () => {
  const connection = await mariadb.createConnection(DATABASE_URL);

  return connection;
};

const pool = mariadb.createPool(DATABASE_URL);

let conn: mariadb.PoolConnection;

//for multiple queries
export async function getPool() {
  if (conn) return conn;

  try {
    conn = await pool.getConnection();
    console.log("Successfully connected to the database");
    return conn;
  } catch (err) {
    const error = err as mariadb.SqlError;
    console.error("Unable to connect to the database:", error.sqlMessage);
    if (conn) conn.release();
    throw err;
  }
}
