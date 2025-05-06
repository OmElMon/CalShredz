import { useLocation } from "react-router-dom";
import { useEffect } from "react";

/**
 * COMPONENT: NotFound (404 Page)
 * DESCRIPTION: Displays when users navigate to a non-existent route.
 * Logs error details and provides a way to return to the home page.
 * 
 * FEATURES:
 * - Captures and logs the attempted invalid path
 * - Clean, user-friendly 404 message
 * - Responsive layout
 * - Home navigation link
 */
const NotFound = () => {
  // Hook to access current route location
  const location = useLocation();

  /**
   * EFFECT: Log 404 errors
   * Logs attempted invalid routes to help with debugging and analytics
   */
  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]); // Only re-run when pathname changes

  return (
    // Main container with centered content
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* Error message container */}
      <div className="text-center">
        {/* Error code */}
        <h1 className="text-4xl font-bold mb-4">404</h1>
        
        {/* Friendly error message */}
        <p className="text-xl text-gray-600 mb-4">
          Oops! Page not found
        </p>
        
        {/* Navigation back to safety */}
        <a 
          href="/" 
          className="text-blue-500 hover:text-blue-700 underline"
          aria-label="Return to home page"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;