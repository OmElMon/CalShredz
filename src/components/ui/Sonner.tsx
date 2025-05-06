// Import the `useTheme` hook to get the current theme (light, dark, or system)
import { useTheme } from "next-themes"

// Import the Sonner toaster component and the toast trigger function
import { Toaster as Sonner, toast } from "sonner"

// Define the prop types by reusing the props from Sonner's component
type ToasterProps = React.ComponentProps<typeof Sonner>

// Custom Toaster wrapper component
const Toaster = ({ ...props }: ToasterProps) => {
  // Get the current theme setting from next-themes, defaulting to "system"
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      // Set the theme dynamically based on the app's current theme
      theme={theme as ToasterProps["theme"]}
      className="toaster group" // Wrapper class for styling and targeting via `group` utility
      toastOptions={{
        // Customize the appearance of toast elements using class names
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props} // Spread any additional props passed in
    />
  )
}

// Export both the Toaster component and the `toast()` function for showing notifications
export { Toaster, toast }