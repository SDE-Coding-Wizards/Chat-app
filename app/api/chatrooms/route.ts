// import { getClient } from "@/lib/server/database";
import { getPool } from "@/lib/server/database";
import { Chatroom } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();

  const conn = await getPool();

  const [newChatroom]: Chatroom[] = await conn.execute(
    "INSERT INTO chatrooms (uuid, name) VALUES (uuid(), ?) RETURNING *",
    [body?.name]
  );

  await conn.end();

  return Response.json(newChatroom);
}
