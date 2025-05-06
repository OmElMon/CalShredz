// Import React to use JSX and forwardRef
import * as React from "react"

// Import Radix UI's Label primitive (provides accessibility-friendly label behavior)
import * as LabelPrimitive from "@radix-ui/react-label"

// Import class-variance-authority utility for variant-based class styling
import { cva, type VariantProps } from "class-variance-authority"

// Import a utility for merging class names
import { cn } from "@/lib/utils"

// Define base styles for the label using `cva` (class variance authority)
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
  // This adds:
  // - Small text size
  // - Medium font weight
  // - No extra line height spacing
  // - Dimmed and disabled style when associated peer input is disabled
)

// Create the Label component using forwardRef
const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>, // Inherit the DOM element type from Radix's Label Root
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & // Include all standard props from Radix Label
    VariantProps<typeof labelVariants> // Support for future variant extensions via `cva`
>(
  ({ className, ...props }, ref) => (
    <LabelPrimitive.Root
      ref={ref} // Forward ref to the Radix Label element
      className={cn(labelVariants(), className)} // Apply base styles + any custom className
      {...props} // Spread remaining props (e.g., htmlFor)
    />
  )
)

// Set display name for better debugging in React DevTools
Label.displayName = LabelPrimitive.Root.displayName

// Export the Label component for use in other parts of the app
export { Label }