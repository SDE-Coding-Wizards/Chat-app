"use server";

import { pool } from "@/lib/server/database";

export async function createUser(user: user): Promise<user> {
  const conn = await pool.getConnection();

  conn.beginTransaction();

  return new Promise(async (resolve, reject) => {
    try {
      const [newUser]: user[] = await conn.execute(
        "INSERT IGNORE INTO users (uuid, email, firstname, lastname, image_path, public_key, private_key) VALUES (?, ?, ?, ?, ?, ?, ?) RETURNING *",
        [
          user.uuid,
          user.email,
          user.firstname,
          user.lastname,
          user.image_path,
          user.public_key,
          user.private_key,
        ]
      );

      await conn.commit();

      return resolve(newUser);
    } catch (error) {
      await conn.rollback();

      console.error(error);

      reject(error);
    } finally {
      await conn.release();
    }
  });
}
