import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'

import api from 'services/api'

import { AuthContext } from 'contexts'

const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(() => {
    const token = localStorage.getItem('@GoBarber:token')
    const user = JSON.parse(localStorage.getItem('@GoBarber:user'))

    if (!token || !user) return {}

    api.defaults.headers.authorization = `Bearer ${token}`
    return { token, user }
  })

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('/sessions', { email, password })
    const { token, user } = response.data

    localStorage.setItem('@GoBarber:token', token)
    localStorage.setItem('@GoBarber:user', JSON.stringify(user))

    api.defaults.headers.authorization = `Bearer ${token}`

    setAuthData({ token, user })
  }, [])

  const signOut = useCallback(() => {
    localStorage.removeItem('@GoBarber:token')
    localStorage.removeItem('@GoBarber:user')

    setAuthData({})
  }, [])

  const updateUser = useCallback(
    user => {
      localStorage.setItem('@GoBarber:user', JSON.stringify(user))

      setAuthData({ token: authData.token, user })
    },
    [authData.token]
  )

  return (
    <AuthContext.Provider
      value={{ user: authData.user, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired
}
