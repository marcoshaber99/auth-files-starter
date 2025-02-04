import { betterFetch } from "@better-fetch/fetch";
import type { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

type Session = typeof auth.$Infer.Session;

export async function middleware(request: NextRequest) {
  // Apply security headers to all responses
  const response = await handleAuth(request);

  // Add security headers
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains"
  );
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );

  return response;
}

async function handleAuth(request: NextRequest) {
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

  // If user is logged in but email is not verified, redirect to verify email page
  // except if they're already on the verify email page or signing out
  if (
    session &&
    !session.user.emailVerified &&
    !request.nextUrl.pathname.startsWith("/verify-email") &&
    !request.nextUrl.pathname.startsWith("/api/auth/sign-out")
  ) {
    return NextResponse.redirect(
      new URL(
        `/verify-email?email=${encodeURIComponent(session.user.email)}`,
        request.url
      )
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/sign-in", "/sign-up", "/verify-email"],
};
