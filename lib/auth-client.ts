import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL, // the base url of your auth server
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
