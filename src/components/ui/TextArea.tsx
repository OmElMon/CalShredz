// Import React and utility for merging class names
import * as React from "react"
import { cn } from "@/lib/utils"

// Define the props interface by extending native <textarea> attributes
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

// Create a forwardRef component so parent components can get a ref to the <textarea>
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref} // attach the forwarded ref
        {...props} // spread all other passed-in props (e.g. value, onChange)
        className={cn(
          // Apply default styling using Tailwind and allow overrides via className
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
      />
    )
  }
)

// Set a display name for debugging/dev tools
Textarea.displayName = "Textarea"

// Export the component for use
export { Textarea }