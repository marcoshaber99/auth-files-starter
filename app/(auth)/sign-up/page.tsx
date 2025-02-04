import { SignUp } from "@/components/auth/sign-up";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <SignUp />
      <p className="mt-4 text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/sign-in" className="text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </main>
  );
}
