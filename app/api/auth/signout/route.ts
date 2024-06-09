import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request, res: NextResponse) {
  try {
    cookies().delete("token");
  } catch (error) {
    return new Response("An error occurred while signing out.", {
      status: 500,
    });
  }

  return new Response(null, { status: 200 });
}
