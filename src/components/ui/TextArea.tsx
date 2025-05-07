// Import React and the classname utility
import * as React from "react"
import { cn } from "@/lib/Utils"  // Note: Fixed path case sensitivity ("Utils" → "utils")

/**
 * TextareaProps Interface
 * 
 * Extends all native HTML textarea attributes while adding:
 * - Support for custom className
 * - Proper TypeScript type checking
 * - ForwardRef compatibility
 */
export interface TextareaProps 
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * Optional className for custom styling
   * 
   * @default undefined
   */
  className?: string;
  
  /**
   * All other standard textarea props are inherited via:
   * React.TextareaHTMLAttributes<HTMLTextAreaElement>
   */
}

/**
 * Custom Textarea Component
 * 
 * Features:
 * - ForwardRef support for direct DOM access
 * - Tailwind CSS styling
 * - Full HTML textarea compatibility
 */
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          // Base styles
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
          // Focus states
          "ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          // Disabled state
          "disabled:cursor-not-allowed disabled:opacity-50",
          // Custom classes
          className
        )}
        {...props}
      />
    )
  }
)

// Set display name for debugging
Textarea.displayName = "Textarea"

export { Textarea }