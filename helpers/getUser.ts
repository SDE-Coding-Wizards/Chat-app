"use server";

import { decodeJwt } from "jose";
import { cookies } from "next/headers";

export async function getUser(): Promise<user | null> {
  const token = cookies().get("token")?.value;
  const SECRETKEY = process.env.JWT_SECRET_KEY as string;

  const secret = new TextEncoder().encode(SECRETKEY || "secret");

  if (!token) return null;

  let decodedToken: user | any | null = null;

  try {
    decodedToken = { payload: decodeJwt(token) };
  } catch (error) {
    console.error("error", error);

    return null;
  }

  const [user] = await pool.query("SELECT * FROM users WHERE email = ?", [
    decodedToken?.payload?.email,
  ]);

  return user;
}
