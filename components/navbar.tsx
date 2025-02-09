import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { Logo } from "@/components/logo";

import { getServerSession } from "@/lib/auth-server";

export async function Navbar() {
  const session = await getServerSession();

  const homeLink = session ? "/dashboard" : "/";

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-4xl px-4">
        <nav className="flex h-16 items-center justify-between border-b bg-background/50 backdrop-blur-xl">
          <Link
            href={homeLink}
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <Logo />
          </Link>
          <ModeToggle />
        </nav>
      </div>
    </header>
  );
}
