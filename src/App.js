import React, {useState, useEffect} from 'react';
import './components/css/App.css';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Navbar from './components/Navbar';
import Cart from './components/Cart';

import Routes from './Routes';
import {checkLogin, getAllProducts, getShoppingCart} from './utils';
import {PinDropSharp} from '@material-ui/icons';

function App() {
  const [user, setUser] = useState({});
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState('');
  const [getProduct, setGetProducts] = useState([]);

  // used for a loading page.
  // This displays while the async functions are still loading.
  const [hasLoaded, setHasLoaded] = useState(false);

  // initializes products and login status.
  useEffect(async () => {
    const setAllProducts = async () => {
      let prods = await getAllProducts();
      console.log(prods);

      setGetProducts(prods);
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

  useEffect(() => {
    if (query) {
      let filtered = getProduct.filter((obj) =>
        JSON.stringify(obj).toLowerCase().includes(query.toLowerCase())
      );
      setProducts(filtered);
      console.log(query);
      console.log(filtered);
      // props.history.push('/');
    } else {
      setProducts(getProduct);
    }
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
          <Routes user={user} setUser={setUser} products={products} />
        </>
      ) : (
        <h1>Loading, please wait...</h1>
      )}
    </div>
  );
}

export default App;
