// Importing necessary modules and components
import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider" // Radix UI Slider components
import { cn } from "@/lib/Utils" // Utility function for conditional classNames

// Creating a custom Slider component using React.forwardRef
const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>, // Ref type is based on the Radix Slider root element
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> // Props type excludes ref
>(
  ({ className, ...props }, ref) => (
    <SliderPrimitive.Root
      ref={ref} // Attaching the forwarded ref
      className={cn(
        // Merges base styles with any custom className passed in
        "relative flex w-full touch-none select-none items-center", // Ensures proper layout and disables text selection
        className
      )}
      {...props} // Spread any other props passed to the Slider
    >
      {/* Track is the background bar of the slider */}
      <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
        {/* Range is the filled part of the track based on the current value */}
        <SliderPrimitive.Range className="absolute h-full bg-primary" />
      </SliderPrimitive.Track>

      {/* Thumb is the draggable circle users interact with */}
      <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
    </SliderPrimitive.Root>
  )
)

// Set a display name for debugging and dev tools
Slider.displayName = SliderPrimitive.Root.displayName

// Exporting the customized Slider for use in other components
export { Slider }