/**
 * Skeleton Component
 * 
 * This file creates a simple skeleton loading component for use throughout a fitness app.
 * Skeleton loaders provide visual placeholders while content is loading, improving
 * the perceived performance and user experience during data fetching operations.
 */

// Import the utility for combining class names
import { cn } from "@/lib/utils"

/**
 * Skeleton Component
 * 
 * A pulsing placeholder element that indicates content is loading.
 * Can be styled and sized to match the expected content dimensions.
 * 
 * @param className - Additional CSS classes to apply custom styling, dimensions, etc.
 * @param props - All other props passed to the component (spread to the div element)
 * @returns A div element with pulsing animation and rounded edges
 */
function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-muted", // Base styling with animation and neutral background
        className // Custom classes for width, height, margins, etc.
      )}
      {...props}
    />
  )
}

// Export the component for use in the application
export { Skeleton }