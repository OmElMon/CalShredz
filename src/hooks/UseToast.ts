import * as React from "react"
import type { ToastActionElement, ToastProps } from "@/components/ui/Toast"

/**
 * CONSTANTS
 * TOAST_LIMIT: Maximum number of toasts to display at once
 * TOAST_REMOVE_DELAY: Delay before removing a dismissed toast (in ms)
 */
const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

/**
 * TYPE: ToasterToast
 * Extends basic ToastProps with additional toast-specific properties
 */
type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

/**
 * ACTION TYPES
 * Defines all possible actions that can be dispatched to the toast reducer
 */
const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

// Counter for generating unique toast IDs
let count = 0

/**
 * Generates a unique ID for each toast
 * Uses a simple counter with modulo to prevent overflow
 */
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

// Type helpers for actions
type ActionType = typeof actionTypes
type Action =
  | { type: ActionType["ADD_TOAST"]; toast: ToasterToast }
  | { type: ActionType["UPDATE_TOAST"]; toast: Partial<ToasterToast> }
  | { type: ActionType["DISMISS_TOAST"]; toastId?: ToasterToast["id"] }
  | { type: ActionType["REMOVE_TOAST"]; toastId?: ToasterToast["id"] }

/**
 * STATE INTERFACE
 * Contains the array of currently displayed toasts
 */
interface State {
  toasts: ToasterToast[]
}

// Map to track timeout IDs for automatic toast removal
const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

/**
 * Adds a toast to the removal queue
 * @param toastId - ID of the toast to be removed
 */
const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) return

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

/**
 * REDUCER FUNCTION
 * Handles state updates based on dispatched actions
 * @param state - Current toast state
 * @param action - Action to process
 * @returns New state
 */
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        // Add new toast and enforce limit
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case "UPDATE_TOAST":
      return {
        ...state,
        // Update specific toast by ID
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action

      // Add toasts to removal queue
      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        // Dismiss all toasts if no ID provided
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        // Mark toasts as closed
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? { ...t, open: false }
            : t
        ),
      }
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return { ...state, toasts: [] } // Remove all toasts
      }
      return {
        ...state,
        // Remove specific toast by ID
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

// Array of state listeners
const listeners: Array<(state: State) => void> = []

// In-memory state store
let memoryState: State = { toasts: [] }

/**
 * Dispatches an action to update state and notify listeners
 * @param action - Action to dispatch
 */
function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

// Helper type for toast creation (without ID)
type Toast = Omit<ToasterToast, "id">

/**
 * Creates and displays a new toast
 * @param props - Toast configuration
 * @returns Toast control methods
 */
function toast({ ...props }: Toast) {
  const id = genId()

  // Returns methods to update or dismiss the toast
  const update = (props: ToasterToast) =>
    dispatch({ type: "UPDATE_TOAST", toast: { ...props, id } })
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

  // Dispatch ADD_TOAST action
  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  return {
    id,
    dismiss,
    update,
  }
}

/**
 * HOOK: useToast
 * Provides access to toast state and methods
 * @returns Current toast state and control methods
 */
function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    // Register listener
    listeners.push(setState)
    return () => {
      // Clean up listener
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  }
}

export { useToast, toast }