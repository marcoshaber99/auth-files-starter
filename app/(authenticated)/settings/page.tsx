import { PageHeader } from "@/components/page-header";
import { getServerSession } from "@/lib/auth-server";
import { ProfileCard } from "@/components/dashboard/profile-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function SettingsPage() {
  const session = await getServerSession();

  return (
    <>
      <PageHeader
        title="Settings"
        parent={{
          title: "Dashboard",
          href: "/dashboard",
        }}
      />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Account Settings
          </h2>
          <p className="text-muted-foreground">
            Manage your account settings and preferences.
          </p>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>
          <TabsContent value="profile" className="space-y-4">
            <ProfileCard user={session!.user} />
            {/* We can add profile edit form here later */}
          </TabsContent>
          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
              </CardHeader>
              <CardContent>
                {/* We can add user preferences here later */}
                <p className="text-muted-foreground">
                  No preferences available yet.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
