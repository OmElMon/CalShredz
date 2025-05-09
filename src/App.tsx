import { Toaster } from "@/components/ui/Toaster";
import { Toaster as Sonner } from "@/components/ui/Sonner";
import { TooltipProvider } from "@/components/ui/ToolTip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "./components/ThemeProvider";

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
  // React Query provider for data fetching
  <QueryClientProvider client={queryClient}>
    {/* Theme provider for dark/light mode support */}
    <ThemeProvider>
      {/* Tooltip provider for accessibility */}
      <TooltipProvider>
        {/* Toast notification systems (two different implementations) */}
        <Toaster />
        <Sonner />
        
        {/* Client-side routing setup */}
        <BrowserRouter>
          <Routes>
            {/* Main application route */}
            <Route path="/" element={<Index />} />
            
            {/* 
              IMPORTANT: All custom routes should be added above this line
              This catch-all route handles 404 errors for unknown paths 
            */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;