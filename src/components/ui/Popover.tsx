// Import necessary dependencies
import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover" // Radix UI's unstyled popover components
import { cn } from "@/lib/Utils" // Utility for combining class names

/**
 * Export the base Popover component (root)
 * This is the container for the entire popover system
 */
const Popover = PopoverPrimitive.Root

/**
 * Export the PopoverTrigger component
 * This is the element that users interact with to open/close the popover
 */
const PopoverTrigger = PopoverPrimitive.Trigger

/**
 * Create and export the PopoverContent component
 * This is the actual floating content that appears when the trigger is activated
 * 
 * Uses React.forwardRef to pass refs through to the underlying Radix component
 * 
 * @param className - Additional CSS classes to apply to the content
 * @param align - Alignment of the popover relative to trigger ("center" by default)
 * @param sideOffset - Distance between popover and trigger (4px by default)
 * @param props - All other props passed to the component
 * @param ref - Forwarded ref
 */
const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
))

// Set a display name for better debugging in React DevTools
PopoverContent.displayName = PopoverPrimitive.Content.displayName

// Export the components for use in the application
export { Popover, PopoverTrigger, PopoverContent }