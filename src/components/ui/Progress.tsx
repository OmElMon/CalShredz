// Import React and Radix UI Progress primitives
import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

// Import classname utility function for conditional Tailwind classes
import { cn } from "@/lib/utils"

/**
 * Progress component that displays a progress bar
 * 
 * Built using Radix UI's accessible progress primitive with custom styling
 */
const Progress = React.forwardRef<
  // Type definition for the forwarded ref
  React.ElementRef<typeof ProgressPrimitive.Root>,
  
  // Props type definition including all native progress props
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ 
  // Destructure props
  className,   // Optional additional class names
  value,       // Current progress value (0-100)
  ...props     // All other native progress props
}, ref) => (
  /* 
   * Progress Root element 
   * - Contains the full progress bar track
   * - Handles accessibility attributes
   */
  <ProgressPrimitive.Root
    ref={ref}  // Forwarded ref
    className={cn(
      // Base styles
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
      // Additional custom classes passed via className prop
      className
    )}
    {...props}  // Spread all other props
  >
    {/*
     * Progress Indicator 
     * - Shows the actual progress fill
     * - Uses transform to animate width changes
     */}
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{ 
        // Transform based on progress value (0-100)
        // Translates from -100% to 0% to create fill effect
        transform: `translateX(-${100 - (value || 0)}%)` 
      }}
    />
  </ProgressPrimitive.Root>
))

// Set display name for debugging purposes
Progress.displayName = ProgressPrimitive.Root.displayName

// Export the component
export { Progress }