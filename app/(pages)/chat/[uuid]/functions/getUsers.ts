export async function getUsers(): Promise<user[]> {
  const conn = await pool.getConnection();
  try {
    const Users = await getTable<user>("users", {
      exclude: ["messages", "chatroom_members", "friendships"] as never[],
    });

    return Users;
  } catch (error) {
    console.error(error);

    await conn.rollback();
    throw error;
  } finally {
    await conn.release();
  }
}

async function getTable<T>(
  table: Tables,
  options: {
    exclude?: (keyof T)[] | (keyof T)[];
  } = {}
): Promise<T[]> {
  const conn = await pool.getConnection();

  try {
    const result = await conn.query(`SELECT * FROM ${table}`);
    const relatedTables = await conn.query(`SELECT 
    t.TABLE_NAME,
    c.COLUMN_NAME,
    k.REFERENCED_COLUMN_NAME
FROM
    INFORMATION_SCHEMA.TABLES t
        LEFT JOIN
    INFORMATION_SCHEMA.COLUMNS c ON t.TABLE_SCHEMA = c.TABLE_SCHEMA
        AND t.TABLE_NAME = c.TABLE_NAME
        LEFT JOIN
    INFORMATION_SCHEMA.KEY_COLUMN_USAGE k ON c.TABLE_SCHEMA = k.TABLE_SCHEMA
        AND c.TABLE_NAME = k.TABLE_NAME
        AND c.COLUMN_NAME = k.COLUMN_NAME
        LEFT JOIN
    INFORMATION_SCHEMA.TABLE_CONSTRAINTS n ON k.CONSTRAINT_SCHEMA = n.CONSTRAINT_SCHEMA
        AND k.CONSTRAINT_NAME = n.CONSTRAINT_NAME
        AND k.TABLE_SCHEMA = n.TABLE_SCHEMA
        AND k.TABLE_NAME = n.TABLE_NAME
WHERE
    t.TABLE_SCHEMA = 'chatapp'
    AND k.REFERENCED_TABLE_NAME = '${table}'`);

    for (const row of relatedTables) {
      const name = row.TABLE_NAME as never;
      if (options.exclude?.includes(name)) continue;
      const rowData = await conn.query(`SELECT * FROM ${row.TABLE_NAME}`);

      result[row.TABLE_NAME] = rowData;
    }

    return result;
  } catch (error) {
    console.error(error);

    await conn.rollback();
    throw error;
  } finally {
    await conn.release();
  }
}
