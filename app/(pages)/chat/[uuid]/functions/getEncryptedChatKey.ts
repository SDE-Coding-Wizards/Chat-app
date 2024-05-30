import { getPool } from "@/lib/server/database";

export async function getEncryptedChatKey(
  chatroom_uuid: string,
  user_uuid: string
): Promise<string> {
  const conn = await getPool();

  let [{ chat_key = "" } = {}] = await conn.query(
    "SELECT chat_key FROM chatroom_members WHERE chatroom_uuid = ? AND user_uuid = ?",
    [chatroom_uuid, user_uuid]
  );

  await conn.release();

  return chat_key;
}