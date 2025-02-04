import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { Logo } from "@/components/logo";

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-4xl px-4">
        <nav className="flex h-16 items-center justify-between border-b bg-background/50 backdrop-blur-xl">
          <Link
            href="/"
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <Logo />
            <span className="font-medium">Auth</span>
          </Link>

          <ModeToggle />
        </nav>
      </div>
    </header>
  );
}
