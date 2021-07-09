import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import OpenWithIcon from '@material-ui/icons/OpenWith';
import Card from './Card';
import {addCartItem, updateCartItemQuantity} from '../utils';
import './css/ProductCard.css';

function ProductCard(props) {
  // want to get access to the props
  const {product, setCart, primaryCart, setPrimaryCart} = props;

  // orderId, productId, quantity, totalPrice

  // function addToCart
  async function addToCart() {
    const carts = await addCartItem(
      primaryCart.id,
      product.id,
      1,
      product.price
    );
    setPrimaryCart(carts[0]);
    setCart(carts);
  }

  async function updateCart(orderProduct) {
    const newQuantity = parseInt(orderProduct.quantity) + 1;
    const totalPrice =
      orderProduct.product.price.slice(1, orderProduct.product.price.length) *
      newQuantity;
    console.log('Quantity: ', newQuantity);
    console.log('Total Price: ', totalPrice);
    const carts = await updateCartItemQuantity(
      orderProduct.id,
      newQuantity,
      totalPrice
    );
    setPrimaryCart(carts[0]);
    setCart(carts);
  }

  return (
    <Card className="product-card">
      <div className="card-content">
        <Link to={`/products/${product.name}`}>
          <div className="card-header">
            <div>
              <h1>{product.name}</h1>
              <h3>{product.price}</h3>
            </div>
          </div>
        </Link>

        <div className="card-body">
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
          <button
            onClick={() => {
              const orderProduct = primaryCart.orderProducts.find(
                (orderProduct) => orderProduct.productId === product.id
              );
              if (orderProduct) {
                updateCart(orderProduct);
              } else {
                addToCart();
              }
            }}
          >
            <AddShoppingCartIcon fontSize="large" />
          </button>
        </div>
      </div>
    </Card>
  );
}

export default ProductCard;
