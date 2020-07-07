import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { uuid } from 'uuidv4'

import { ToastContext } from 'contexts'
import Toast from 'components/Toast'

const ToastProvider = ({ children }) => {
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

export default ToastProvider

ToastProvider.propTypes = {
  children: PropTypes.element.isRequired
}
