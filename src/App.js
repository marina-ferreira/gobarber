import React from 'react'
import GlobalStyles from 'styles/global'

import AppProvider from 'contexts'

import SignIn from 'pages/SignIn'
// import SignUp from 'pages/SignUp'

const App = () => {
  return (
    <>
      <AppProvider>
        <SignIn />
      </AppProvider>

      <GlobalStyles />
    </>
  )
}

export default App
