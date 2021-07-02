import React, { useState, useEffect } from 'react'
import './components/css/App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar'
import Cart from './components/Cart';

import Routes from './Routes'
import {
  checkLogin,
  getAllProducts,
  getShoppingCart
} from './utils'

function App() {
  const [user, setUser] = useState({})
  const [cart, setCart] = useState([])
  const [products, setProducts] = useState([])

  useEffect(() => {
    const setAllProducts = async () => {
      let prods = await getAllProducts()
      setProducts(prods)
      console.log(prods)
    }

    const setLogIn = async () => {

      let checkedUser = await checkLogin()
      if (checkedUser.id) {
        setUser(checkedUser)
        setCart(await getShoppingCart())
      }
    }

    // setAllProducts()
    setLogIn()
  }, [])

  return (
    <div className='App'>
      <Navbar user={user} setUser={setUser} />
      <Routes 
        user={user} 
        setUser={setUser}
        products={products} />
    </div>
  )
}

export default App
