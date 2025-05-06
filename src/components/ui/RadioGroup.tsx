/**
 * RadioGroupItem Component
 * 
 * The individual selectable radio button within a radio group.
 * 
 * @param className - Additional CSS classes to apply to the radio item
 * @param props - All other props passed to the component
 * @param ref - Forwarded ref to access the underlying DOM element
 */
const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      {/* The indicator that shows when the radio button is selected */}
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-2.5 w-2.5 fill-current text-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})

// Set a display name for better debugging in React DevTools
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

// Export the components for use in the application
export { RadioGroup, RadioGroupItem }