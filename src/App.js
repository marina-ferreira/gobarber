import React from 'react'
import GlobalStyles from 'styles/global'

import { AuthProvider } from 'contexts/AuthContext'

import SignIn from 'pages/SignIn'
import SignUp from 'pages/SignUp'

const App = () => {
  return (
    <>
      <AuthProvider>
        <SignIn />
      </AuthProvider>
      <GlobalStyles />
    </>
  )
}

export default App
