{
    "compilerOptions": {
      // ==============================================
      // LANGUAGE TARGET & RUNTIME LIBRARIES
      // ==============================================
      "target": "ES2022",  // Compiles code to ES2022 JavaScript syntax
      "lib": ["ES2023"],   // Includes type definitions for ES2023 APIs
      "module": "ESNext",  // Uses latest ES Modules (ESM) syntax
      "skipLibCheck": true, // Skips type checking of library declaration files (improves performance)
  
      // ==============================================
      // BUNDLER-SPECIFIC CONFIGURATION
      // (Optimized for Vite/Rollup/esbuild)
      // ==============================================
      "moduleResolution": "bundler", // Modern resolution strategy for bundlers
      "allowImportingTsExtensions": true, // Permits importing .ts/.tsx files without extensions
      "isolatedModules": true, // Ensures each file can be safely transpiled independently (critical for HMR)
      "moduleDetection": "force", // Forces all files to be treated as ES modules
      "noEmit": true, // Prevents TypeScript from outputting compiled files (bundler handles this)
  
      // ==============================================
      // TYPE CHECKING & CODE QUALITY
      // ==============================================
      "strict": true, // Enables all strict type checking options
      "noUnusedLocals": false, // Disables warnings about unused local variables (relaxed)
      "noUnusedParameters": false, // Disables warnings about unused function parameters (relaxed)
      "noFallthroughCasesInSwitch": true // Enforces 'break' statements in switch cases
  
      /*
       * Note: This configuration is missing several common options:
       * - Path aliases ('baseUrl' and 'paths')
       * - JSX configuration (if using React)
       * - Type declaration inclusions ('types')
       * - Source map generation options
       */
    },
  
    // ==============================================
    // FILE INCLUSION
    // ==============================================
    "include": ["vite.config.ts"] // Only processes the Vite configuration file
  
    /*
     * Important Notes:
     * 1. This is an extremely minimal configuration designed specifically
     *    for type-checking the Vite config file only.
     * 2. For a complete application, you would typically include:
     *    - "src/**/*" for all source files
     *    - "tests/**/*" for test files
     *    - Additional configuration files
     * 3. Consider adding these common options:
     *    - "jsx": "react-jsx" (if using React)
     *    - "baseUrl": "." with path aliases
     *    - "types": ["vite/client"] for Vite environment types
     */
  }