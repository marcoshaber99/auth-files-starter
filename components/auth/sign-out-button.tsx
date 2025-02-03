"use client";

import { signOut } from "@/lib/auth-client";
import { Button, type ButtonProps } from "@/components/ui/button";
import { toast } from "sonner";

type SignOutButtonProps = Omit<ButtonProps, "onClick">;

export function SignOutButton({ className, ...props }: SignOutButtonProps) {
  const handleSignOut = async () => {
    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            window.location.href = "/sign-in";
          },
        },
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to sign out");
    }
  };

  return (
    <Button
      variant="outline"
      className={className}
      onClick={handleSignOut}
      {...props}
    >
      Sign Out
    </Button>
  );
}
