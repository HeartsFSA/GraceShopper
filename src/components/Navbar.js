import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'

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
            <div id='login' user={user} setUser={setUser}>Login / Register </div>
          </div>
        )}
      </nav>
    </div>
  )
}

export default withRouter(Navbar)
