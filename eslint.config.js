// Import necessary ESLint dependencies and plugins
import js from "@eslint/js"; // ESLint's core recommended rules
import globals from "globals"; // Provides environment globals (browser, node etc.)
import reactHooks from "eslint-plugin-react-hooks"; // Rules for React hooks
import reactRefresh from "eslint-plugin-react-refresh"; // Support for React Fast Refresh
import tseslint from "typescript-eslint"; // TypeScript-specific ESLint rules

// Export the ESLint configuration
export default tseslint.config(
  // First configuration object: global settings
  { 
    ignores: ["dist"] // Ignore files in the 'dist' directory (build output)
  },
  
  // Second configuration object: rules for TypeScript/React files
  {
    // Extend base configurations:
    extends: [
      js.configs.recommended, // ESLint's JavaScript recommended rules
      ...tseslint.configs.recommended // TypeScript recommended rules (spread into array)
    ],
    
    // Apply this config only to TypeScript files
    files: ["**/*.{ts,tsx}"],
    
    // Language/environment settings
    languageOptions: {
      ecmaVersion: 2020, // Use ECMAScript 2020 features
      globals: globals.browser, // Include browser global variables (window, document etc.)
    },
    
    // Register plugins
    plugins: {
      "react-hooks": reactHooks, // For React hooks rules
      "react-refresh": reactRefresh // For React Fast Refresh support
    },
    
    // Custom rule configurations
    rules: {
      // Include all recommended React Hooks rules
      ...reactHooks.configs.recommended.rules,
      
      // Configure React Refresh to warn about non-component exports at the top level
      // (but allow constant exports)
      "react-refresh/only-export-components": [
        "warn", // Warning level (not error)
        { allowConstantExport: true } // Allows exporting constants
      ],
      
      // Disable TypeScript's unused variables rule (might be handled by TS compiler)
      "@typescript-eslint/no-unused-vars": "off"
    },
  }
);