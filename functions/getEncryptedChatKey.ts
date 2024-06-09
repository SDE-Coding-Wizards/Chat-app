"use server"

export async function getEncryptedChatKey(
  chatroom_uuid: string,
  user_uuid: string
): Promise<string> {
  let [{ chat_key = "" } = {}] = await pool.query(
    "SELECT chat_key FROM chatroom_members WHERE chatroom_uuid = ? AND user_uuid = ?",
    [chatroom_uuid, user_uuid]
  );

  return chat_key;
}
