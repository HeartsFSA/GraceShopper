import React from 'react';
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

  //   useEffect(() => {
  //     return console.log(product.photos);
  //   }, []);

  return (
    <Card className="product-card">
      <Link to={`/products/${product.name}`}>
        <div className="card-content">
          <div className="card-header">
            <div>
              <h1>{product.name}</h1>
              <h3>{product.price}</h3>
            </div>
          </div>
          <div className="card-body">
            {/* <p>{product.description}</p> */}
            <img
              src={
                product.photos.length > 0
                  ? product.photos[0].photo_url
                  : 'https://www.history.com/.image/ar_4:3%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTU3ODc5MDg3NTA5MDg3NTYx/taj-mahal-2.jpg'
              }
            />
          </div>
          <div className="card-footer">
            <button>
              <OpenWithIcon fontSize="large" />
            </button>
            <h4>{product.creatorname}</h4>
            <button onClick={addToBasket}>
              <AddShoppingCartIcon fontSize="large" />
            </button>
          </div>
        </div>
      </Link>
    </Card>
  );
}

export default ProductCard;
