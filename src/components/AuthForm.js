import React, {useState} from 'react';
import {useStateValue} from '../StateProvider';
import axios from 'axios';
import {
  login,
  register,
  getShoppingCart,
  getOrderHistory,
  checkUser
} from '../utils';

import './css/AuthForm.css';

function AuthForm(props) {
  let {
    type,
    setUser,
    setCart,
    setOrders,
    setLoginModalVisible,
    setRegisterModalVisible,
    user
  } = props; // type of auth form (login or signup) and isLoggedIn Function

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  async function onLogin(evt) {
    evt.preventDefault();
    if (!username || !password) {
      return alert('Please enter details'); // need to fill out username and password
    }
  }

  async function handleSubmit(evt) {
    evt.preventDefault();

    if (!username || !password) {
      return alert('Please enter details'); // need to fill out username and password
    } else {
      try {
        let data = await checkUser(username);
        console.log(data);

        if (data.status === 409) {
          data = await login(username, password);
        }

        if (data.user) {
          await setUsername('');
          await setPassword('');
          await setUser(data.user);
          setCart(await getShoppingCart());
          setOrders(await getOrderHistory());

          console.log(data.user);
          // console.log(type);

          type === 'login'
            ? setLoginModalVisible(false)
            : setRegisterModalVisible(false);
          // ? setLoginModalVisible(false);
          // : setRegisterModalVisible(false);
        }
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <form className="auth-form">
      <div>
        <label htmlFor="username"></label>
        <input
          id="username"
          value={username}
          type="text"
          placeholder="Enter Username"
          onChange={(evt) => setUsername(evt.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password"></label>
        <input
          id="password"
          value={password}
          type="password"
          placeholder="Enter Password"
          onChange={(evt) => setPassword(evt.target.value)}
        />
      </div>{' '}
      <div>
        <label htmlFor="email"></label>
        <input
          id="email"
          value={email}
          type="email"
          placeholder="Enter Email"
          onChange={(evt) => setEmail(evt.target.value)}
        />{' '}
      </div>
      <div id="login_register">
        {' '}
        <button>Login</button>
        <button>Register</button>
      </div>
    </form>
  );
}

export default AuthForm;
