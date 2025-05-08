// force Git to track this file
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * UTILITY: cn (className merger)
 * DESCRIPTION: A utility function that combines clsx and twMerge for optimal 
 * className string handling in React with Tailwind CSS
 * 
 * FEATURES:
 * - Merges multiple class name inputs (strings, arrays, objects)
 * - Resolves conditional class names (using clsx)
 * - Optimizes Tailwind CSS classes (using twMerge)
 * - Prevents class conflicts and ensures proper specificity
 * 
 * @param inputs - Variadic array of ClassValue items (string, array, object)
 * @returns Optimized, merged className string ready for React components
 * 
 * @example
 * // Basic usage
 * cn('text-red-500', 'bg-blue-200') → 'text-red-500 bg-blue-200'
 * 
 * // Conditional classes
 * cn('base-class', { 'active-class': isActive }) → 'base-class' or 'base-class active-class'
 * 
 * // Tailwind optimization
 * cn('p-2 p-4') → 'p-4' (automatically resolves conflicts)
 */
export function cn(...inputs: ClassValue[]) {
  // 1. First use clsx to merge all class inputs (handles conditionals/arrays/objects)
  // 2. Then use twMerge to optimize Tailwind classes (resolves conflicts)
  return twMerge(clsx(inputs))
}