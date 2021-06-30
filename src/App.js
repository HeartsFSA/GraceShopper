import React, { useState, useEffect } from 'react'
import './components/css/App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar'

import Routes from './Routes'
import {
  checkLogin,
  getAllProducts,
  getShoppingCart
} from './utils'

function App() {
  const [user, setUser] = useState({})
  const [products, setProducts] = useState([])

  useEffect(() => {
    const setAllProducts = async () => {
      let prods = await getAllProducts()
      setProducts(prods)
    }

    const setLogIn = async () => {
      let checkedUser = await checkLogin()
      if (checkedUser.id) {
        let cart = await getShoppingCart(checkedUser.id)

        // Might want to add an empty array even if cart is empty
        if(cart) {
          checkedUser.cart = cart
        }
        setUser(checkedUser)
      }
    }

    setAllProducts()
    setLogIn()
  }, [])

  return (
    <Router>
      <div className="App">
        <Switch>

          <Route path="/cart">
          <Navbar />
            <h1> Cart </h1>
          </Route>

          <Route path="login">
            <h1> Login Page </h1>
          </Route>

          <Route path="/">
            <Navbar />
            <h1> Test </h1>
            <h1> Test </h1>
            <h1> Test </h1>
            <h1> Test </h1>
            <h1> Test </h1>
            <h1> Test </h1>
            <h1> Test </h1>
            <h1> Test </h1>
            <h1> Test </h1>
            <h1> Test </h1>
            <h1> Test </h1>
            <h1> Test </h1>
            <h1> Test </h1>
            <h1> Test </h1>
            <h1> Test </h1>
            <h1> Test </h1>
            <h1> Test </h1>
            <h1> Test </h1>
            <h1> Test </h1>
            <h1> Test </h1>
            <h1> Test </h1>
            <h1> Test </h1>
            <h1> Test </h1>
            <h1> Test </h1>
            <h1> Test </h1>
            <h1> Test </h1>
            <h1> Test </h1>
            <h1> Test </h1>
            <h1> Test </h1>
            <h1> Test </h1>
            <h1> Test </h1>
            <h1> Test </h1>
            <h1> Test </h1>
            <h1> Test </h1>
            <h1> Test </h1>
            <h1> Test </h1>
            <h1> Test </h1>
            <h1> Test </h1>
            <h1> Test </h1>
            <h1> Test </h1>
            <h1> Test </h1>
            <h1> Test </h1>
          </Route>
        </Switch>
        </div>
    </Router>
  );
}

export default App
