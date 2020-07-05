import React from 'react'
import PropTypes from 'prop-types'

import { Container } from './styles'

const Button = ({ children, title, className = '' }) => {
  return (
    <Container className={className}>
      {children}
      <span>{title}</span>
    </Container>
  )
}

export default Button

Button.propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired
}
