// Import React and icon components
import * as React from "react"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react" // Navigation icons

// Import utility for merging class names and shared button variants
import { cn } from "@/lib/utils"
import { ButtonProps, buttonVariants } from "@/components/ui/button"

// === Pagination Root Container ===
// Used to wrap the entire pagination bar
const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)} // Center the pagination
    {...props}
  />
)
Pagination.displayName = "Pagination"

// === Content Container ===
// A <ul> that holds pagination items
const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)} // Row layout with spacing
    {...props}
  />
))
PaginationContent.displayName = "PaginationContent"

// === Individual Pagination Item ===
// Typically a <li> used to wrap a link or ellipsis
const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
))
PaginationItem.displayName = "PaginationItem"

// === Pagination Link ===
// Reusable link component for numbered pages or arrows
type PaginationLinkProps = {
  isActive?: boolean // If the page is the current one
} & Pick<ButtonProps, "size"> & // Size from button component
  React.ComponentProps<"a"> // Standard anchor props

const PaginationLink = ({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined} // Accessibility: sets the current page
    className={cn(
      buttonVariants({
        variant: isActive ? "outline" : "ghost", // Highlight current page
        size,
      }),
      className
    )}
    {...props}
  />
)
PaginationLink.displayName = "PaginationLink"

// === Previous Button ===
const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    className={cn("gap-1 pl-2.5", className)} // Adds spacing for icon + text
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
    <span>Previous</span>
  </PaginationLink>
)
PaginationPrevious.displayName = "PaginationPrevious"

// === Next Button ===
const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    className={cn("gap-1 pr-2.5", className)}
    {...props}
  >
    <span>Next</span>
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
)
PaginationNext.displayName = "PaginationNext"

// === Ellipsis (for skipped pages) ===
const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden // Hides from screen readers
    className={cn("flex h-9 w-9 items-center justify-center", className)} // Uniform size with links
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span> {/* For screen reader context */}
  </span>
)
PaginationEllipsis.displayName = "PaginationEllipsis"

export {
    Pagination,            // Root container <nav>
    PaginationContent,     // Inner <ul>
    PaginationEllipsis,    // Ellipsis (...)
    PaginationItem,        // <li> wrapper
    PaginationLink,        // Numbered links
    PaginationNext,        // "Next" button
    PaginationPrevious,    // "Previous" button
  }