// import { getClient } from "@/lib/server/database";
import { getPool } from "@/lib/server/database";
import { User } from "@/types";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export async function getUser(): Promise<User | null> {
  "use server";

  const token = cookies().get("token")?.value;
  const SECRETKEY = process.env.JWT_SECRET_KEY as string;

  const secret = new TextEncoder().encode(SECRETKEY || "secret");

  if (!token) return null;

  let decodedToken: User | any | null = null;

  try {
    decodedToken = await jwtVerify(token, secret);
  } catch (error) {
    console.error("error", error);

    return null;
  }

  const conn = await getPool();

  const [user] = await conn.query("SELECT * FROM users WHERE email = ?", [
    decodedToken?.payload?.email,
  ]);

  return user;
}
