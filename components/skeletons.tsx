import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function DashboardSkeleton() {
  return (
    <main className="container mx-auto p-4 mt-16 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-2">
          <Skeleton className="h-8 w-[150px]" />
          <Skeleton className="h-4 w-[250px]" />
        </div>
        <Skeleton className="h-9 w-[100px]" />
      </div>
      <ProfileCardSkeleton />
    </main>
  );
}

export function ProfileCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-6 w-[120px]" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Name */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-[60px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
        {/* Email */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-[60px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
        {/* Email Verified */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-[120px]" />
          <Skeleton className="h-4 w-[40px]" />
        </div>
        {/* Member Since */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-[120px]" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
      </CardContent>
    </Card>
  );
}
