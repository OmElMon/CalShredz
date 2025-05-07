// Import React and Radix UI Switch primitives
import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

// Import utility function for conditional class merging
import { cn } from "@/lib/Utils"

// Define a `Switch` component using React's `forwardRef`
const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>, // Forward the ref to the Switch root
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> // Accept all native props of the Switch
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    // Combine default styling classes with any passed-in custom className
    className={cn(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:bg-primary data-[state=unchecked]:bg-input", // Apply different backgrounds depending on the state
      className
    )}
    {...props} // Spread additional props
    ref={ref} // Attach the ref
  >
    {/* The thumb is the circle that moves when toggled */}
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform",
        "data-[state=checked]:translate-x-5", // Move to the right when checked
        "data-[state=unchecked]:translate-x-0" // Stay on the left when unchecked
      )}
    />
  </SwitchPrimitives.Root>
))

// Set the display name for debugging purposes
Switch.displayName = SwitchPrimitives.Root.displayName

// Export the Switch component
export { Switch }