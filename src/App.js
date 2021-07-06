<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import "./components/css/App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";

import Routes from "./Routes";
import { checkLogin, getAllProducts, getShoppingCart } from "./utils";
=======
import React, { useState, useEffect } from 'react';
import './components/css/App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Cart from './components/Cart';

import Routes from './Routes';
import { checkLogin, getAllProducts, getShoppingCart } from './utils';
>>>>>>> 845f163f2bcff5c29cb712d689529c39f165df95

function App() {
  const [user, setUser] = useState({});
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);

  // used for a loading page.
  // This displays while the async functions are still loading.
  const [hasLoaded, setHasLoaded] = useState(false);

  // initializes products and login status.
  useEffect(async () => {
    const setAllProducts = async () => {
      let prods = await getAllProducts();
      setProducts(prods);
<<<<<<< HEAD
      console.log("from the useEffec in app.js:\n", prods);
    };

    // invocation
    await setAllProducts();
    console.log("Products from app.js:\n", products);

    const setLogIn = async () => {
      let checkedUser = await checkLogin();
=======
    };
    // invocation
    await setAllProducts();

    const setLogIn = async () => {
      let checkedUser = await checkLogin();

>>>>>>> 845f163f2bcff5c29cb712d689529c39f165df95
      if (checkedUser.id) {
        setUser(checkedUser);
        setCart(await getShoppingCart());
      }
    };
<<<<<<< HEAD

    // setAllProducts()
    await setLogIn();
=======

    await setLogIn();

    setHasLoaded(true);
>>>>>>> 845f163f2bcff5c29cb712d689529c39f165df95
  }, []);

  return (
    <div className="App">
<<<<<<< HEAD
      <Navbar user={user} setUser={setUser} />
      <Routes user={user} setUser={setUser} products={products} />
=======
      {hasLoaded ? (
        <>
          <Navbar user={user} setUser={setUser} />
          <Routes user={user} setUser={setUser} products={products} />
        </>
      ) : (
        <h1>Loading, please wait...</h1>
      )}
>>>>>>> 845f163f2bcff5c29cb712d689529c39f165df95
    </div>
  );
}

export default App;
