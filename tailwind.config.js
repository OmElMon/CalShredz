// Import TailwindCSS configuration type for TypeScript support
import type { Config } from "tailwindcss";

// Export the configuration object
export default {
  // Enables class-based dark mode (toggle via className="dark")
  darkMode: ["class"],
  
  // Files where Tailwind should look for class names
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  
  // Optional prefix for all Tailwind classes (e.g. 'tw-' for namespacing)
  prefix: "",
  
  // Theme customization
  theme: {
    // Container configuration (used with @container)
    container: {
      center: true,    // Center container by default
      padding: '2rem', // Default padding
      screens: {
        '2xl': '1400px' // Max-width for 2xl screens
      }
    },
    
    // Extending the default theme
    extend: {
      // Custom color palette
      colors: {
        // Semantic colors using CSS variables
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        
        // Color groups with DEFAULT and foreground variants
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        
        // Sidebar-specific colors
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))'
        },
        
        // Custom anime-inspired color palette (hardcoded values)
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
      
      // Border radius configuration
      borderRadius: {
        lg: 'var(--radius)',               // Large radius
        md: 'calc(var(--radius) - 2px)',  // Medium (large minus 2px)
        sm: 'calc(var(--radius) - 4px)'    // Small (large minus 4px)
      },
      
      // Custom keyframe animations
      keyframes: {
        // Accordion animations (used with Radix UI)
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },
        
        // Custom retro-style animations
        'pulse-retro': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' }
        },
        'shimmer': {
          '0%': { backgroundPosition: '-500px 0' },
          '100%': { backgroundPosition: '500px 0' }
        },
        'bounce-retro': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' }
        }
      },
      
      // Animation utilities
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'pulse-retro': 'pulse-retro 2s ease-in-out infinite',
        'shimmer': 'shimmer 3s infinite linear',
        'bounce-retro': 'bounce-retro 1s infinite'
      },
      
      // Custom font families
      fontFamily: {
        pixel: ['"Press Start 2P"', 'cursive'], // Retro pixel font
        anime: ['"Bangers"', 'cursive']         // Comic/anime style font
      },
    }
  },
  
  // Tailwind plugins
  plugins: [
    require("tailwindcss-animate") // Adds animation utilities
  ],
} satisfies Config; // Type assertion for TypeScript