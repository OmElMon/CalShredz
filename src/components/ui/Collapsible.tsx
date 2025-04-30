// Import Radix UI's collapsible primitives
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";

// 1. Collapsible Root Component
// ----------------------------
// The container that manages the state of the collapsible content
// Wraps both the trigger and content components
const Collapsible = CollapsiblePrimitive.Root;

// 2. Collapsible Trigger Component
// -------------------------------
// The interactive element that toggles the content's visibility
// Typically a button or clickable element
const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;

// 3. Collapsible Content Component
// -------------------------------
// The content that shows/hides based on the collapsible state
// Automatically handles height animations
const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent;

// Export all components
export { Collapsible, CollapsibleTrigger, CollapsibleContent };