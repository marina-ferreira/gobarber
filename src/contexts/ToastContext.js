import React, { createContext, useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { uuid } from 'uuidv4'

import Toast from 'components/Toast'

export const ToastContext = createContext({})

export const ToastProvider = ({ children }) => {
  const [messages, setMessages] = useState([])

  const showToast = useCallback(({ type, title, description }) => {
    const id = uuid()
    const toast = {
      id,
      type,
      title,
      description
    }

    setMessages(prevMessages => [...prevMessages, toast])
  }, [])

  const hideToast = useCallback(() => {}, [])

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      <Toast messages={messages} />
    </ToastContext.Provider>
  )
}

ToastProvider.propTypes = {
  children: PropTypes.element.isRequired
}
