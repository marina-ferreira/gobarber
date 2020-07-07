import { useContext } from 'react'

import { ToastContext } from 'contexts/ToastContext'

const useToast = () => {
  const context = useContext(ToastContext)
  const errorMessage = 'useToast must be used within a ToastProvider'

  if (!context) throw new Error(errorMessage)

  return context
}

export default useToast
