import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { FiAlertCircle, FiXCircle, FiCheckCircle, FiInfo } from 'react-icons/fi'

import { useToast } from 'contexts/ToastContext'

import { Content } from './styles'

const icons = {
  info: <FiInfo size={20} />,
  success: <FiCheckCircle size={20} />,
  error: <FiAlertCircle size={20} />
}

const ToastContent = ({
  message: { id, type = 'info', title, description },
  style
}) => {
  const { hideToast } = useToast()

  useEffect(() => {
    const timer = setTimeout(() => hideToast(id), 3000)

    return () => clearTimeout(timer)
  }, [id, hideToast])

  return (
    <Content type={type} hasDescription={!!description} style={style}>
      {icons[type]}

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
  message: PropTypes.objectOf(PropTypes.string).isRequired,
  style: PropTypes.objectOf(PropTypes.any)
}

ToastContent.defaultProps = {
  style: {}
}
