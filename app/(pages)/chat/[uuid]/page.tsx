import Client from "./Client";
import { getClient } from "@/lib/server/database";
import type { Message, Chatroom, User, ChatroomMember } from "@/types";
import { getUser } from "@/utils/getUser";
import { notFound } from "next/navigation";

interface ChatProps {
  params: { uuid: string };
}

export default async function Chat({ params: { uuid } }: ChatProps) {
  const user = await getUser();

  if (!user) return notFound();

  const chatrooms = await getChatrooms(user.uuid);
  const messages = await getMessages(uuid);
  const encryptedChatKey = await getEncryptedChatKey(uuid, user.uuid);

  if (!encryptedChatKey) return notFound();

  return (
    <Client
      chatroom_uuid={uuid}
      user={user}
      sendMessage={sendMessage}
      initialMessages={messages}
      initialChatrooms={chatrooms}
      encryptedChatKey={encryptedChatKey}
    />
  );
}

export async function getChatrooms(user_uuid: string): Promise<Chatroom[]> {
  const conn = await getClient();

  const chatrooms: Chatroom[] = await conn.query(
    `
    SELECT c.* FROM chatrooms c
    JOIN chatroom_members crm
    ON crm.chatroom_uuid = c.uuid
    WHERE crm.user_uuid = ?;
    `,
    [user_uuid]
  );

  const chatroomUUIDs = chatrooms.map(({ uuid }) => uuid);
  let chatroomMembers: ChatroomMember[] = [];

  if (chatroomUUIDs.length > 0) {
    chatroomMembers = await conn.query(
      "SELECT * FROM chatroom_members WHERE chatroom_uuid IN (?)",
      [chatrooms.map(({ uuid }) => uuid)]
    );
  }

  const users = await conn.query("SELECT * FROM users");

  for (let chatroom of chatrooms) {
    chatroom.members = chatroomMembers.filter(
      (member: ChatroomMember) => member.chatroom_uuid === chatroom.uuid
    );

    chatroom.users = chatroom.members!.map((member: ChatroomMember) =>
      users.find((user: User) => user.uuid === member.user_uuid)
    );
  }

  await conn.end();

  return chatrooms;
}

async function getEncryptedChatKey(
  chatroom_uuid: string,
  user_uuid: string
): Promise<string> {
  const conn = await getClient();

  let [{ chat_key }] = await conn.query(
    "SELECT chat_key FROM chatroom_members WHERE chatroom_uuid = ? AND user_uuid = ?",
    [chatroom_uuid, user_uuid]
  );

  await conn.end();

  return chat_key;
}

async function getMessages(chatroom_uuid: string): Promise<Message[]> {
  const conn = await getClient();

  try {
    const messages = await conn.query(
      "SELECT * FROM messages WHERE chatroom_uuid = ? ORDER BY date_sent DESC LIMIT 20",
      [chatroom_uuid]
    );

    const contents = await conn.query("SELECT * FROM contents");

    for (let message of messages) {
      message.content = contents.find(
        (content: any) => content.uuid === message.content_uuid
      );
    }

    return messages.reverse();
  } catch (error) {
    console.log(error);

    return [
      {
        message: "An error occurred while fetching messages.",
        error,
      },
    ] as any;
  } finally {
    await conn.end();
  }
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function sendMessage(
  uuid: string,
  message: Message,
  chatroom_uuid: string,
  author_uuid: string
): Promise<Message> {
  "use server";

  const conn = await getClient();

  conn.beginTransaction();

  return new Promise(async (resolve, reject) => {
    // await wait(3000);

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
