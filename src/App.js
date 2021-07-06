import React, {useState, useEffect} from 'react';
import './components/css/App.css';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Navbar from './components/Navbar';
import Cart from './components/Cart';

import Routes from './Routes';
<<<<<<< HEAD
import {
  checkLogin,
  getAllProducts,
  getShoppingCart,
  getOrderHistory
} from './utils';
=======
import {checkLogin, getAllProducts, getShoppingCart} from './utils';
>>>>>>> 0aa9e9ab7e027953df8684465fdbd28248ae7d14

function App() {
  const [user, setUser] = useState({});
  const [cart, setCart] = useState([]);
<<<<<<< HEAD
  const [orders, setOrders] = useState([]);
=======
>>>>>>> 0aa9e9ab7e027953df8684465fdbd28248ae7d14
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
      console.log('from the useEffec in app.js:\n', prods);
    };

    // invocation
    await setAllProducts();
    console.log('Products from app.js:\n', products);

    const setLogIn = async () => {
      let checkedUser = await checkLogin();
      if (checkedUser.id) {
        setUser(checkedUser);
        setCart(await getShoppingCart());
        setOrders(await getOrderHistory());
      }
    };

    // setAllProducts()
    await setLogIn();
=======
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
>>>>>>> 0aa9e9ab7e027953df8684465fdbd28248ae7d14
  }, []);

  return (
    <div className="App">
<<<<<<< HEAD
      <Navbar
        user={user}
        setUser={setUser}
        setCart={setCart}
        setOrders={setOrders}
      />
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
>>>>>>> 0aa9e9ab7e027953df8684465fdbd28248ae7d14
    </div>
  );
}

export default App;
