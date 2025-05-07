// Import necessary dependencies
import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area" // Radix UI's unstyled scroll area components
import { cn } from "@/lib/Utils" // Utility for combining class names

/**
 * ScrollArea Component
 * 
 * A container component that provides custom scrolling functionality with styled scrollbars.
 * 
 * @param className - Additional CSS classes to apply to the scroll area
 * @param children - Content to be displayed within the scrollable viewport
 * @param props - All other props passed to the component
 * @param ref - Forwarded ref to access the underlying DOM element
 */
const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn("relative overflow-hidden", className)} // Hide default scrollbars
    {...props}
  >
    {/* The main viewport where content is displayed */}
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
      {children}
    </ScrollAreaPrimitive.Viewport>
    
    {/* Custom scrollbar component */}
    <ScrollBar />
    
    {/* Corner element where horizontal and vertical scrollbars meet */}
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
))

// Set a display name for better debugging in React DevTools
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

/**
 * ScrollBar Component
 * 
 * The custom scrollbar UI that appears when content overflows.
 * Supports both vertical and horizontal orientations.
 * 
 * @param className - Additional CSS classes to apply to the scrollbar
 * @param orientation - Direction of the scrollbar ("vertical" or "horizontal")
 * @param props - All other props passed to the component
 * @param ref - Forwarded ref to access the underlying DOM element
 */
const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors", // Base styles for all scrollbars
      
      // Styles specific to vertical scrollbars
      orientation === "vertical" &&
        "h-full w-2.5 border-l border-l-transparent p-[1px]",
      
      // Styles specific to horizontal scrollbars
      orientation === "horizontal" &&
        "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      
      className
    )}
    {...props}
  >
    {/* The draggable thumb portion of the scrollbar */}
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
))

// Set a display name for better debugging in React DevTools
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

// Export the components for use in the application
export { ScrollArea, ScrollBar }