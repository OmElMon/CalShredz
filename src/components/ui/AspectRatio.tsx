// Import the Aspect Ratio primitive from Radix UI
// Radix provides unstyled, accessible UI primitives for React
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";

// 1. Aspect Ratio Component
// -------------------------
// This component maintains a specific width-to-height ratio for its content
// regardless of the container size. Useful for responsive media embeds (videos, images, etc.)
// 
// It uses Radix's implementation which handles the aspect ratio calculation
// and ensures consistent behavior across browsers
const AspectRatio = AspectRatioPrimitive.Root;

// Export the component for use in other files
export { AspectRatio };