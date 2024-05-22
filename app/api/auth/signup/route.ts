import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import bcrypt from "bcrypt";
import { getJwtSecretKey } from "@/lib/auth/constants";
import jwt from "jsonwebtoken";

const schema = z.object({
  username: z.string(),
  password: z.string(),
});

export async function POST(req: Request, res: NextResponse) {
  //get request body
  const json = await req.json();

  //validate request body
  const result = schema.safeParse(json);
  if (result.success === false) {
    throw new Error(JSON.stringify(result.error));
  }
  const { username, password } = result.data;

  //check if user exists

  //hash password
  const salt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync("password", 10);
  console.log("🚀 ~ POST ~ passwordHash:", passwordHash);

  //make user
  const user = {
    username: "kenn7575",
    password: "$2b$10$prT.thvmhdMNV5GfOKwEUuluAz3sNapgjpoV30rjSzsOfsjWcooym",
  };
  //save user in database

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

  return new Response(null, { status: 200 });
}
