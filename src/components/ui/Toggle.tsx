// Import necessary modules from React and Radix UI's Toggle
import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils" // Utility to conditionally join Tailwind class names

// Define styling variants for the toggle using class-variance-authority (CVA)
const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
  {
    variants: {
      // Two appearance options: default and outline
      variant: {
        default: "bg-transparent", // Basic transparent button
        outline:
          "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground", // Bordered version
      },
      // Three size options
      size: {
        default: "h-10 px-3",
        sm: "h-9 px-2.5",
        lg: "h-11 px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

// Toggle component built on Radix's TogglePrimitive.Root
const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>, // Ref typing for underlying DOM element
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> & // Accept all regular toggle props
    VariantProps<typeof toggleVariants> // Plus CVA variant props (size & variant)
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    // Merge variant-based styles with optional user-supplied className
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
))

Toggle.displayName = TogglePrimitive.Root.displayName

// Export the Toggle component and its styling for use in grouped toggles
export { Toggle, toggleVariants }