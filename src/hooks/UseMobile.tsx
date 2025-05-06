import * as React from "react"

/**
 * CONSTANT: MOBILE_BREAKPOINT
 * DESCRIPTION: The pixel width at which we consider a device to be mobile
 * Value matches common tablet portrait mode breakpoint (768px)
 */
const MOBILE_BREAKPOINT = 768

/**
 * HOOK: useIsMobile
 * DESCRIPTION: A custom React hook that detects whether the current viewport is mobile-sized
 * 
 * FEATURES:
 * - Returns a boolean indicating mobile status
 * - Listens for viewport changes and updates state
 * - Initializes with correct value on first render
 * - Cleans up event listeners on unmount
 * 
 * @returns boolean - True if viewport is mobile-sized (width < MOBILE_BREAKPOINT)
 */
export function useIsMobile() {
  // STATE: Tracks whether current viewport is mobile
  // Undefined initially to handle SSR cases
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  // EFFECT: Sets up media query listener
  React.useEffect(() => {
    // Create media query list for our mobile breakpoint
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)

    // Handler for viewport changes
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    // Add event listener for viewport changes
    mql.addEventListener("change", onChange)
    
    // Set initial value
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)

    // Cleanup: Remove event listener when component unmounts
    return () => mql.removeEventListener("change", onChange)
  }, []) // Empty dependency array ensures this runs only once

  // Convert undefined to boolean (handles SSR case)
  return !!isMobile
}