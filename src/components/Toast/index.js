import React from 'react'
import PropTypes from 'prop-types'
import { useTransition } from 'react-spring'

import ToastContent from './ToastContent'

import { Container } from './styles'

const Toast = ({ messages }) => {
  const messagesWithTransitions = useTransition(
    messages,
    message => message.id,
    {
      from: { right: '-120%', opacity: 0 },
      enter: { right: '0%', opacity: 1 },
      leave: { right: '-120%', opacity: 0 }
    }
  )

  return (
    <Container>
      {messagesWithTransitions.map(({ key, item, props }) => (
        <ToastContent key={key} message={item} style={props} />
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
