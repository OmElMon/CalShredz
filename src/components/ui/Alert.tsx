// Import React and necessary utilities
import * as React from "react";
// class-variance-authority for creating variant-based class utilities
import { cva, type VariantProps } from "class-variance-authority";
// Utility function for combining Tailwind classes
import { cn } from "@/lib/Utils";

// 1. Alert Variant Definitions
// ---------------------------
// Using `cva` (Class Variance Authority) to create a configurable alert style system
const alertVariants = cva(
  // Base styles applied to all alerts
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        // Default alert style
        default: "bg-background text-foreground",
        // Destructive/error alert style
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
      },
    },
    // Default variant if none specified
    defaultVariants: {
      variant: "default",
    },
  }
);

// 2. Main Alert Component
// ----------------------
const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert" // Accessibility role
    className={cn(alertVariants({ variant }), className)} // Combine variant and custom classes
    {...props} // Spread all other props
  />
));
Alert.displayName = "Alert"; // For debugging purposes

// 3. Alert Title Component
// -----------------------
const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn(
      "mb-1 font-medium leading-none tracking-tight", // Title styles
      className
    )}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

// 4. Alert Description Component
// -----------------------------
const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-sm [&_p]:leading-relaxed", // Description styles
      className
    )}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

// Export all components
export { Alert, AlertTitle, AlertDescription };