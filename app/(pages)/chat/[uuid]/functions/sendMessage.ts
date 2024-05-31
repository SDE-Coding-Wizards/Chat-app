export async function sendMessage(
  uuid: string,
  message: message,
  chatroom_uuid: string,
  author_uuid: string
): Promise<message> {
  "use server";

  const conn = await pool.getConnection();

  conn.beginTransaction();

  return new Promise(async (resolve, reject) => {
    try {
      const [newContent]: content[] = await conn.execute(
        "INSERT INTO contents (uuid, content_type_id, content) VALUES (UUID(), ?, ?) RETURNING *",
        [1, message.content!.content]
      );

      const [newMessage]: message[] = await conn.execute(
        "INSERT INTO messages (uuid, chatroom_uuid, content_uuid, author_uuid, iv) VALUES (?, ?, ?, ?, ?) RETURNING *",
        [uuid, chatroom_uuid, newContent.uuid, author_uuid, message.iv]
      );

      await conn.commit();

      newMessage.content = newContent;

      return resolve(newMessage);
    } catch (error) {
      await conn.rollback();

      console.error(error);

      reject(error);
    } finally {
      await conn.release();
    }
  });
}
