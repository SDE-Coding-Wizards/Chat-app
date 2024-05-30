import { Chatroom, User } from "@/types";
import axios from "axios";
import { encryptKey, generateKey } from "../utils/key";
import { getPool } from "@/lib/server/database";

export type createChatParams = (
  creator: User,
  members: User[],
  name?: string
) => Promise<Chatroom>;

export const createChat: createChatParams = async (creator, members, name) => {
  "use server";
  const conn = await getPool();

  conn.beginTransaction();

  const [newChatroom]: Chatroom[] = await conn.execute(
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
  await conn.release();

  return newChatroom;
};
