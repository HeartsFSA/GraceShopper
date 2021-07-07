import React, {useEffect, useState} from 'react';
import {getUserByUsername} from '../utils';
import ProductCard from './ProductCard';
import './css/UserDetails.css';

function UserDetails(props) {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [user, setUser] = useState({});
  const [productsToShow, setProductsToShow] = useState([]);
  const {products} = props;

  useEffect(async function () {
    console.log('input username:', props.match.params.username);
    setUser(await getUserByUsername(props.match.params.username));
    console.log('email:', user.email);

    setHasLoaded(true);
  }, []);

  return (
    <div id="user-details-container">
      {hasLoaded && user.username ? (
        <div id="user-details-card">
          <div id="user-info">
            <h1>{user.username}</h1>
            <h3>Contact: {user.email}</h3>
          </div>
          {products
            .filter((prod) => {
              return prod.creator_name === user.username;
            })
            .map((prod, i) => {
              return <ProductCard product={prod} key={i} />;
            })}
        </div>
      ) : (
        <h1>Loading, please wait...</h1>
      )}
    </div>
  );
}

export default UserDetails;
