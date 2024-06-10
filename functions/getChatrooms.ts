"use server";

import { pool } from "@/lib/server/database";

export async function getChatrooms(user_uuid: string): Promise<chatroom[]> {
  const conn = await pool.getConnection();

  const chatrooms: chatroom[] = await conn.query(
    `
    SELECT c.* FROM chatrooms c
    JOIN chatroom_members crm
    ON crm.chatroom_uuid = c.uuid
    WHERE crm.user_uuid = ?;
    `,
    [user_uuid]
  );

  const chatroomUUIDs = chatrooms.map(({ uuid }) => uuid);
  let chatroomMembers: chatroom_member[] = [];

  if (chatroomUUIDs.length > 0) {
    chatroomMembers = await conn.query(
      "SELECT * FROM chatroom_members WHERE chatroom_uuid IN (?)",
      [chatrooms.map(({ uuid }) => uuid)]
    );
  }

  for (let chatroom of chatrooms) {
    chatroom.chatroom_members = chatroomMembers.filter(
      (member: chatroom_member) => member.chatroom_uuid === chatroom.uuid
    );
  }

  const users: user[] = await conn.query("SELECT * FROM users");

  for (let member of chatroomMembers) {
    member.user = users.find(({ uuid }) => uuid === member.user_uuid)!;
  }

  await conn.end();

  return chatrooms;
}
