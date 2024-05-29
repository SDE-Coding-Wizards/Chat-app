import { getPool } from "@/lib/server/database";
import { Chatroom, ChatroomMember, User } from "@/types";

export async function getChatrooms(user_uuid: string): Promise<Chatroom[]> {
  const conn = await getPool();

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

  await conn.release();

  return chatrooms;
}