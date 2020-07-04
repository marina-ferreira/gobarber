import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { useField } from '@unform/core'

import { Container } from './styles'

const Input = ({ name, icon: Icon, ...props }) => {
  const inputRef = useRef(null)
  const { fieldName, defaultValue, error, registerField } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value'
    })
  }, [fieldName, registerField])

  return (
    <Container>
      {Icon && <Icon size={20} />}
      <input
        type="text"
        ref={inputRef}
        defaultValue={defaultValue}
        {...props}
      />
    </Container>
  )
}

export default Input

Input.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.elementType
}

Input.defaultProps = {
  icon: null
}
