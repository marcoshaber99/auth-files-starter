import type { auth } from "@/lib/auth";

// Core types from better-auth
export type Session = typeof auth.$Infer.Session;
export type User = Session["user"];

// Extend the base user type with any additional fields
export interface ExtendedUser extends User {
  // Add any custom fields here
  firstName?: string;
  lastName?: string;
}

// Auth-related input types
export interface SignInCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials extends SignInCredentials {
  firstName: string;
  lastName: string;
}

// Session-related types
export interface SessionInfo {
  id: string;
  userId: string;
  token: string;
  expiresAt: Date;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Account-related types
export interface AccountInfo {
  id: string;
  userId: string;
  accountId: string;
  providerId: string;
  accessToken?: string;
  refreshToken?: string;
  idToken?: string;
  accessTokenExpiresAt?: Date;
  refreshTokenExpiresAt?: Date;
  scope?: string;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Verification-related types
export interface VerificationInfo {
  id: string;
  identifier: string;
  value: string;
  expiresAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

// Auth provider types
export type AuthProvider = "github" | "email" | "otp";

// Auth error types
export interface AuthError {
  message: string;
  status: number;
  code?: string;
}
