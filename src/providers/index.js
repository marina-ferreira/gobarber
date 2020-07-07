import React from 'react'
import PropTypes from 'prop-types'

import ToastProvider from './ToastProvider'
import AuthProvider from './AuthProvider'

const AppProvider = ({ children }) => (
  <AuthProvider>
    <ToastProvider>{children}</ToastProvider>
  </AuthProvider>
)

export default AppProvider

AppProvider.propTypes = {
  children: PropTypes.element.isRequired
}
