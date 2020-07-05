import React from 'react'
import PropTypes from 'prop-types'

import ToastContent from './ToastContent'

import { Container } from './styles'

const Toast = ({ messages }) => {
  return (
    <Container>
      {messages.map(message => (
        <ToastContent key={message.id} message={message} />
      ))}
    </Container>
  )
}

export default Toast

Toast.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      type: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string
    })
  ).isRequired
}
