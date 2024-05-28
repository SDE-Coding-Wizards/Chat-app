// import { getClient } from "@/lib/server/database";
import { getPool } from "@/lib/server/database";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { uuid: string } }
) {
  const { uuid } = params;

  const conn = await getPool();

  const [user] = await conn.query("SELECT * FROM users WHERE uuid = ?", [
    uuid,
  ]);

  await conn.end();

  if (!user) {
    return Response.json("User not found.", { status: 404 });
  }

  return Response.json(user);
}
