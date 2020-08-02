import React from 'react'
import PropTypes from 'prop-types'

import { StyledButton } from './styles'

const Button = ({ children, loading, ...rest }) => {
  return (
    <StyledButton type="button" {...rest}>
      {loading ? 'Sending...' : children}
    </StyledButton>
  )
}

export default Button

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
    .isRequired,
  loading: PropTypes.bool
}

Button.defaultProps = {
  loading: false
}
