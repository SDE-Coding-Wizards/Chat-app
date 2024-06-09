import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "@/types/user";

const schema = z.object({
  userId: z.string({ message: "Invalid user id." }),
  newPassword: z
    .string({ message: "Invalid new password." })
    .min(8, { message: "Password must be at least 8 characters long." }),
});

export async function POST(req: Request, res: NextResponse) {
  const json = await req.json();

  const result = schema.safeParse(json);
  if (result.success === false) {
    const error = result.error.errors[0].message;
    return new Response("Invalid request body: " + error, {
      status: 400,
    });
  }
  const { userId, newPassword } = result.data;

  //find user in database
  let users: User[] | null = null;
  const connection = await pool.getConnection();
  try {
    const [rows] = (await connection.execute(
      "SELECT * FROM users WHERE uuid = ?",
      [userId]
    )) as unknown as any[];
    if (!rows || rows.length < 1) {
      return new Response("This email dose not exist.", { status: 400 });
    }
    users = rows as User[];
  } catch (error) {
    console.error("error", error);
    connection.end();
    return new Response(
      "An error occurred while checking if the user exists.",
      { status: 500 }
    );
  }
  const user = users[0];

  //encrypt password
  const salt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync(newPassword, salt);

  //update password in database

  try {
    const [rows] = await connection.execute(
      "UPDATE users SET password = ? WHERE uuid = ?",
      [passwordHash, userId]
    );
  } catch (error) {
    console.error("error", error);
    connection.end();
    return new Response("An error occurred while updating the password.", {
      status: 500,
    });
  } finally {
    connection.end();
  }
  //set user token in cookies
  const SECRETKEY = process.env.SECRETKEY!;
  const token = jwt.sign(user, SECRETKEY, { expiresIn: "1h" });

  cookies().set("token", token, {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  //send email verification link

  return new Response(null, { status: 200 });
}
