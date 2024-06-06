"use server"

export async function getMessages(chatroom_uuid: string): Promise<message[]> {
  const conn = await pool.getConnection();

  try {
    const messages: message[] = await conn.query(
      "SELECT * FROM messages WHERE chatroom_uuid = ? ORDER BY date_sent DESC LIMIT 20",
      [chatroom_uuid]
    );

    const contents: content[] = await conn.query("SELECT * FROM contents");

    for (let message of messages) {
      message.content = contents.find(
        (content) => content.uuid === message.content_uuid
      )!;
    }

    return messages.reverse();
  } catch (error) {
    console.error(error);

    return [
      {
        message: "An error occurred while fetching messages.",
        error,
      },
    ] as any;
  } finally {
    await conn.release();
  }
}
