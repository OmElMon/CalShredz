// Import necessary libraries
import * as React from "react"
import * as HoverCardPrimitive from "@radix-ui/react-hover-card" // Radix HoverCard primitives
import { cn } from "@/lib/utils" // Utility to conditionally join Tailwind classes

// Re-export Radix's HoverCard root component for creating the hover card context
const HoverCard = HoverCardPrimitive.Root

// Re-export Radix's HoverCard trigger (the element that the user hovers over)
const HoverCardTrigger = HoverCardPrimitive.Trigger

// Custom wrapper around Radix's HoverCard.Content with additional styling and behavior
const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>, // Type for the underlying DOM element
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content> // Props without ref
>(
  (
    { className, align = "center", sideOffset = 4, ...props }, // Destructure props with defaults
    ref // Forwarded ref for the underlying DOM element
  ) => (
    <HoverCardPrimitive.Content
      ref={ref} // Attach the forwarded ref
      align={align} // Positioning alignment (e.g., "center", "start", "end")
      sideOffset={sideOffset} // Offset from the trigger element
      className={cn(
        // Combine default and custom styles using the cn utility
        "z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none " +
          // Animate in/out depending on state and position
          "data-[state=open]:animate-in data-[state=closed]:animate-out " +
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 " +
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 " +
          "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 " +
          "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className // Merge with user-defined className if any
      )}
      {...props} // Pass remaining props to the underlying Radix Content component
    />
  )
)

// Set the display name for better debugging in React DevTools
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName

// Export the components so they can be used in other files
export { HoverCard, HoverCardTrigger, HoverCardContent} 