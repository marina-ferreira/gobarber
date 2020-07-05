import React from 'react'
import PropTypes from 'prop-types'

import { StyledButton } from './styles'

const Button = ({ children, ...rest }) => {
  return (
    <StyledButton type="button" {...rest}>
      {children}
    </StyledButton>
  )
}

export default Button

Button.propTypes = {
  children: PropTypes.element.isRequired
}
