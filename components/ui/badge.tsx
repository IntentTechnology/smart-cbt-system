import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          " border-0 bg-[#EAF0FD] text-[#2563EB] py-[6px] px-[12px] rounded-full",
        destructive:
          "border-0 bg-[#E8F6ED] px-[12px] rounded-full text-[#16A34A]",
        passed: "border-0 bg-[#16A34A] px-[12px] rounded-full text-[#FFFFFF]",
        failed: "border-0 bg-[#DC2626] px-[12px] rounded-full text-[#FFFFFF]",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
