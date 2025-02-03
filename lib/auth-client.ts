import { createAuthClient } from "better-auth/react";
import { toast } from "sonner";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL, // the base url of your auth server
  fetchOptions: {
    onError: (ctx) => {
      toast.error(ctx.error.message);
    },
    onRequest: () => {
      // You can add loading state management here
    },
    onResponse: () => {
      // You can handle response completion here
    },
  },
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
