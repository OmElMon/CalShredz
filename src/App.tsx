import { Toaster } from "@/components/ui/Toaster";
import { Toaster as Sonner } from "@/components/ui/Sonner";
import { TooltipProvider } from "@/components/ui/ToolTip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "./components/ThemeProvider";
import ForceTailwindSafelist from "./ForceTailwindSafelist"; // 🔧 Dummy component to preserve Tailwind styles

/**
 * QUERY CLIENT INSTANCE
 * Configuration for React Query's data fetching and caching
 */
const queryClient = new QueryClient();

/**
 * APP COMPONENT
 * DESCRIPTION: The root application component that wraps all providers and routes
 * 
 * PROVIDERS CONFIGURED:
 * 1. QueryClientProvider - For React Query data management
 * 2. ThemeProvider - For application-wide theme support
 * 3. TooltipProvider - For accessible tooltip functionality
 * 4. Toaster/Sonner - For toast notifications (two different systems)
 * 5. BrowserRouter - For client-side routing
 * 
 * ROUTES CONFIGURED:
 * - "/" - Main application page
 * - "*" - Catch-all route for 404 errors (must be last)
 */
const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>

        {/* 👇 Force Tailwind to include critical classes in production */}
        <ForceTailwindSafelist />
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;