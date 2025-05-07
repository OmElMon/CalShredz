// Import necessary dependencies
import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator" // Radix UI's unstyled separator component
import { cn } from "@/lib/Utils" // Utility for combining class names

/**
 * Separator Component
 * 
 * A visual divider that can be displayed horizontally or vertically.
 * 
 * @param className - Additional CSS classes to apply to the separator
 * @param orientation - Direction of the separator ("horizontal" or "vertical")
 * @param decorative - Whether the separator is purely visual (true) or has semantic meaning (false)
 * @param props - All other props passed to the component
 * @param ref - Forwarded ref to access the underlying DOM element
 */
const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative} // When true, indicates this is purely visual and has no semantic meaning
      orientation={orientation} // Direction of the separator
      className={cn(
        "shrink-0 bg-border", // Base styling with background color from the theme
        // Conditional styling based on orientation
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...props}
    />
  )
)

// Set a display name for better debugging in React DevTools
Separator.displayName = SeparatorPrimitive.Root.displayName

// Export the component for use in the application
export { Separator }