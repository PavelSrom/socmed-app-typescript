import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import PrivateRoute from './hoc/PrivateRoute'
import { autoLoginUser } from './store/actions/auth'
import { useDispatch } from 'react-redux'
import AlertBox from './components/AlertBox'

import Home from './routes/Home'
import Register from './routes/Register'
import Login from './routes/Login'
import MyProfile from './routes/MyProfile'
import Posts from './routes/Posts'

const App: React.FC = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    if (localStorage.authToken) dispatch(autoLoginUser())
    // eslint-disable-next-line
  }, [])

  return (
    <Router>
      <AlertBox />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/me" component={MyProfile} />
        <PrivateRoute exact path="/posts" component={Posts} />

        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </Router>
  )
}
export default App
