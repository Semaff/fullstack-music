import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const isAuthPage = pathname === "/signup" || pathname === "/signin";

  try {
    const validateResponse = await fetch("http://localhost:5000/user/refresh", {
      credentials: "include",
      headers: {
        cookie: `token=${req.cookies.get("token")}`
      }
    });

    const isAuthentificated = validateResponse.status === 200;
    if (isAuthPage && isAuthentificated) {
      return NextResponse.redirect(`${req.nextUrl.origin}/`);
    }

    if (!isAuthPage && !isAuthentificated) {
      return NextResponse.redirect(`${req.nextUrl.origin}/signin`);
    }

    return NextResponse.next();
  } catch (err) {
    console.log(err);
    return NextResponse.rewrite(`${req.nextUrl.origin}/500`);
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - static (static files)
     * - favicon.ico (favicon file)
     * - _next (next.js reserved routes)
     */
    "/((?!api|static|favicon.ico|_next).*)"
  ]
};
