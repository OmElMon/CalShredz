// Import necessary dependencies
import { GripVertical } from "lucide-react" // Icon used for the resize handle grip
import * as ResizablePrimitive from "react-resizable-panels" // Base resizable panel primitives
import { cn } from "@/lib/utils" // Utility for combining class names

/**
 * ResizablePanelGroup Component
 * 
 * Container component that groups multiple resizable panels together.
 * Can be configured for horizontal or vertical panel arrangements.
 * 
 * @param className - Additional CSS classes to apply
 * @param props - All props passed to the underlying PanelGroup component
 */
const ResizablePanelGroup = ({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) => (
  <ResizablePrimitive.PanelGroup
    className={cn(
      "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
      className
    )}
    {...props}
  />
)

/**
 * ResizablePanel Component
 * 
 * The individual panel that can be resized. This is a direct re-export
 * of the Panel component from react-resizable-panels with no customization.
 */
const ResizablePanel = ResizablePrimitive.Panel

/**
 * ResizableHandle Component
 * 
 * Custom resize handle that appears between panels and allows users to drag
 * to resize the adjacent panels.
 * 
 * @param withHandle - Whether to show a visible grip handle indicator
 * @param className - Additional CSS classes to apply
 * @param props - All props passed to the underlying PanelResizeHandle component
 */
const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean // Custom prop to show/hide the grip handle UI
}) => (
  <ResizablePrimitive.PanelResizeHandle
    className={cn(
      "relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90",
      className
    )}
    {...props}
  >
    {/* Optional visual grip handle indicator */}
    {withHandle && (
      <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border">
        <GripVertical className="h-2.5 w-2.5" />
      </div>
    )}
  </ResizablePrimitive.PanelResizeHandle>
)

// Export the components for use in the application
export { ResizablePanelGroup, ResizablePanel, ResizableHandle }