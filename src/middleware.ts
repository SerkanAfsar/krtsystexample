import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { validateToken } from "./utils";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const jwtCookie = request.cookies.get("jwt")?.value;
  if (!jwtCookie || (jwtCookie && !validateToken(jwtCookie))) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/Admin/:path*",
};
