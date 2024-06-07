"use server"

import { getUser } from "@/helpers";

export async function addFriend(user_email: any) {
  if (!user_email) return;

  const user = await getUser();
  if (!user) return;

  const conn = await pool.getConnection();

  const [receiver] = await conn.query(
    "SELECT uuid FROM users WHERE email = ?",
    [user_email]
  );

  if (!receiver.uuid) return;

  conn.execute(
    "INSERT INTO friend_requests (uuid, sender_uuid, receiver_uuid) VALUES (uuid(), ?, ?)",
    [user.uuid, receiver.uuid]
  );

  conn.release();

  return true
}
