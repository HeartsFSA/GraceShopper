import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import OpenWithIcon from '@material-ui/icons/OpenWith';

import Card from './Card';

import './css/ProductCard.css';
import {useStateValue} from '../StateProvider';

function ProductCard({product}) {
  const [{cart}, dispatch] = useStateValue();

  // function to addToBasket
  const addToBasket = () => {
    dispatch({
      type: 'ADD_TO_BASKET'
    });
  };

  return (
    <Card>
      <div className="card-content">
        <div className="card-header">
          <Link to={`/products/${product.name}`}>
            <h1>{product.name}</h1>
            <h3>{product.price}</h3>
          </Link>
        </div>
        <div className="card-body">
          {/* <p>{product.description}</p> */}

          <Link to={`/products/${product.name}`}>
            <img
              src={
                product.photos.length > 0
                  ? product.photos[0].photo_url
                  : 'https://www.history.com/.image/ar_4:3%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTU3ODc5MDg3NTA5MDg3NTYx/taj-mahal-2.jpg'
              }
            />
          </Link>
        </div>
        <div className="card-footer">
          <Link to={`/products/${product.name}`}>
            <button>
              <OpenWithIcon fontSize="large" />
            </button>
          </Link>
          <Link to={`/users/${product.creator_name}`}>
            <h4>{product.creator.displayname}</h4>
          </Link>
          <button onClick={addToBasket}>
            <AddShoppingCartIcon fontSize="large" />
          </button>
        </div>
      </div>
    </Card>
  );
}

export default ProductCard;
