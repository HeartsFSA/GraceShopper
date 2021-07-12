import React, {useState, useEffect} from 'react';
import {checkLogin} from '../utils';
import ProductCard from './ProductCard';

import './css/Home.css';

function Home(props) {
  const {user, products, primaryCart, setCart, setPrimaryCart, getProduct} =
    props;
  // const [user, setUser] = useState({});
  // products is non fileted array
  // getProduct is filtered array

  // useEffect(() => {
  //   /*
  //   Why don't we pass the user from the App.js?
  //   */

  //   // async function setUserData() {
  //   //   let data = await checkLogin();
  //   //   console.log(data);
  //   //   if (!data.id) {
  //   //     // no user, return to login
  //   //     props.history.push('/login');
  //   //   } else {
  //   //     setUser(data);
  //   //   }
  //   // }

  //   // setUserData(); //invoke
  // }, []);

  return (
    <div className="home">
      <div className="products">
        {getProduct.map((product, idx) => (
          <ProductCard
            key={idx}
            user={user}
            product={product}
            primaryCart={primaryCart}
            setCart={setCart}
            setPrimaryCart={setPrimaryCart}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
