import React from 'react'
import PropTypes from 'prop-types'

import { AuthProvider } from './AuthContext'
import { ToastProvider } from './ToastContext'

const AppProvider = ({ children }) => (
  <AuthProvider>
    <ToastProvider>{children}</ToastProvider>
  </AuthProvider>
)

export default AppProvider

AppProvider.propTypes = {
  children: PropTypes.element.isRequired
}
