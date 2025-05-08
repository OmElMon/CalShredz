import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp"; // OTP input library
import { Dot } from "lucide-react"; // Separator icon
import { cn } from "@/lib/utils"; // Classname utility

/**
 * InputOTP - Root component for the OTP input system
 * Wraps the OTPInput component with custom styling
 */
const InputOTP = React.forwardRef<
  React.ElementRef<typeof OTPInput>,
  React.ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, containerClassName, ...props }, ref) => (
  <OTPInput
    ref={ref}
    containerClassName={cn(
      "flex items-center gap-2 has-[:disabled]:opacity-50", // Layout and disabled state
      containerClassName
    )}
    className={cn("disabled:cursor-not-allowed", className)} // Disabled state
    {...props}
  />
));
InputOTP.displayName = "InputOTP";

/**
 * InputOTPGroup - Container for OTP input slots
 * Provides flexible layout for the OTP digits
 */
const InputOTPGroup = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center", className)} {...props} />
));
InputOTPGroup.displayName = "InputOTPGroup";

/**
 * InputOTPSlot - Individual digit slot in the OTP input
 * Handles visual states (active, filled, caret)
 */
const InputOTPSlot = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & { index: number }
>(({ index, className, ...props }, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];

  return (
    <div
      ref={ref}
      className={cn(
        // Base styling
        "relative flex h-10 w-10 items-center justify-center",
        "border-y border-r border-input text-sm transition-all",
        "first:rounded-l-md first:border-l last:rounded-r-md", // Rounded corners
        // Active state
        isActive && "z-10 ring-2 ring-ring ring-offset-background",
        className
      )}
      {...props}
    >
      {char} {/* The displayed character */}
      {/* Animated caret for empty active slot */}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
        </div>
      )}
    </div>
  );
});
InputOTPSlot.displayName = "InputOTPSlot";

/**
 * InputOTPSeparator - Visual separator between OTP groups
 * Uses a dot icon by default but can be customized
 */
const InputOTPSeparator = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ ...props }, ref) => (
  <div ref={ref} role="separator" {...props}>
    <Dot /> {/* Can be replaced with any separator */}
  </div>
));
InputOTPSeparator.displayName = "InputOTPSeparator";

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };