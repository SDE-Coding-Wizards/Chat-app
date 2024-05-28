// import { getClient } from "@/lib/server/database";
import { getPool } from "@/lib/server/database";
import { Chatroom, ChatroomMember, User } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();

  const conn = await getPool();

  const { chatroom_uuid, new_member_uuid, new_chat_key } = body;

  const findChatroom = await conn.query(
    "SELECT uuid FROM chatroom_members WHERE chatroom_uuid = ? AND user_uuid = ?",
    [chatroom_uuid, new_member_uuid]
  );

  if (findChatroom.length > 0) {
    await conn.end();
    return Response.json(
      { message: "Member already in chatroom." },
      { status: 409 }
    );
  }

  await conn.execute(
    "INSERT INTO chatroom_members (uuid, chatroom_uuid, user_uuid, chat_key) VALUES (uuid(), ?, ?, ?)",
    [chatroom_uuid, new_member_uuid, new_chat_key]
  );

  const [updatedChatroom]: Chatroom[] = await conn.query(
    "SELECT * FROM chatrooms WHERE uuid = ?",
    [chatroom_uuid]
  );

  const chatroomMembers: ChatroomMember[] = await conn.query(
    "SELECT * FROM chatroom_members WHERE chatroom_uuid = ?",
    [chatroom_uuid]
  );

  const users: User[] = await conn.query("SELECT * FROM users WHERE uuid IN (?)", [
    chatroomMembers.map(({ user_uuid }) => user_uuid),
  ]);

  updatedChatroom.members = chatroomMembers;
  updatedChatroom.users = users;

  await conn.end();

  return Response.json(updatedChatroom);
}
