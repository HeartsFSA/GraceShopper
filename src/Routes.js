import React from 'react';
import {Switch, Route, withRouter} from 'react-router-dom';
import Home from './components/Home';
import AuthForm from './components/AuthForm';
import Landing from './components/Landing';
import Cart from './components/Cart';
import Checkout from './components/Checkout.js';
import ProductDetails from './components/ProductDetails';
import ASDashboard from './components/ASDashboard';

function Routes(props) {
  const {user, setUser, products} = props;
  return (
    <Switch>
      <Route path="/checkout" component={Checkout} />

      <Route path="/cart" component={Cart} />

      <Route
        path="/admin"
        render={(props) => (
          <ASDashboard
            type="admin"
            {...props}
            products={products}
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
        path="/"
        render={(props) => <Home {...props} products={products} />}
      />
    </Switch>
  );
}

export default withRouter(Routes);
