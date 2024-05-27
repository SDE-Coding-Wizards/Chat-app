import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { User } from "./types/user";
import { getClient } from "./lib/server/database";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
if (!JWT_SECRET) {
  throw new Error("The environment variable JWT_SECRET is not set.");
}

export async function middleware(request: NextRequest & { user?: User }) {
  // Get JWT token
  const token = request.cookies.get("token") as unknown as string;
  if (!token) {
    // If no token, redirect to login or handle unauthenticated request
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    // Verify the token
    const { payload } = await jwtVerify(token, JWT_SECRET);
    const decodedUser = payload as unknown as User | null;

    if (!decodedUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // If token is valid, you can set user info in headers or modify request
    const user = decodedUser as User;

    //Get user from database
    const connection = await getClient();
    try {
      const [rows] = (await connection.execute(
        "SELECT * FROM users WHERE uuid = ?",
        [user.uuid]
      )) as unknown as any[];
      if (!rows || rows.length < 1) {
        return new NextResponse("This user does not exist.", { status: 400 });
      }
      request.user = rows[0] as User;
    } catch (error) {
      return new NextResponse(
        "An error occurred while checking if the user exists.",
        { status: 500 }
      );
    }

    // Continue to the next middleware or route handler
    return NextResponse.next();
  } catch (err) {
    // If token verification fails, return error or handle error and delete token
    request.cookies.delete("token");
    return new NextResponse("Unauthorized", { status: 401 });
  }
}

export const config = {
  // match all routes except /login, /signup, /reset-password, /
  matcher: ["/chat"],
};
