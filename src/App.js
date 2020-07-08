import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import AppProvider from 'providers'
import Routes from 'routes'

import GlobalStyles from 'styles/global'

const App = () => {
  return (
    <Router>
      <AppProvider>
        <Routes />
      </AppProvider>

      <GlobalStyles />
    </Router>
  )
}

export default App
