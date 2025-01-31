"use client"
import Link from "next/link";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const navLinks = [
    { href: "/dashboard", label: "Overview" },
    { href: "/exams", label: "Exams" },
    { href: "/results", label: "Results" },
    // { href: "/profile", label: "Profile settings" },
  ];
  return (
    <nav
      className={cn(
        "hidden md:flex items-center space-x-4 lg:space-x-6",
        className
      )}
      {...props}
    >
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`text-sm ${
            pathname === link.href ? "text-primary" : "text-muted-foreground"
          } font-medium text-muted-foreground transition-colors hover:text-primary`}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
