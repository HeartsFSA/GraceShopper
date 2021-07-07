import React, {useEffect, useState} from 'react';
import {getUserByUsername} from '../utils';
import ProductCard from './ProductCard';
import './css/UserDetails.css';

function UserDetails(props) {
  const [user, setUser] = useState({});
  const [productsToShow, setProductsToShow] = useState([]);
  const {products} = props;

  // useEffect for getting the user
  useEffect(async function () {
    setUser(await getUserByUsername(props.match.params.username));
  }, []);

  // separate useEffect for finding the user's products
  useEffect(() => {
    setProductsToShow(
      products.filter((prod) => {
        return prod.creator_name === user.username;
      })
    );
  }, [user]);

  return (
    <div id="user-details-container">
      {user.username ? (
        <div id="user-details-card">
          <div id="user-info">
            <h1>{user.username}</h1>
            <br></br>
            <h3>Contact: {user.email}</h3>
          </div>
          <br></br>
          {productsToShow.length > 0 ? (
            <>
              <h3>Products:</h3>
              <div id="user-products-display">
                {productsToShow.map((prod, i) => {
                  return <ProductCard product={prod} key={i} />;
                })}
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <h1>Loading, please wait...</h1>
      )}
    </div>
  );
}

export default UserDetails;
