import React, {useState} from 'react';
import {useStateValue} from '../StateProvider';
import axios from 'axios';
import {
  login,
  register,
  getShoppingCart,
  getOrderHistory,
  checkUser,
  validateEmail,
  regSeller
} from '../utils';

import './css/AuthForm.css';

function AuthForm(props) {
  const {
    type,
    setUser,
    setCart,
    setOrders,
    setLoginModalVisible,
    setRegisterModalVisible,
    user,
    messenger
  } = props; // type of auth form (login or signup) and isLoggedIn Function

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [displayname, setDisplayname] = useState('');
  const [showEmail, setShowEmail] = useState(false);

  const [authFormMessage, setAuthFormMessage] = useState('');

  const [showDisplayname, setShowDisplayname] = useState(false);

  async function onLogin(evt) {
    // alert('onLogin clicked');
    evt.preventDefault();

    if (!username) {
      messenger('Please enter username to login');
      // setAuthFormMessage('Please enter username to login');
      return;
    }
    if (!password) {
      messenger('we are missing the magic word... ');
      // setAuthFormMessage('Please enter password to continue');
      return;
    }

    try {
      const data = await login(username, password);
      console.log('auth form 39 data.user', data.user);

      if (data.error) {
        messenger(data.error.message);
        setPassword('');
      }

      if (data.user) {
        await setUsername('');
        await setPassword('');
        await setUser(data.user);
        // setCart(await getShoppingCart());
        // setOrders(await getOrderHistory());

        /* SET CART AND SET ORDER NEEDS TO BE ACTIVARED */

        // console.log(type);
        setAuthFormMessage(data.user.message);

        setLoginModalVisible(false);
        // messenger('NamohArihantanam');
        const txt = 'Hi, ' + data.user.username;
        messenger(txt);

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
    if (!username) {
      messenger(
        'we are excited to have you here... but will still need name...'
      );
      return;
    }

    if (!password) {
      messenger('ssshhhhh.... please enter a password....');
      return;
    }

    if (password.length < 8) {
      messenger('password needs to be 8 charecters for your security...');
      setPassword('');
      return;
    }

    if (!validateEmail(email)) {
      messenger("that email doesn't feel right... can you please check...");
      return;
    }
    if (!displayname) {
      displayname = username;
    }
    try {
      let data = await register(username, password, email, displayname);
      console.log(data);

      if (data.error) {
        setUsername('');
        setPassword('');
        setEmail('');
        setDisplayname('');
        messenger('that didnt go right, please try again...');
        if (data.error.constraint === 'users_email_key') {
          messenger(
            'that email is already taken, please choose a different email...'
          );

          return;
        }
      }

      if (data.user) {
        setUsername('');
        setPassword('');
        let txt = 'Hi, ' + displayname;
        messenger(txt);
        await setUser(data.user);

        // ** Set Cart needs to be updated to fetch it from local or state variable ** //
        // setCart(await getShoppingCart());
        // setOrders(await getOrderHistory());

        setLoginModalVisible(false);
        console.log(data.user);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function onSeller(evt) {
    // console.log('on register was clicked');
    evt.preventDefault();
    if (!username) {
      messenger(
        'we are excited to have you here... but will still need name...'
      );
      return;
    }

    if (!password) {
      messenger('ssshhhhh.... please enter a password....');
      return;
    }

    if (password.length < 8) {
      messenger('password needs to be 8 charecters for your security...');
      setPassword('');
      return;
    }

    if (!validateEmail(email)) {
      messenger("that email doesn't feel right... can you please check...");
      return;
    }
    try {
      let data = await regSeller(username, password, email);
      console.log(data);

      if (data.error) {
        setUsername('');
        setPassword('');
        setEmail('');
        messenger('that didnt go right, please try again...');
        if (data.error.constraint === 'users_email_key') {
          messenger(
            'that email is already taken, please choose a different email...'
          );

          return;
        }
      }

      if (data.user) {
        setUsername('');
        setPassword('');
        let txt = 'Hi, ' + data.user.username;
        messenger(txt);
        await setUser(data.user);

        // ** Set Cart needs to be updated to fetch it from local or state variable ** //
        // setCart(await getShoppingCart());
        // setOrders(await getOrderHistory());

        setLoginModalVisible(false);
        console.log(data.user);
      }
    } catch (error) {
      console.log(error);
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
          <>
            <button
              id="register_reg"
              onClick={(evt) => {
                onRegister(evt);
                // setShowEmail(!showEmail);
              }}
            >
              Register
            </button>
            <button
              id="seller"
              onClick={(evt) => {
                evt.preventDefault();
                onSeller(evt);
              }}
            >
              Seller
            </button>

            {/* <button
              onClick={(evt) => {
                onRegister(evt);
                setShowEmail(!showEmail);
                setShowDisplayname(!showDisplayname);
              }}
            >
              Register
            </button> */}
          </>
        ) : (
          <button
            id="register_show"
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
      {authFormMessage ? (
        <div id="authFormMessage">{authFormMessage}</div>
      ) : (
        <></>
      )}
    </form>
  );
}

export default AuthForm;
