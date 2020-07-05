import React, { createContext, useCallback, useState, useContext } from 'react'
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

  const hideToast = useCallback(id => {
    setMessages(state => state.filter(message => message.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      <Toast messages={messages} />
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context = useContext(ToastContext)
  const errorMessage = 'useToast must be used within a ToastProvider'

  if (!context) throw new Error(errorMessage)

  return context
}

ToastProvider.propTypes = {
  children: PropTypes.element.isRequired
}
