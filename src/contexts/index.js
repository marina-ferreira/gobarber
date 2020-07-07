import React from 'react'
import PropTypes from 'prop-types'

import ToastProvider from 'providers/ToastProvider'
import { AuthProvider } from './AuthContext'

const AppProvider = ({ children }) => (
  <AuthProvider>
    <ToastProvider>{children}</ToastProvider>
  </AuthProvider>
)

export default AppProvider

AppProvider.propTypes = {
  children: PropTypes.element.isRequired
}
