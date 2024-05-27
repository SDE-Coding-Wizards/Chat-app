import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getClient } from "@/lib/server/database";
import { z } from "zod";
import bcrypt from "bcrypt";
import { getJwtSecretKey } from "@/lib/auth/constants";
import { JWTPayload, SignJWT } from "jose";
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
  let user: User | null = null;

  try {
    const connection = await getClient();

    [user] = await connection.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (!user) {
      return new Response("Invalid credentials", { status: 400 });
    }

    await connection.end();
  } catch (error) {
    console.error("error", error);
    return new Response(
      "An error occurred while checking if the user exists.",
      { status: 500 }
    );
  }

  //compare password
  const matches = await bcrypt.compare(password, user.password);
  console.log("🚀 ~ POST ~ matches:", matches);
  if (!matches) {
    return new Response("Invalid credentials.", { status: 400 });
  }

  //set user token in cookies
  const SECRETKEY = getJwtSecretKey();
  const payload: JWTPayload = {
    uuid: user.uuid,
    email: user.email,
  };

  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("24h")
    .sign(SECRETKEY);

  cookies().set("token", token, {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  //send email verification link

  return Response.json(user);
}
