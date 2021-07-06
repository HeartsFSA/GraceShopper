<<<<<<< HEAD
import React, {useState} from 'react';
import {useStateValue} from '../StateProvider';
import axios from 'axios';
import {login, register, getShoppingCart, getOrderHistory} from '../utils';

import './css/AuthForm.css';

function AuthForm(props) {
  let {type, setUser, setCart, setOrders} = props; // type of auth form (login or signup) and isLoggedIn Function
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
=======
import React, { useState } from "react";
import axios from "axios";
import { login, register } from "../utils";

import "./css/AuthForm.css";

function AuthForm(props) {
  let { type, setUser, setLoginModalVisible, setRegisterModalVisible } = props; // type of auth form (login or signup) and isLoggedIn Function

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
>>>>>>> 0aa9e9ab7e027953df8684465fdbd28248ae7d14

  async function handleSubmit(evt) {
    evt.preventDefault();

    if (!username || !password) {
<<<<<<< HEAD
      return; // need to fill out username and password
=======
      return alert("Please enter details"); // need to fill out username and password
>>>>>>> 0aa9e9ab7e027953df8684465fdbd28248ae7d14
    } else {
      try {
        let data =
          type === "login"
            ? await login(username, password)
            : await register(username, password);
        if (data.user) {
<<<<<<< HEAD
          await setUsername('');
          await setPassword('');
          await setUser(data.user);
          setCart(await getShoppingCart());
          setOrders(await getOrderHistory());
=======
          await setUsername("");
          await setPassword("");
          await setUser(data.user);

          console.log(data.user);
          // console.log(type);

          type === "login"
            ? setLoginModalVisible(false)
            : setRegisterModalVisible(false);
          // ? setLoginModalVisible(false);
          // : setRegisterModalVisible(false);
>>>>>>> 0aa9e9ab7e027953df8684465fdbd28248ae7d14
        }
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          value={username}
          type="text"
          placeholder="Type your username"
          onChange={(evt) => setUsername(evt.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          value={password}
          type="text"
          placeholder="Type your password"
          onChange={(evt) => setPassword(evt.target.value)}
        />
      </div>
      <button type="submit">{type === 'login' ? 'Login' : 'Register'}</button>
    </form>
  );
}

export default AuthForm;
