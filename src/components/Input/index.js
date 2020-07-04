import React from 'react'
import PropTypes from 'prop-types'

import { Container } from './styles'

const Input = ({ icon: Icon, ...props }) => {
  return (
    <Container>
      {Icon && <Icon size={20} />}
      <input type="text" {...props} />
    </Container>
  )
}

export default Input

Input.propTypes = {
  icon: PropTypes.elementType
}

Input.defaultProps = {
  icon: null
}
