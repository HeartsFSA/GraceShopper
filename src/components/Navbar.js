import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import AuthForm from './AuthForm'

function Navbar({ user, setUser }) {
  function handleLogout() {
    localStorage.removeItem('token')
    setUser({})
    history.push('/')
  }

  return (
    <div>
      <h1>App Template</h1>
      <nav>
        {user.id ? (
          <div>
            <NavLink to='/Home'>Home</NavLink>
            {
              <a href='#' onClick={handleLogout}>
                Log Out
              </a>
            }
          </div>
        ) : (
          <div>
            <div id='login'  > Login / Register </div>
            <AuthForm user={user} setUser={setUser}/>
          </div>
        )}
      </nav>
    </div>
  )
}

export default withRouter(Navbar)
