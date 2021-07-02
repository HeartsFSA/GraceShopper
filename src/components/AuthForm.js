import React, { useState } from 'react'
import axios from 'axios'
import { login, register } from '../utils'

import './css/AuthForm.css'

function AuthForm(props) {
  let { type, setUser } = props // type of auth form (login or signup) and isLoggedIn Function
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(evt) {
    evt.preventDefault()

    if (!username || !password) {
      return // need to fill out username and password
    } else {
      try {
        let data =
          type === 'login'
            ? await login(username, password)
            : await register(username, password)
        if (data.user) {
          await setUsername('')
          await setPassword('')
          await setUser(data.user)
        }
        // console.log(data)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <form className='auth-form' onSubmit={handleSubmit}>
      <div>
        <label htmlFor='username'>Username:</label>
        <input
          id='username'
          value={username}
          type='text'
          placeholder='Type your username'
          onChange={(evt) => setUsername(evt.target.value)}
        />
      </div>
      <div>
        <label htmlFor='password'>Password:</label>
        <input
          id='password'
          value={password}
          type='text'
          placeholder='Type your password'
          onChange={(evt) => setPassword(evt.target.value)}
        />
      </div>
      <button type='submit'>{type === 'login' ? 'Login' : 'Register'}</button>
    </form>
  )
}

export default AuthForm
