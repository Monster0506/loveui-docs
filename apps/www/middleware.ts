import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const UI_ORIGIN = process.env.NEXT_PUBLIC_UI_ORIGIN || "http://localhost:4000";

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (pathname === "/ui" || pathname.startsWith("/ui/")) {
    const url = new URL(`${pathname}${search}`, UI_ORIGIN);
    return NextResponse.rewrite(url);
  }

  if (pathname.startsWith("/_next")) {
    const referer = request.headers.get("referer") || "";
    if (referer.includes("/ui")) {
      const url = new URL(`${pathname}${search}`, UI_ORIGIN);
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/ui/:path*", "/ui", "/_next/:path*"],
};
