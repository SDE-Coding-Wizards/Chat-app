import { getPool } from "@/lib/server/database";
import type { Message } from "@/types";

export async function sendMessage(
  uuid: string,
  message: Message,
  chatroom_uuid: string,
  author_uuid: string
): Promise<Message> {
  "use server";

  const conn = await getPool();

  conn.beginTransaction();

  return new Promise(async (resolve, reject) => {
    try {
      const [newContent] = await conn.execute(
        "INSERT INTO contents (uuid, content_type_id, content) VALUES (UUID(), ?, ?) RETURNING *",
        [1, message.content!.content]
      );

      const [newMessage] = await conn.execute(
        "INSERT INTO messages (uuid, chatroom_uuid, content_uuid, author_uuid, iv) VALUES (?, ?, ?, ?, ?) RETURNING *",
        [uuid, chatroom_uuid, newContent.uuid, author_uuid, message.iv]
      );

      await conn.commit();

      newMessage.content = newContent;

      return resolve(newMessage);
    } catch (error) {
      await conn.rollback();

      console.log(error);

      reject(error);
    } finally {
      await conn.end();
    }
  });
}
