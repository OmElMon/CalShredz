// Import React to use JSX and forwardRef
import * as React from "react"

// Import the `cn` utility function to combine Tailwind CSS class names conditionally
import { cn } from "@/lib/utils"

// Create a reusable Input component using React.forwardRef
const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  (
    { className, type, ...props }, // Destructure props: type and className are explicitly extracted
    ref // ref is forwarded so parent components can directly access the DOM input element
  ) => {
    return (
      <input
        type={type} // Use the input type provided (e.g., "text", "email", "password")
        ref={ref} // Attach the forwarded ref to the native input element
        className={cn(
          // Combine default Tailwind styling with any additional className provided by the user
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base " +
            "ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium " +
            "file:text-foreground placeholder:text-muted-foreground " +
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 " +
            "disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className // Merge in custom styles
        )}
        {...props} // Spread the remaining props to support all standard input attributes (e.g., onChange, value, placeholder)
      />
    )
  }
)

// Set a display name for better visibility in React DevTools
Input.displayName = "Input"

// Export the component so it can be used throughout the application
export { Input }