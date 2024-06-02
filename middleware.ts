import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "secret");
if (!JWT_SECRET) {
  throw new Error("The environment variable JWT_SECRET is not set.");
}

export async function middleware(request: NextRequest & { user?: user }) {
  // Get JWT token
  const token = request.cookies.get("token")?.value;
  if (!token) {
    // If no token, redirect to login or handle unauthenticated request
    return NextResponse.redirect(new URL("/login", request.nextUrl.origin));
  }

  try {
    // Verify the token
    const { payload } = await jwtVerify(token, JWT_SECRET);
    const decodedUser = payload as unknown as user | null;

    if (!decodedUser) {
      return NextResponse.redirect(new URL("/login", request.nextUrl.origin));
    }

    // If token is valid, you can set user info in headers or modify request
    const user = decodedUser as user;

    request.user = user;

    // Continue to the next middleware or route handler
    return NextResponse.next();
  } catch (err) {
    console.error("🚀 ~ middleware ~ err:", err);
    // If token verification fails, return error or handle error and delete token
    request.cookies.delete("token");

    return NextResponse.redirect(new URL("/login", request.nextUrl.origin));
    // return new NextResponse("Unauthorized", { status: 401 });
  }
}

export const config = {
  // match all routes except /login, /signup, /reset-password, /
  matcher: ["/chat"],
};
