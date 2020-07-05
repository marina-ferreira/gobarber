import React from 'react'
import PropTypes from 'prop-types'
import { FiAlertCircle, FiXCircle } from 'react-icons/fi'

import { useToast } from 'contexts/ToastContext'

import { Content } from './styles'

const ToastContent = ({ id, type, title, description }) => {
  const { hideToast } = useToast()

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
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string
}

ToastContent.defaultProps = {
  type: 'info',
  description: null
}
