import SignIn from "@/components/auth/sign-in";
import Link from "next/link";

export default function SignInPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <SignIn />
      <p className="mt-4 text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/sign-up" className="text-primary hover:underline">
          Sign up
        </Link>
      </p>
    </main>
  );
}
