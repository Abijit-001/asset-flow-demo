import hotToast from 'react-hot-toast'

/**
 * Thin wrapper over react-hot-toast, which is already configured in
 * app/Providers.tsx. It exists to keep the vocabulary small: success and error
 * only. Anything richer (custom JSX, promise toasts) should be a deliberate
 * addition, not a habit picked up from the underlying library's full surface.
 */
export const toast = {
  success: (message: string) => hotToast.success(message),
  error: (message: string) => hotToast.error(message),
}
