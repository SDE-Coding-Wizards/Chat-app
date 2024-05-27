import { getClient } from "@/lib/server/database";
import { User } from "@/types";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function getUser(): Promise<User | null> {
  "use server";

  const token = cookies().get("token")?.value;
  const secret = process.env.JWT_SECRET_KEY;

  if (!token) return null;

  if (!secret) {
    throw new Error("No secret found");
  }

  let decodedToken: User | null = null;

  try {
    decodedToken = jwt.verify(token, secret) as User;
  } catch (error) {
    // console.error("error", error);
    if (error instanceof jwt.TokenExpiredError) {
      console.log("Token expired");
      return null;
    }

    return null;
  }

  const conn = await getClient();

  const [user] = await conn.query("SELECT * FROM users WHERE email = ?", [
    decodedToken.email,
  ]);

  return user;
}
