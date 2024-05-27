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
  password: z
    .string({ message: "Invalid password." })
    .min(8, { message: "Password must be at least 8 characters long." }),
  publicKey: z.string({ message: "Invalid public key." }),
});

export async function POST(req: Request, res: NextResponse) {
  //get request body
  const json = await req.json();

  //validate request body
  const result = schema.safeParse(json);
  if (result.success === false) {
    const error = result.error.errors[0].message;
    console.log("🚀 ~ POST ~ error:", error);
    return new Response("Invalid request body: " + error, {
      status: 400,
    });
  }
  const { email, password, publicKey } = result.data;

  //check if user exists
  const connection = await getClient();

  try {
    const rows = (await connection.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    )) as unknown as any[];
    console.log("🚀 ~ POST ~ users:", rows);
    if (rows && rows.length > 0) {
      return new Response("User already exists!", { status: 400 });
    }
  } catch (error) {
    return new Response(
      "An error occurred while checking if the user exists.",
      {
        status: 500,
      }
    );
  }

  //hash password
  const salt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync(password, salt);
  console.log("🚀 ~ POST ~ passwordHash:", passwordHash);

  //make user
  const user = {
    email: email,
    password: passwordHash,
    status_id: 2,
    public_key: publicKey,
  } as User;

  //save user in database
  const [newUser] = await connection.execute(
    "INSERT INTO users (uuid, email, password, status_id, public_key) VALUES (uuid(), ?, ?, ?, ?) RETURNING *",
    [user.email, user.password, user.status_id, user.public_key]
  );

  // get newly created user
  // const [newUser]: User[] = await connection.query(
  //   "SELECT * FROM users ORDER BY created_at DESC LIMIT 1"
  // );

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

  return Response.json(newUser, { status: 200 });
}
