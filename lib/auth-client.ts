import { createAuthClient } from "better-auth/react";
import { emailOTPClient } from "better-auth/client/plugins";

if (!process.env.NEXT_PUBLIC_APP_URL) {
  throw new Error("NEXT_PUBLIC_APP_URL environment variable is required");
}

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL, // the base url of your auth server
  plugins: [emailOTPClient()],
});

export const { signIn, signOut, signUp, useSession } = authClient;

// Helper to check if user is authenticated
export const requireAuth = async () => {
  const session = await authClient.getSession();
  if (!session) {
    throw new Error("Unauthorized");
  }

  return session;
};
