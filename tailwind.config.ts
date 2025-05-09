// Import the Config type from tailwindcss for TypeScript type checking
// This helps ensure your configuration matches Tailwind's expected structure
import type { Config } from "tailwindcss";

/**
 * Tailwind CSS Configuration
 * 
 * This configuration extends Tailwind with custom:
 * - Colors (anime theme + semantic)
 * - Animations and keyframes
 * - Fonts (pixel + comic style)
 * - Plugins (e.g., tailwindcss-animate)
 * 
 * Includes a safelist to prevent purge of dynamic utility classes during production.
 */
export default {
  // Enable class-based dark mode (toggle via className="dark")
  darkMode: ["class"],

  // Paths where Tailwind scans for class usage (used for purging unused styles)
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./index.html"
  ],

  // Safelist utility classes that may be dynamically generated or hard to detect
  // Ensures Tailwind includes these styles in the final build
  safelist: [
    // Base layout and theming
    "bg-background", "text-foreground", "border-border", "min-h-screen",

    // Typography and spacing
    "text-white", "text-red-500", "text-blue-500", "text-sm", "text-xl",
    "font-pixel", "p-4", "px-6", "py-3",

    // Retro UI components
    "retro-btn", "glitch", "gradient-text", "rounded-md", "overflow-hidden",

    // Color and animation usage
    "bg-anime-purple", "bg-anime-blue", "bg-anime-red", "bg-anime-teal",
    "hover:bg-anime-purple", "active:bg-anime-purple",
    "transition-colors", "duration-300", "ease-in-out",

    // Custom progress components
    "pixel-border", "pixel-progress-container", "pixel-progress-bar",
    "bg-gray-200", "h-full", "w-full", "relative", "z-50", "shadow-md"
  ],

  // Optional prefix for all utility classes (not used here)
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

        // Custom anime-inspired color palette
        anime: {
          red: '#ff5757',     // Vibrant red
          blue: '#57c7ff',    // Bright blue
          yellow: '#ffbd59',  // Sunny yellow
          purple: '#9b87f5',  // Soft purple
          pink: '#ff6bcb',    // Neon pink
          teal: '#57ffe2',    // Electric teal
          dark: '#1A1F2C',    // Deep dark
          light: '#F6F8FA'    // Off-white
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
        // ... Add other keyframes here
      },

      // Animation utilities
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        // ... Add other named animations here
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
} satisfies Config;