import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import Home from './components/Home'
import AuthForm from './components/AuthForm'
import Landing from './components/Landing'

function Routes(props) {
  const { user, setUser, products } = props
  return (
    <Switch>
      <Route
        path='/login'
        render={(props) => (
          <AuthForm type='login' {...props} setUser={setUser} />
        )}
      />
      <Route
        path='/signup'
        render={(props) => (
          <AuthForm type='register' {...props} setUser={setUser} />
        )}
      />
      <Route 
        path='/home'
        render={(props) => (
          <Home {...props} products={products} />
        )} />

      <Route path='/' component={Landing} />
    </Switch>
  )
}

export default withRouter(Routes)
