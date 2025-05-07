import * as React from "react";
import { Slot } from "@radix-ui/react-slot"; // For polymorphic component support
import { cva, type VariantProps } from "class-variance-authority"; // For variant styling
import { cn } from "@/lib/Utils"; // Classname utility

// 1. Button Variant Definitions
// -----------------------------
// Using `cva` to create a comprehensive button styling system
const buttonVariants = cva(
  // Base styles applied to all buttons
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Primary button style (default)
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        // Destructive/error button style
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        // Outlined button style
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        // Secondary button style
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        // Minimal ghost button style
        ghost: "hover:bg-accent hover:text-accent-foreground",
        // Text link style button
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        // Default medium size
        default: "h-10 px-4 py-2",
        // Small size
        sm: "h-9 rounded-md px-3",
        // Large size
        lg: "h-11 rounded-md px-8",
        // Square icon button
        icon: "h-10 w-10",
      },
    },
    // Default variants if none specified
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// 2. Button Props Interface
// -------------------------
// Extends standard button props with our variants and polymorphic capability
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean; // Enables polymorphic behavior
}

// 3. Button Component Implementation
// ----------------------------------
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    // Use Slot if asChild is true, otherwise use regular button
    const Comp = asChild ? Slot : "button";
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button"; // For debugging purposes

// Export the component and variants for reuse
export { Button, buttonVariants };