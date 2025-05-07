// Import React and the utility function for merging Tailwind classes
import * as React from "react"
import { cn } from "@/lib/Utils"

// Main Table wrapper component
const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  // Wrap table in a div for scrollability on small screens
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)} // Tailwind styling for full width and smaller font
      {...props}
    />
  </div>
))
Table.displayName = "Table"

// Table header wrapper
const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn("[&_tr]:border-b", className)} // Adds bottom border to each <tr> inside thead
    {...props}
  />
))
TableHeader.displayName = "TableHeader"

// Table body wrapper
const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)} // Removes border from the last row
    {...props}
  />
))
TableBody.displayName = "TableBody"

// Table footer wrapper
const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", // Adds top border and muted background
      className
    )}
    {...props}
  />
))
TableFooter.displayName = "TableFooter"

// Table row component
const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted", // Hover and selected row state
      className
    )}
    {...props}
  />
))
TableRow.displayName = "TableRow"

// Table header cell (column titles)
const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0", // Style for sorting and checkbox compatibility
      className
    )}
    {...props}
  />
))
TableHead.displayName = "TableHead"

// Table data cell
const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "p-4 align-middle [&:has([role=checkbox])]:pr-0", // Padding and alignment
      className
    )}
    {...props}
  />
))
TableCell.displayName = "TableCell"

// Optional caption below the table
const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)} // Subdued caption text
    {...props}
  />
))
TableCaption.displayName = "TableCaption"

// Export all components for usage
export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}