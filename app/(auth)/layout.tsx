import { Toaster } from "sonner";
import { Navbar } from "@/components/navbar";
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <Navbar />
      {children}
      <Toaster />
    </div>
  );
}
