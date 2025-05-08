// Import React and Radix UI's tooltip primitives
import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils.ts" // Utility function for conditionally combining class names

// Export Radix Tooltip components as named exports for convenience and consistency
const TooltipProvider = TooltipPrimitive.Provider // Provides context for nested tooltips
const Tooltip = TooltipPrimitive.Root // Root element that manages open state
const TooltipTrigger = TooltipPrimitive.Trigger // Element that triggers the tooltip (e.g., button, icon)

// Tooltip content: the actual box that shows on hover/focus
const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>, // Ref type for Tooltip content element
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> // Accept standard props
>(
  ({ className, sideOffset = 4, ...props }, ref) => (
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset} // Distance between trigger and content (default 4px)
      className={cn(
        // Tailwind classes for styling and animation
        "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className // Additional custom class names
      )}
      {...props}
    />
  )
)
TooltipContent.displayName = TooltipPrimitive.Content.displayName // Set display name for better debugging

// Export all necessary parts for building tooltips elsewhere
export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }