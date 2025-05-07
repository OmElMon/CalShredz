import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul"; // Vaul drawer library
import { cn } from "@/lib/Utils"; // Classname utility

// 1. Drawer Root Component
// ------------------------
const Drawer = ({
  shouldScaleBackground = true, // Whether to scale background content
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root
    shouldScaleBackground={shouldScaleBackground}
    {...props}
  />
);
Drawer.displayName = "Drawer";

// 2. Basic Components (Pass-through)
// ---------------------------------
const DrawerTrigger = DrawerPrimitive.Trigger; // Element that opens the drawer
const DrawerPortal = DrawerPrimitive.Portal; // Portals content to body
const DrawerClose = DrawerPrimitive.Close; // Element that closes the drawer

// 3. Drawer Overlay
// -----------------
const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80", // Full-screen semi-transparent overlay
      className
    )}
    {...props}
  />
));
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;

// 4. Drawer Content
// -----------------
const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay /> {/* Background overlay */}
    <DrawerPrimitive.Content
      ref={ref}
      className={cn(
        // Positioning and sizing
        "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px]",
        // Styling
        "border bg-background",
        className
      )}
      {...props}
    >
      {/* Drag handle */}
      <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
      {children}
    </DrawerPrimitive.Content>
  </DrawerPortal>
));
DrawerContent.displayName = "DrawerContent";

// 5. Drawer Header
// ----------------
const DrawerHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "grid gap-1.5 p-4", // Layout and spacing
      "text-center sm:text-left", // Responsive text alignment
      className
    )}
    {...props}
  />
);
DrawerHeader.displayName = "DrawerHeader";

// 6. Drawer Footer
// ----------------
const DrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "mt-auto flex flex-col gap-2 p-4", // Pushes to bottom with spacing
      className
    )}
    {...props}
  />
);
DrawerFooter.displayName = "DrawerFooter";

// 7. Drawer Title
// ---------------
const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight", // Typography
      className
    )}
    {...props}
  />
));
DrawerTitle.displayName = DrawerPrimitive.Title.displayName;

// 8. Drawer Description
// ---------------------
const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn(
      "text-sm text-muted-foreground", // Subtle text styling
      className
    )}
    {...props}
  />
));
DrawerDescription.displayName = DrawerPrimitive.Description.displayName;

// 9. Exports
// ----------
export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};