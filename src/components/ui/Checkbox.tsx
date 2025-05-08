import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"; // Radix UI checkbox primitives
import { Check } from "lucide-react"; // Check icon from Lucide
import { cn } from "@/lib/utils"; // Classname utility function

// 1. Checkbox Component
// --------------------
const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>, // Ref type
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> // Props type
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      // Base styles
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary",
      
      // Focus styles (accessibility)
      "ring-offset-background focus-visible:outline-none",
      "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      
      // Disabled state
      "disabled:cursor-not-allowed disabled:opacity-50",
      
      // Checked state
      "data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      
      // Custom class names
      className
    )}
    {...props} // Spread all other props
  >
    {/* Checkmark indicator (shown when checked) */}
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      {/* Lucide Check icon */}
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));

// Set display name for debugging
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

// Export the component
export { Checkbox };