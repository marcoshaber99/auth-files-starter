import { PageHeader } from "@/components/page-header";
export default async function SettingsPage() {
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
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and preferences.
          </p>
        </div>
      </div>
    </>
  );
}
