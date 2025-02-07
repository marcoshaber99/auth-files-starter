import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { ProfileCard } from "@/components/dashboard/profile-card";
import { redirect } from "next/navigation";
export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/sign-in");
  }

  return (
    <main className="container mx-auto p-4 mt-16 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {session.user.name}!
          </p>
        </div>
        <SignOutButton />
      </div>

      <ProfileCard user={session.user} />
    </main>
  );
}
