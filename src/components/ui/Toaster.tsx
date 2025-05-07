// Import custom toast hook to access current toasts
import { useToast } from "@/hooks/UseToast"

// Import toast UI components (based on Radix)
import {
  Toast,             // Wrapper for a single toast message
  ToastClose,        // Close button (X)
  ToastDescription,  // Optional body text
  ToastProvider,     // Context provider to manage all toasts
  ToastTitle,        // Main heading/title
  ToastViewport,     // Where the toasts are rendered (bottom-right, etc.)
} from "@/components/ui/toast"

// Toaster component that renders all active toasts
export function Toaster() {
  const { toasts } = useToast() // Get all current toasts from custom hook

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}> {/* Individual toast */}
            <div className="grid gap-1">
              {/* Render title if it exists */}
              {title && <ToastTitle>{title}</ToastTitle>}

              {/* Render description if it exists */}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>

            {/* Optional custom action (e.g., undo button) */}
            {action}

            {/* Close button in the corner */}
            <ToastClose />
          </Toast>
        )
      })}

      {/* Positioning container for all toasts */}
      <ToastViewport />
    </ToastProvider>
  )
}