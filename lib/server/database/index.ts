import mariadb from "mariadb";
const DATABASE_URL: string | undefined = process.env.DATABASE_URL!;

//for creating a single querey
export const getClient = async () => {
  const connection = await mariadb.createConnection(DATABASE_URL);

  return connection;
};

