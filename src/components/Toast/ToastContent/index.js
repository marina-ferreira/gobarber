import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { FiAlertCircle, FiXCircle } from 'react-icons/fi'

import { useToast } from 'contexts/ToastContext'

import { Content } from './styles'

const ToastContent = ({
  message: { id, type = 'info', title, description }
}) => {
  const { hideToast } = useToast()

  useEffect(() => {
    const timer = setTimeout(() => hideToast(id), 3000)

    return () => clearTimeout(timer)
  }, [id, hideToast])

  return (
    <Content type={type} hasDescription={!!description}>
      <FiAlertCircle size={20} />
      <div>
        <strong>{title}</strong>
        <p>{description}</p>
      </div>

      <button type="button" onClick={() => hideToast(id)}>
        <FiXCircle size={18} />
      </button>
    </Content>
  )
}

export default ToastContent

ToastContent.propTypes = {
  message: PropTypes.objectOf(PropTypes.string).isRequired
}
