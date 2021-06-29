import React, { useState, useEffect } from 'react'
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
      let {data: prods} = await getAllProducts()
      setProducts(prods)
    }

    const setLogIn = async () => {
      let {data: checkedUser} = await checkLogin()
      if (checkedUser.id) {
        let {data: cart} = await getShoppingCart(checkedUser.id)
        
        // Might want to add an empty array if cart is empty
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
    <div className='App'>
      <Navbar user={user} setUser={setUser} />
      <Routes user={user} setUser={setUser} />
    </div>
  )
}

export default App
