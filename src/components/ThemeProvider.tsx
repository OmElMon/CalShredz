import React, { createContext, useContext, useEffect, useState } from 'react';
import { userProfile } from '@/lib/data';

/**
 * TYPE DEFINITIONS
 * 
 * Theme: The available theme options ('light' or 'dark')
 * ThemeContextType: Shape of the context value with:
 *   - theme: Current theme
 *   - setTheme: Function to explicitly set theme
 *   - toggleTheme: Function to toggle between themes
 */
type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

/**
 * CONTEXT CREATION
 * Creates a React context for theme management with undefined default value
 */
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * COMPONENT: ThemeProvider
 * DESCRIPTION: Provider component that manages theme state and provides it to child components
 * 
 * FEATURES:
 * - Persists theme preference to localStorage
 * - Respects system color scheme preference
 * - Applies theme class to document root
 * - Provides theme controls via context
 * 
 * @param children - Child components that will have access to theme context
 */
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // STATE MANAGEMENT
  const [theme, setTheme] = useState<Theme>(() => {
    // Initialize theme with priority order:
    // 1. Saved preference in localStorage
    // 2. System preference
    // 3. Default to light theme
    
    // Only run this logic on client-side (window exists)
    if (typeof window !== 'undefined') {
      // Check for saved theme in localStorage
      const savedTheme = localStorage.getItem('theme') as Theme | null;
      if (savedTheme) return savedTheme;
      
      // Check system color scheme preference
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    
    // Fallback to light theme
    return 'light';
  });

  // EFFECT: Apply theme changes to document and persist to localStorage
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Clean up previous theme class and apply new one
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    
    // Persist theme preference to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  /**
   * Toggles between light and dark themes
   */
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Provide theme context to children
  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * HOOK: useTheme
 * DESCRIPTION: Custom hook for accessing theme context
 * 
 * @returns ThemeContextType - Current theme and theme control functions
 * @throws Error if used outside ThemeProvider
 */
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};