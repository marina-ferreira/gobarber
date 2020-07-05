import React from 'react'
import GlobalStyles from 'styles/global'

import { AuthProvider } from 'contexts/AuthContext'

import SignIn from 'pages/SignIn'
import Toast from 'components/Toast'
// import SignUp from 'pages/SignUp'

const App = () => {
  return (
    <>
      <AuthProvider>
        <SignIn />
      </AuthProvider>

      <Toast />

      <GlobalStyles />
    </>
  )
}

export default App
