import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { validateToken } from "./utils/Auth.Utils";

export async function middleware(request: NextRequest) {
  const jwtCookie = request.cookies.get("jwt")?.value;
  if (!jwtCookie || (jwtCookie && !validateToken(jwtCookie))) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: "/Admin/:path*",
};
