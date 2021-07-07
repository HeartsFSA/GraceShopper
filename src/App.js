
import React, { useState, useEffect } from 'react';
import './components/css/App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Cart from './components/Cart';

import Routes from './Routes';
import { checkLogin, getAllProducts, getShoppingCart } from './utils';

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
    };
    // invocation
    await setAllProducts();

    const setLogIn = async () => {
      let checkedUser = await checkLogin();

      if (checkedUser.id) {
        setUser(checkedUser);
        setCart(await getShoppingCart());
      }
    };

    await setLogIn();

    setHasLoaded(true);
  }, []);

  return (
    <div className="App">
      {hasLoaded ? (
        <>
          <Navbar user={user} setUser={setUser} />
          <Routes user={user} setUser={setUser} products={products} />
        </>
      ) : (
        <h1>Loading, please wait...</h1>
      )}
    </div>
  );
}

export default App;
