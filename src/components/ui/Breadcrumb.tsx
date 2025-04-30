import * as React from "react";
import { Slot } from "@radix-ui/react-slot"; // For polymorphic component support
import { ChevronRight, MoreHorizontal } from "lucide-react"; // Icons for separators/ellipsis
import { cn } from "@/lib/utils"; // Classname utility

// 1. Breadcrumb Root Component
// ----------------------------
// Wraps the entire breadcrumb navigation with ARIA labeling
const Breadcrumb = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<"nav"> & {
    separator?: React.ReactNode; // Custom separator between items
  }
>(({ ...props }, ref) => (
  <nav ref={ref} aria-label="breadcrumb" {...props} /> // Accessibility label
));
Breadcrumb.displayName = "Breadcrumb";

// 2. BreadcrumbList Component
// ---------------------------
// The ordered list containing breadcrumb items
const BreadcrumbList = React.forwardRef<
  HTMLOListElement,
  React.ComponentPropsWithoutRef<"ol">
>(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn(
      "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
      className
    )}
    {...props}
  />
));
BreadcrumbList.displayName = "BreadcrumbList";

// 3. BreadcrumbItem Component
// ---------------------------
// Individual list item in the breadcrumb trail
const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<"li">
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn("inline-flex items-center gap-1.5", className)}
    {...props}
  />
));
BreadcrumbItem.displayName = "BreadcrumbItem";

// 4. BreadcrumbLink Component
// ---------------------------
// Clickable link in the breadcrumb (can be polymorphic)
const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<"a"> & {
    asChild?: boolean; // Enables polymorphic behavior
  }
>(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a"; // Use Slot if asChild, otherwise <a>

  return (
    <Comp
      ref={ref}
      className={cn(
        "transition-colors hover:text-foreground", // Hover effect
        className
      )}
      {...props}
    />
  );
});
BreadcrumbLink.displayName = "BreadcrumbLink";

// 5. BreadcrumbPage Component
// ---------------------------
// The current/last page in the trail (non-clickable)
const BreadcrumbPage = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<"span">
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    role="link"
    aria-disabled="true" // Indicates non-interactive
    aria-current="page" // Marks current page
    className={cn("font-normal text-foreground", className)}
    {...props}
  />
));
BreadcrumbPage.displayName = "BreadcrumbPage";

// 6. BreadcrumbSeparator Component
// --------------------------------
// Visual separator between items (default: ChevronRight icon)
const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) => (
  <li
    role="presentation" // Hide from accessibility tree
    aria-hidden="true"
    className={cn("[&>svg]:size-3.5", className)} // Icon sizing
    {...props}
  >
    {children ?? <ChevronRight />} {/* Default to chevron if no children */}
  </li>
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

// 7. BreadcrumbEllipsis Component
// -------------------------------
// Collapsed items indicator (default: MoreHorizontal icon)
const BreadcrumbEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More</span> {/* Screen reader only text */}
  </span>
);
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";

// Export all components
export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};