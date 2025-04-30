// Import React and necessary libraries
import * as React from "react";
// Radix UI's primitive components for building accessible accordions
import * as AccordionPrimitive from "@radix-ui/react-accordion";
// ChevronDown icon from Lucide for the toggle indicator
import { ChevronDown } from "lucide-react";
// Utility function for combining Tailwind classes
import { cn } from "@/lib/utils";

// 1. Root Accordion Component
// --------------------------
// Wraps all accordion items and manages shared state
// (e.g., "single" for one open item at a time or "multiple" for many)
const Accordion = AccordionPrimitive.Root;

// 2. Accordion Item Component
// --------------------------
// Wraps each collapsible section of the accordion
const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>, // Type for the ref
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> // Type for props
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(
      "border-b", // Default bottom border
      className // Allows custom classes to be passed
    )}
    {...props} // Spread all other props
  />
));
// Set display name for debugging in React DevTools
AccordionItem.displayName = "AccordionItem";

// 3. Accordion Trigger Component
// -----------------------------
// The clickable header that toggles content visibility
const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 font-medium transition-all", // Base styling
        "hover:underline", // Hover effect
        "[&[data-state=open]>svg]:rotate-180", // Rotate icon when open
        className // Custom class support
      )}
      {...props} // Spread props
    >
      {children} {/* The trigger label/text */}
      {/* Animated chevron icon (rotates 180° when open) */}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
// Use Radix's default display name
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

// 4. Accordion Content Component
// -----------------------------
// The collapsible content area
const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      "overflow-hidden text-sm transition-all", // Base styling
      "data-[state=closed]:animate-accordion-up", // Close animation
      "data-[state=open]:animate-accordion-down", // Open animation
      className // Custom class support
    )}
    {...props} // Spread props
  >
    {/* Extra div for padding control */}
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
));

// Use Radix's default display name
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

// Export all components for use in other files
export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };