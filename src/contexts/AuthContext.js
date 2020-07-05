import React, { createContext, useCallback, useState } from 'react'
import PropTypes from 'prop-types'

import api from 'services/api'

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(() => {
    const token = localStorage.getItem('@GoBarber:token')
    const user = JSON.parse(localStorage.getItem('@GoBarber:user'))

    return token && user ? { token, user } : {}
  })

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('/sessions', { email, password })
    const { token, user } = response.data

    localStorage.setItem('@GoBarber:token', token)
    localStorage.setItem('@GoBarber:user', JSON.stringify(user))

    setAuthData({ token, user })
  }, [])

  return (
    <AuthContext.Provider value={{ user: authData.user, signIn }}>
      {children}
      {console.log(authData)}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired
}
