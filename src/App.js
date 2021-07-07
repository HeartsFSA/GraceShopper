import React, {useState, useEffect} from 'react';
import './components/css/App.css';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Navbar from './components/Navbar';
import Cart from './components/Cart';

import Routes from './Routes';

import {PinDropSharp} from '@material-ui/icons';

import MessageBar from './components/MessageBar';

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
  const [query, setQuery] = useState('');
  const [getProduct, setGetProducts] = useState([]);
  const [message, setMessage] = useState('TEST MESSAGE');

  // used for a loading page.
  // This displays while the async functions are still loading.
  const [hasLoaded, setHasLoaded] = useState(false);

  // initializes products
  useEffect(() => {
    const setAllProducts = async () => {
      let prods = await getAllProducts();
      // console.log(prods);

      await setGetProducts(prods);
      await setProducts(prods);
      await setHasLoaded(true);
    };

    // invocation
    setAllProducts();
  }, []);

  // initialize login status
  useEffect(() => {
    const setLogIn = async () => {
      let checkedUser = await checkLogin();

      if (checkedUser.id) {
        setUser(checkedUser);
        setCart(await getShoppingCart());
        setOrders(await getOrderHistory());
      }
    };

    // setAllProducts()
    setLogIn();
  }, []);

  console.log('products', products);

  useEffect(() => {
    if (query) {
      let filtered = products.filter((obj) =>
        JSON.stringify(obj).toLowerCase().includes(query.toLowerCase())
      );
      setGetProducts(filtered);
      console.log(query);
      console.log(filtered);
      // props.history.push('/');
    }
    // else {
    //   setProducts(getProduct);
    // }
  }, [query]);

  return (
    <div className="App">
      {hasLoaded ? (
        <>
          <Navbar
            user={user}
            setUser={setUser}
            query={query}
            setQuery={setQuery}
            products={products}
          />
          <MessageBar message={message} setMessage={setMessage} />

          <Routes
            user={user}
            setUser={setUser}
            products={products}
            setProducts={setProducts}
            getProduct={getProduct}
          />
        </>
      ) : (
        <h1>Loading, please wait...</h1>
      )}
    </div>
  );
}

export default App;
