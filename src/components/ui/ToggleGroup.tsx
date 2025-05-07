// Import necessary modules from React and Radix UI Toggle Group
import * as React from "react"
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"
import { type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/Utils" // Utility to merge Tailwind class names
import { toggleVariants } from "@/components/ui/Toggle" // Variants for styling toggles

// Create a context to pass down toggle size and variant styles from group to items
const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants>
>({
  size: "default",
  variant: "default",
})

// ToggleGroup wraps the Radix ToggleGroupPrimitive.Root
const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> &
    VariantProps<typeof toggleVariants> // Adds optional size/variant props
>(
  ({ className, variant, size, children, ...props }, ref) => (
    <ToggleGroupPrimitive.Root
      ref={ref}
      className={cn("flex items-center justify-center gap-1", className)} // default layout
      {...props}
    >
      {/* Provide variant and size context to child toggle items */}
      <ToggleGroupContext.Provider value={{ variant, size }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  )
)
ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName

// ToggleGroupItem is a styled button inside the group
const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> &
    VariantProps<typeof toggleVariants> // Allows overriding variant/size
>(
  ({ className, children, variant, size, ...props }, ref) => {
    const context = React.useContext(ToggleGroupContext) // Get default variant/size from context

    return (
      <ToggleGroupPrimitive.Item
        ref={ref}
        className={cn(
          toggleVariants({
            // Use context values or fallback to props
            variant: context.variant || variant,
            size: context.size || size,
          }),
          className
        )}
        {...props}
      >
        {children}
      </ToggleGroupPrimitive.Item>
    )
  }
)
ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName

// Exporting both components
export { ToggleGroup, ToggleGroupItem }