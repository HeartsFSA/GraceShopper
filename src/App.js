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
  getOrderHistory,
  getLocalCart,
  initializeGuestCart
} from './utils';

function App() {
  const [user, setUser] = useState({});
  const [cart, setCart] = useState([]);
  const [primaryCart, setPrimaryCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState('');
  const [getProduct, setGetProducts] = useState([]);
  const [message, setMessage] = useState('This message should not show');

  // used for a loading page.
  // This displays while the async functions are still loading.
  const [hasLoaded, setHasLoaded] = useState(false);

  // initializes products
  useEffect(() => {
    const setAllProducts = async () => {
      let prods = await getAllProducts();

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
        console.log('User Found');
        setUser(checkedUser);
        setCart(await getShoppingCart());
        setOrders(await getOrderHistory());
      } else {
        console.log('No user found');
        console.log('Creating Primary Cart...');
        console.log('Cart found: ', getLocalCart());
        const localCart = getLocalCart();
        if (localCart) {
          setPrimaryCart(localCart);
        } else {
          setPrimaryCart(initializeGuestCart());
        }
      }
    };

    // setAllProducts()
    setLogIn();
  }, []);

  useEffect(async () => {
    console.log('Primary Cart being set...');
    await setPrimaryCart(cart[0]);
  }, [cart]);

  useEffect(() => {
    if (query) {
      let filtered = products.filter((obj) =>
        JSON.stringify(obj).toLowerCase().includes(query.toLowerCase())
      );
      setGetProducts(filtered);
      console.log(query);
      console.log(filtered);
      // props.history.push('/');
    } else {
      setGetProducts(products);
    }
  }, [query]);

  function messenger(incmoingMessage) {
    setMessage(incmoingMessage);
    setTimeout(() => {
      setMessage('');
    }, 10000);
  }

  useEffect(() => {
    messenger('Welcome to Wonderful World of TicketMain!');
  }, []);

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
            primaryCart={primaryCart}
            setPrimaryCart={setPrimaryCart}
            messenger={messenger}
            setCart={setCart}
            setOrders={setOrders}
          />
          <MessageBar message={message} />

          <Routes
            user={user}
            setUser={setUser}
            products={products}
            setProducts={setProducts}
            cart={cart}
            setCart={setCart}
            primaryCart={primaryCart}
            setPrimaryCart={setPrimaryCart}
            getProduct={getProduct}
            messenger={messenger}
          />
        </>
      ) : (
        <h1>Loading, please wait...</h1>
      )}
    </div>
  );
}

export default App;
