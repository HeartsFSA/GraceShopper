import React, {useState} from 'react';
import {useStateValue} from '../StateProvider';
import axios from 'axios';
import {
  login,
  register,
  getShoppingCart,
  getOrderHistory,
  checkUser,
  validateEmail
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
  const [displayname, setDisplayname] = useState('');
  const [showEmail, setShowEmail] = useState(false);
  const [showDisplayname, setShowDisplayname] = useState(false);

  async function onLogin(evt) {
    // alert('onLogin clicked');
    evt.preventDefault();
    if (!username || !password) {
      return alert('Please enter a username and password'); // need to fill out username and password
    }
    try {
      const data = await login(username, password);

      if (data.user) {
        await setUsername('');
        await setPassword('');
        await setUser(data.user);
        setCart(await getShoppingCart());
        setOrders(await getOrderHistory());

        // console.log(type);

        setLoginModalVisible(false);

        // ? setLoginModalVisible(false);
        // : setRegisterModalVisible(false);
        console.log(data.user);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function onRegister(evt) {
    // console.log('on register was clicked');
    evt.preventDefault();
    if (!username || !password || !email) {
      return alert('Please enter reg details'); // need to fill out username and password
    }
    if (!validateEmail(email)) {
      return alert('Please enter proper email');
    }
    if (!displayname) displayname = username;
    try {
      let data = await register(username, password, email, displayname);
      console.log(data);

      if (data.user) {
        await setUsername('');
        await setPassword('');
        await setUser(data.user);

        // ** Set Cart needs to be updated to fetch it from local or state variable ** //
        // setCart(await getShoppingCart());
        // setOrders(await getOrderHistory());

        // console.log(type);

        setLoginModalVisible(false);

        // ? setLoginModalVisible(false);
        // : setRegisterModalVisible(false);
        console.log(data.user);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // async function handleSubmit(evt) {
  //   evt.preventDefault();

  //   if (!username || !password) {
  //     return alert('Please enter details'); // need to fill out username and password
  //   } else {
  //     try {
  //       let data = await checkUser(username);
  //       console.log(data);

  //       if (data.status === 409) {
  //         data = await login(username, password);
  //       }

  //       if (data.user) {
  //         await setUsername('');
  //         await setPassword('');
  //         await setUser(data.user);
  //         setCart(await getShoppingCart());
  //         setOrders(await getOrderHistory());

  //         console.log(data.user);
  //         // console.log(type);

  //         type === 'login'
  //           ? setLoginModalVisible(false)
  //           : setRegisterModalVisible(false);
  //         // ? setLoginModalVisible(false);
  //         // : setRegisterModalVisible(false);
  //       }
  //       console.log(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // }

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
      {showEmail ? (
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
      ) : (
        <></>
      )}
      {showDisplayname ? (
        <div>
          <label htmlFor="displayname"></label>
          <input
            id="displayname"
            value={displayname}
            type="text"
            placeholder="Enter Display Name"
            onChange={(evt) => setDisplayname(evt.target.value)}
          />{' '}
        </div>
      ) : (
        <></>
      )}
      <div id="login_register">
        {' '}
        <button
          onClick={(evt) => {
            onLogin(evt);
          }}
        >
          Login
        </button>
        {showEmail ? (
          <button
            onClick={(evt) => {
              onRegister(evt);
              setShowEmail(!showEmail);
              setShowDisplayname(!showDisplayname);
            }}
          >
            Register
          </button>
        ) : (
          <button
            onClick={(evt) => {
              evt.preventDefault();
              setShowEmail(!showEmail);
              setShowDisplayname(!showDisplayname);
            }}
          >
            Register
          </button>
        )}
      </div>
      <div id="login_register"></div>
    </form>
  );
}

export default AuthForm;
