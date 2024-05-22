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
  const json = await req.json();

  const result = schema.safeParse(json);
  if (result.success === false) {
    throw new Error(JSON.stringify(result.error));
  }
  const { username, password } = result.data;

  //check if user exists
  const user = {
    username: "kenn7575",
    password: "$2b$10$prT.thvmhdMNV5GfOKwEUuluAz3sNapgjpoV30rjSzsOfsjWcooym",
  };

  //compare password
  const matches = await bcrypt.compare(
    "password",
    "$2b$10$luIv/XGeradiXy5hw9zYguMfwAyWjVn31ELguM5xSn6bWBlrotltK"
  );
  console.log("🚀 ~ POST ~ matches:", matches);
  if (!matches) {
    console.log("passwords do not match");
  }

  //set user token in cookies
  const SECRETKEY = getJwtSecretKey();
  const token = jwt.sign(user, SECRETKEY, { expiresIn: "1h" });

  cookies().set("user", JSON.stringify(user), {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  //send email verification link

  return new Response(null, { status: 200 });
}
