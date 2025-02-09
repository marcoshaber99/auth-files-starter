import { getServerSession } from "@/lib/auth-server";
import { ProfileCard } from "@/components/dashboard/profile-card";
import { PageHeader } from "@/components/page-header";
export default async function DashboardPage() {
  const session = await getServerSession();

  return (
    <>
      <PageHeader title="Dashboard" />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Welcome back, {session!.user.name}!
          </h2>
        </div>

        <ProfileCard user={session!.user} />
      </div>
    </>
  );
}
