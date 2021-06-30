import React, { useState, useEffect } from 'react'
import { checkLogin } from '../utils'
import ProductCard from './ProductCard'

import './css/Home.css'

function Home(props) {
  const {products} = props
  const [user, setUser] = useState({})

  useEffect(() => {
    /*
    Why don't we pass the user from the App.js?
    */
    async function setUserData() {
      let data = await checkLogin()
      console.log(data)
      if (!data.id) {
        // no user, return to login
        props.history.push('/login')
      } else {
        setUser(data)
      }
    }
    setUserData() //invoke
  }, [])

  return (
    <div className='home'>
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </div>
  )
}

export default Home
