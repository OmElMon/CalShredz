// Import the Config type from tailwindcss for TypeScript type checking
// This helps ensure your configuration matches Tailwind's expected structure
import type { Config } from "tailwindcss";

/**
 * Tailwind CSS Configuration
 * 
 * This configuration extends Tailwind with custom:
 * - Colors
 * - Animations
 * - Fonts
 * - Plugin integrations
 */
export default {
  // Enable class-based dark mode (toggle via className="dark")
  darkMode: ["class"],
  
  // Files where Tailwind should scan for class usage
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./App/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  
  // Optional prefix for all utility classes
  prefix: "",
  
  // Theme customization
  theme: {
    // Container configuration
    container: {
      center: true,    // Center containers by default
      padding: '2rem', // Default horizontal padding
      screens: {
        '2xl': '1400px' // Max-width for 2xl screens
      }
    },
    
    // Extend the default theme
    extend: {
      // Custom color palette
      colors: {
        // Semantic colors using CSS variables
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        
        // Color groups with variants
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        // ... other semantic colors
        
        // Custom anime-inspired color palette
        anime: {
          red: '#ff5757',    // Vibrant red
          blue: '#57c7ff',   // Bright blue
          yellow: '#ffbd59', // Sunny yellow
          purple: '#9b87f5', // Soft purple
          pink: '#ff6bcb',   // Neon pink
          teal: '#57ffe2',   // Electric teal
          dark: '#1A1F2C',   // Deep dark
          light: '#F6F8FA'   // Off-white
        }
      },
      
      // Border radius values
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      
      // Custom keyframe animations
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        // ... other animations
      },
      
      // Animation utilities
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        // ... other animation mappings
      },
      
      // Custom font families
      fontFamily: {
        pixel: ['"Press Start 2P"', 'cursive'], // Retro pixel font
        anime: ['"Bangers"', 'cursive']         // Comic-style font
      },
    }
  },
  
  // Tailwind plugins
  plugins: [
    require("tailwindcss-animate") // Adds animation utilities
  ],
} satisfies Config; // Type assertion ensures config matches Tailwind's type