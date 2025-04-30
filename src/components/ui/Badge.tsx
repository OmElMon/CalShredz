// Import React and class variance authority utilities
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

// Utility function for combining class names
import { cn } from "@/lib/utils";

// 1. Badge Variant Definitions
// ----------------------------
// Using `cva` to create a configurable badge styling system
const badgeVariants = cva(
  // Base styles applied to all badges
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        // Primary badge style (default)
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        // Secondary badge style
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        // Error/danger badge style
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        // Outline-only badge style
        outline: "text-foreground", // Border color comes from default border class
      },
    },
    // Default variant if none specified
    defaultVariants: {
      variant: "default",
    },
  }
);

// 2. Badge Props Interface
// ------------------------
// TypeScript interface combining standard HTML div props with variant props
export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

// 3. Badge Component Implementation
// ---------------------------------
function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        badgeVariants({ variant }), // Apply variant styles
        className // Merge with custom classes
      )}
      {...props} // Spread all other props
    />
  );
}

// Export the component and variants for reuse
export { Badge, badgeVariants };