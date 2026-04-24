import { NextResponse, type NextRequest } from "next/server";
import { verifySessionEdge } from "@/lib/authEdge";
import { SESSION_COOKIE } from "@/lib/authConstants";

export const config = {
  matcher: ["/admin/:path*", "/api/projects/:path*"],
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow the login page itself
  if (pathname === "/admin/login") return NextResponse.next();

  // Allow public GET on /api/projects, but guard POST/PUT/DELETE.
  if (pathname.startsWith("/api/projects") && req.method === "GET") {
    return NextResponse.next();
  }

  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const ok = await verifySessionEdge(token);

  if (ok) return NextResponse.next();

  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = req.nextUrl.clone();
  url.pathname = "/admin/login";
  url.searchParams.set("next", pathname);
  return NextResponse.redirect(url);
}
