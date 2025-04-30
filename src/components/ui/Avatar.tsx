// Import React and Radix UI's Avatar primitives
import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

// Utility function for combining class names
import { cn } from "@/lib/utils";

// 1. Avatar Root Component
// ------------------------
// The container that wraps all avatar elements
const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", // Base styles
      className // Custom class names
    )}
    {...props} // Spread all other props
  />
));
// Set display name for debugging
Avatar.displayName = AvatarPrimitive.Root.displayName;

// 2. Avatar Image Component
// -------------------------
// The actual image displayed in the avatar
const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn(
      "aspect-square h-full w-full", // Ensures square aspect ratio
      className // Custom class names
    )}
    {...props} // Spread all other props
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

// 3. Avatar Fallback Component
// ----------------------------
// Shown when the image fails to load or while loading
const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted", // Fallback styles
      className // Custom class names
    )}
    {...props} // Spread all other props
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

// Export all components
export { Avatar, AvatarImage, AvatarFallback };