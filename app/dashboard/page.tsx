"use client";

import { useSession } from "@/lib/auth-client";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <main className="container mx-auto p-4">
        <div>Loading...</div>
      </main>
    );
  }

  if (!session?.user) {
    return null;
  }

  return (
    <main className="container mx-auto p-4 mt-16  max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {session.user.name}!
          </p>
        </div>
        <SignOutButton />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div>
            <span className="font-medium">Name:</span> {session.user.name}
          </div>
          <div>
            <span className="font-medium">Email:</span> {session.user.email}
          </div>
          <div>
            <span className="font-medium">Email verified:</span>{" "}
            {session.user.emailVerified ? "Yes" : "No"}
          </div>
          <div>
            <span className="font-medium">Member since:</span>{" "}
            {new Date(session.user.createdAt).toLocaleDateString()}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
