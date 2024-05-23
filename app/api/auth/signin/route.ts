import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getClient } from "@/lib/server/database";
import { z } from "zod";
import bcrypt from "bcrypt";
import { getJwtSecretKey } from "@/lib/auth/constants";
import jwt from "jsonwebtoken";
import { User } from "@/types/user";

const schema = z.object({
  email: z.string({ message: "Invalid email." }),
  password: z.string({ message: "Invalid password." }),
});

export async function POST(req: Request, res: NextResponse) {
  const json = await req.json();

  const result = schema.safeParse(json);
  if (result.success === false) {
    const error = result.error.errors[0].message;
    console.log("🚀 ~ POST ~ error:", error);
    return new Response("Invalid request body: " + error, {
      status: 400,
    });
  }
  const { email, password } = result.data;

  //find user in database
  let users: User[] | null = null;
  try {
    const connection = await getClient();
    const [rows] = (await connection.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    )) as unknown as any[];
    if (!rows || rows.length < 1) {
      return new Response("Invalid credentials", { status: 400 });
    }
    users = rows as User[];
  } catch (error) {
    console.error("error", error);
    return new Response(
      "An error occurred while checking if the user exists.",
      { status: 500 }
    );
  }

  const user = users[0];

  //compare password
  const matches = await bcrypt.compare(password, user.password);
  console.log("🚀 ~ POST ~ matches:", matches);
  if (!matches) {
    return new Response("Invalid credentials.", { status: 400 });
  }

  //set user token in cookies
  const SECRETKEY = getJwtSecretKey();
  const token = jwt.sign(user, SECRETKEY, { expiresIn: "1h" });

  cookies().set("token", token, {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  //send email verification link

  return Response.json(user);
}
