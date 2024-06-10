"use server";

import { encryptKey, generateKey } from "../utils/key";
import { pool } from "../lib/server/database";

export type createChatParams = (
  creator: user,
  members: user[],
  name?: string
) => Promise<chatroom>;

export const createChat: createChatParams = async (creator, members, name) => {
  "use server";
  const conn = await pool.getConnection();

  conn.beginTransaction();

  try {
    const [newChatroom]: chatroom[] = await conn.execute(
      "INSERT INTO chatrooms (uuid, name) VALUES (uuid(), ?) RETURNING *",
      [name]
    );

    const chat_key = generateKey();

    const insertList = [creator, ...members].map((member) => [
      member.uuid,
      newChatroom.uuid,
      encryptKey(chat_key, member.public_key),
    ]);

    await conn.batch(
      "INSERT INTO chatroom_members (uuid, user_uuid, chatroom_uuid, chat_key) VALUES (uuid(), ?, ?, ?) RETURNING *",
      insertList
    );

    await conn.commit();
    return newChatroom;
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    await conn.release();
  }
};
