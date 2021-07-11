import React, {useEffect} from 'react';
import {Switch, Route, withRouter} from 'react-router-dom';
import Home from './components/Home';
import AuthForm from './components/AuthForm';
import Landing from './components/Landing';
import Cart from './components/Cart';
import Checkout from './components/Checkout.js';
import ProductDetails from './components/ProductDetails';
import UserDetails from './components/UserDetails';
import ASDashboard from './components/ASDashboard';

function Routes(props) {
  const {
    user,
    setUser,
    products,
    setProducts,
    cart,
    setCart,
    primaryCart,
    setPrimaryCart,
    getProduct
  } = props;
  return (
    <Switch>
      <Route path="/checkout" component={Checkout} />

      <Route
        path="/cart"
        render={(props) => (
          <Cart
            {...props}
            cart={cart}
            primaryCart={primaryCart}
            setPrimaryCart={setPrimaryCart}
          />
        )}
      />

      <Route
        path="/admin"
        render={(props) => (
          <ASDashboard
            type="admin"
            {...props}
            products={products}
            setProducts={setProducts}
            user={user}
          />
        )}
      />

      <Route
        path="/seller"
        render={(props) => (
          <ASDashboard
            type="seller"
            {...props}
            products={products}
            setProducts={setProducts}
            user={user}
          />
        )}
      />

      <Route
        path="/login"
        render={(props) => (
          <AuthForm type="login" {...props} setUser={setUser} />
        )}
      />

      <Route
        path="/signup"
        render={(props) => (
          <AuthForm type="register" {...props} setUser={setUser} />
        )}
      />

      <Route
        path="/products/:name"
        render={(props) => <ProductDetails {...props} products={products} />}
      />

      <Route
        path="/users/:username"
        render={(props) => (
          <UserDetails
            {...props}
            user={user}
            products={products}
            setProducts={setProducts}
          />
        )}
      />

      <Route
        path="/"
        render={(props) => (
          <Home
            {...props}
            user={user}
            products={products}
            primaryCart={primaryCart}
            setCart={setCart}
            setPrimaryCart={setPrimaryCart}
            getProduct={getProduct}
          />
        )}
      />
    </Switch>
  );
}

export default withRouter(Routes);
