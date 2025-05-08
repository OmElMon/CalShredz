import * as React from "react";
import { cn } from "@/lib/utils"; // Classname utility function

// 1. Card Root Component
// ----------------------
// The container for all card content with basic styling
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm", // Base card styles
      className // Custom class names
    )}
    {...props} // Spread all other props
  />
));
Card.displayName = "Card"; // For debugging purposes

// 2. Card Header Component
// ------------------------
// Container for the card's header content (title + description)
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col space-y-1.5 p-6", // Layout and spacing
      className
    )}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

// 3. Card Title Component
// -----------------------
// The card's main heading/title
const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight", // Typography
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

// 4. Card Description Component
// -----------------------------
// Supplementary text below the title
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "text-sm text-muted-foreground", // Subtle text styling
      className
    )}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

// 5. Card Content Component
// -------------------------
// Main content area of the card
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "p-6 pt-0", // Padding with no top padding (adjacent to header)
      className
    )}
    {...props}
  />
));
CardContent.displayName = "CardContent";

// 6. Card Footer Component
// ------------------------
// Container for actions/buttons at card bottom
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center p-6 pt-0", // Flex layout with padding
      className
    )}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

// Export all components
export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
