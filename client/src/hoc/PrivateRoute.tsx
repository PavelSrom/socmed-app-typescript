import React from 'react'
import { Route, Redirect, RouteComponentProps } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AppState } from '../store'
import WithLayout from './WithLayout'

interface Props {
  exact: boolean
  path: string
  component: React.ComponentType<RouteComponentProps>
}

const PrivateRoute: React.FC<Props> = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector((state: AppState) => state.auth.isAuthenticated)

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <WithLayout>
            <Component {...props} />
          </WithLayout>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  )
}

export default PrivateRoute
