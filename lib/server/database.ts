import mysql from "mysql2/promise";

export const getDB = async () => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "test",
  });

  return connection;
};
