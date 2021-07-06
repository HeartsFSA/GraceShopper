import React, {useState, useEffect} from 'react';
import {checkLogin} from '../utils';
import ProductCard from './ProductCard';

import './css/Home.css';

function Home(props) {
  const {products} = props;
  const [user, setUser] = useState({});

  useEffect(() => {
    /*
    Why don't we pass the user from the App.js?
    */

    async function setUserData() {
      let data = await checkLogin();
      console.log(data);
      if (!data.id) {
        // no user, return to login
        props.history.push('/login');
      } else {
        setUser(data);
      }
    }

    console.log('products in home.js:', products);
    // setUserData() //invoke
  }, []);

  return (
    <div className="home">
      {products.map((product, idx) => (
        <ProductCard product={product} key={idx} />
      ))}
    </div>
  );
}

export default Home;
