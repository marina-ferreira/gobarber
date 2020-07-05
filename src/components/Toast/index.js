import React from 'react'
import PropTypes from 'prop-types'
import { FiAlertCircle, FiXCircle } from 'react-icons/fi'

import { useToast } from 'contexts/ToastContext'

import { Container, Content } from './styles'

const Toast = ({ messages }) => {
  const { hideToast } = useToast()

  return (
    <Container>
      {messages.map(({ type = 'info', title, description, id }) => (
        <Content key={id} type={type} hasDescription={!!description}>
          <FiAlertCircle size={20} />

          <div>
            <strong>{title}</strong>
            <p>{description}</p>
          </div>

          <button type="button" onClick={() => hideToast(id)}>
            <FiXCircle size={18} />
          </button>
        </Content>
      ))}
    </Container>
  )
}

export default Toast

Toast.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      title: PropTypes.string.isRequired,
      description: PropTypes.string
    })
  ).isRequired
}
