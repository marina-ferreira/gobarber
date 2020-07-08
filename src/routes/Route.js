import React from 'react'
import PropTypes from 'prop-types'
import { Route as ReactDomRoute, Redirect } from 'react-router-dom'

import { useAuth } from 'hooks'

const Route = ({ isPrivate = false, component: Component, ...rest }) => {
  const { user } = useAuth()

  return (
    <ReactDomRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/dashboard',
              state: { from: location }
            }}
          />
        )
      }}
    />
  )
}

export default Route

Route.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.elementType.isRequired
}

Route.defaultProps = {
  isPrivate: false
}
