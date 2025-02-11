import { getServerSession } from "@/lib/auth-server";
import { PageHeader } from "@/components/page-header";
import { FileUpload } from "@/components/file-upload";

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

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">File Upload</h2>
          <FileUpload />
        </div>
      </div>
    </>
  );
}
