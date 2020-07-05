import React from 'react'
import PropTypes from 'prop-types'
import { FiAlertCircle, FiXCircle } from 'react-icons/fi'

import { Container, Content } from './styles'

const Toast = ({ children, ...rest }) => {
  return (
    <Container>
      <Content>
        <FiAlertCircle size={20} />

        <div>
          <strong>An error ocurred</strong>
          <p>Request failed</p>
        </div>

        <button type="button">
          <FiXCircle size={18} />
        </button>
      </Content>
    </Container>
  )
}

export default Toast

Toast.propTypes = {
  children: PropTypes.element.isRequired
}
