"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { User } from "@/types/auth";
import { formatDate } from "@/lib/utils";

interface ProfileCardProps {
  user: User;
}

export function ProfileCard({ user }: ProfileCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div>
          <span className="font-medium">Name:</span> {user.name}
        </div>
        <div>
          <span className="font-medium">Email:</span> {user.email}
        </div>
        <div>
          <span className="font-medium">Email verified:</span>{" "}
          {user.emailVerified ? "Yes" : "No"}
        </div>
        <div>
          <span className="font-medium">Member since:</span>{" "}
          {formatDate(user.createdAt)}
        </div>
      </CardContent>
    </Card>
  );
}
