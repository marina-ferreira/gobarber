import React, { useEffect, useRef, useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useField } from '@unform/core'
import { FiAlertCircle } from 'react-icons/fi'

import { appColors } from 'styles/global'
import { Container, Error } from './styles'

const { text } = appColors

const Input = ({ name, icon: Icon, containerStyle, ...props }) => {
  const inputRef = useRef(null)
  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)
  const { fieldName, defaultValue, error, registerField } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value'
    })
  }, [fieldName, registerField])

  const handleInputFocus = useCallback(() => setIsFocused(true), [])

  const handleInputBlur = useCallback(() => {
    setIsFocused(false)
    setIsFilled(!!inputRef.current?.value)
  }, [])

  return (
    <Container
      isFilled={isFilled}
      isFocused={isFocused}
      isErrored={!!error}
      style={containerStyle}
    >
      {Icon && <Icon size={20} />}

      <input
        type="text"
        ref={inputRef}
        defaultValue={defaultValue}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        autoComplete="on"
        {...props}
      />

      {error && (
        <Error title={error}>
          <FiAlertCircle color={text.error} size={20} />
        </Error>
      )}
    </Container>
  )
}

export default Input

Input.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.elementType,
  containerStyle: PropTypes.shape({
    [PropTypes.string]: PropTypes.string || PropTypes.number
  })
}

Input.defaultProps = {
  icon: null,
  containerStyle: {}
}
