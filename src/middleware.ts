import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const cookie = request.cookies.get("session")?.value;

  const isLoggedIn = Boolean(cookie);
  const isPublic =
    request.nextUrl.pathname.startsWith("/log-in") ||
    request.nextUrl.pathname.startsWith("/create-account");

  if (!isLoggedIn && !isPublic) {
    return NextResponse.redirect(new URL("/log-in", request.url));
  }

  if (isLoggedIn && isPublic) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|favicon.ico).*)"],
};
