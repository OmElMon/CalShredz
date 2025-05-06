/**
 * React Application Entry Point
 * 
 * This file serves as the main entry point for your fitness app React application.
 * It initializes the React application by creating a root container and rendering
 * the main App component into the DOM.
 */

// Import necessary dependencies
import { createRoot } from 'react-dom/client' // Modern React 18+ API for rendering
import App from './App.tsx'                   // The main App component for your fitness application
import './index.css'                          // Global CSS styles for the application

/**
 * Application Initialization
 * 
 * This code does the following:
 * 1. Finds the DOM element with id="root" (defined in your HTML file)
 * 2. Creates a React root container using that element
 * 3. Renders your main App component inside this container
 * 
 * The "!" is a TypeScript non-null assertion operator that tells TypeScript
 * that getElementById will not return null (you're confident the element exists).
 */
createRoot(document.getElementById("root")!).render(<App />);

/**
 * Notes:
 * - This uses the modern React 18+ createRoot API instead of the legacy ReactDOM.render
 * - The application's component tree starts from the <App /> component
 * - Global styles are imported from index.css and will be applied to the entire app
 * - This approach creates a concurrent rendering root, enabling React 18+ concurrent features
 */