import Link from "next/link";

import { cn } from "@/lib/utils";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("hidden md:flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/dashboard"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Overview
      </Link>
      <Link
        href="/exams"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Exams
      </Link>
      <Link
        href="/results"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Results
      </Link>
      <Link
        href="/profile"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Profile settings
      </Link>
    </nav>
  );
}
