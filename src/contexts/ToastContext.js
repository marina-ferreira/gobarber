import React, { createContext, useCallback } from 'react'
import PropTypes from 'prop-types'
import Toast from 'components/Toast'

export const ToastContext = createContext({})

export const ToastProvider = ({ children }) => {
  const showToast = useCallback(() => {
    console.log('lets show the toast')
  }, [])
  const hideToast = useCallback(() => {}, [])

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      <Toast />
    </ToastContext.Provider>
  )
}

ToastProvider.propTypes = {
  children: PropTypes.element.isRequired
}
