import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  // notes:
  //    can do nested routes '/test/moreroute' to specifically block one
  //    or '/test' to block everything starting with test
  const protectedPaths = ["/test", "/admin", "/profile", "/home"];
  const publicPaths = ["/", "/register"];

  const pathName = request.nextUrl.pathname;
  const isProtectedRoute = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  const isPublicRoute = publicPaths.includes(pathName);

  // redirect to login if route is protected and no token is found
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // redirect away from public routes if a token is found
  if (isPublicRoute && token) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next();
}
