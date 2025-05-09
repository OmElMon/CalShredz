import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "/", // Base path for assets
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    // Only use componentTagger in development mode
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Add build configuration for better Vercel compatibility
  build: {
    // Output directory that Vercel will use
    outDir: 'dist',
    // Generate sourcemaps for better debugging
    sourcemap: true,
    // Ensure assets are properly referenced
    assetsDir: 'assets',
    // Optimize chunks for better loading
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          // Add more manual chunks as needed
        }
      }
    }
  },
}));