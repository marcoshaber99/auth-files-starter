import { betterFetch } from "@better-fetch/fetch";
import type { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

type Session = typeof auth.$Infer.Session;

export async function middleware(request: NextRequest) {
  const { data: session } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL: request.nextUrl.origin,
      headers: {
        cookie: request.headers.get("cookie") || "", // Forward the cookies from the request
      },
    }
  );

  // If user is on auth pages and is logged in, redirect to dashboard
  if (
    session &&
    (request.nextUrl.pathname === "/sign-in" ||
      request.nextUrl.pathname === "/sign-up")
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If user is on protected pages and not logged in, redirect to sign in
  if (!session && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/sign-in", "/sign-up"], // Apply middleware to specific routes
};
