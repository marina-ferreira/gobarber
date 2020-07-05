import React, { createContext, useCallback } from 'react'
import PropTypes from 'prop-types'

import api from 'services/api'

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('/sessions', { email, password })
    console.log('sign in', response.data)
  }, [])

  return (
    <AuthContext.Provider value={{ name: 'Marina', signIn }}>
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired
}
