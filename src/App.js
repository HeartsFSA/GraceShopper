import React, {useState, useEffect} from 'react';
import './components/css/App.css';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Navbar from './components/Navbar';
import Cart from './components/Cart';

import Routes from './Routes';
import {
  checkLogin,
  getAllProducts,
  getShoppingCart,
  getOrderHistory
} from './utils';

function App() {
  const [user, setUser] = useState({});
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  // used for a loading page.
  // This displays while the async functions are still loading.
  const [hasLoaded, setHasLoaded] = useState(false);

  // initializes products and login status.
  useEffect(async () => {
    const setAllProducts = async () => {
      let prods = await getAllProducts();
      setProducts(prods);
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
  }, []);

  return (
    <div className="App">
      <Navbar
        user={user}
        setUser={setUser}
        setCart={setCart}
        setOrders={setOrders}
      />
      <Routes user={user} setUser={setUser} products={products} />
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
