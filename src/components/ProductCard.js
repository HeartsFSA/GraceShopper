import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import OpenWithIcon from '@material-ui/icons/OpenWith';
import Card from './Card';
import {
  addCartItem,
  updateCartItemQuantity,
  _createLocalOrderProductObj,
  _updateLocalOrderProductObj,
  setLocalCart
} from '../utils';
import './css/ProductCard.css';

function ProductCard(props) {
  // want to get access to the props
  const {user, product, setCart, primaryCart, setPrimaryCart} = props;

  // orderId, productId, quantity, totalPrice

  function addUpdateOrderProduct() {
    console.log('addUpdateOrderProduct()');
    console.log(primaryCart);
    const foundOP = primaryCart.orderProducts.find(
      (orderProduct, idx) => orderProduct.productId === product.id
    );
    console.log('foundOP: ', foundOP);
    if (foundOP) {
      updateCart(foundOP);
    } else {
      addToCart();
    }
  }

  // Add to cart locally or on DB
  async function addToCart() {
    console.log('Adding to cart...');
    if (user.id) {
      console.log('User found: ', user);
      const carts = await addCartItem(
        primaryCart.id,
        product.id,
        1,
        product.price
      );
      // setPrimaryCart(carts[0]);
      await setCart(carts);
    } else {
      console.log('No user found');
      let cart = {...primaryCart};
      console.log('Cart: ', cart);
      cart.orderProducts.push(_createLocalOrderProductObj(1, 10, product));
      setLocalCart(cart);
      setPrimaryCart(cart);
    }
  }

  // Update cart locally or on DB
  async function updateCart(orderProduct) {
    console.log(`Updating cart with order product: ${orderProduct}`);
    const newQuantity = parseInt(orderProduct.quantity) + 1;
    const totalPrice =
      orderProduct.product.price.slice(1, orderProduct.product.price.length) *
      newQuantity;
    console.log('Quantity: ', newQuantity);
    console.log('Total Price: ', totalPrice);
    if (user.id) {
      console.log('Updating DB cart...');
      const carts = await updateCartItemQuantity(
        orderProduct.id,
        newQuantity,
        totalPrice
      );
      // setPrimaryCart(carts[0]);
      setCart(carts);
    } else {
      console.log('Updating local cart...');
      let updatedCart = {...primaryCart};
      const updatedOP = _updateLocalOrderProductObj(
        newQuantity,
        totalPrice,
        orderProduct
      );
      updatedCart.orderProducts.splice(
        updatedCart.orderProducts.findIndex(
          (op) => op.productId === product.id
        ),
        1,
        updatedOP
      );
      console.log('Updated Cart: ', updatedCart);
      setLocalCart(updatedCart);
      setPrimaryCart(updatedCart);
    }
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
          <button onClick={() => addUpdateOrderProduct()}>
            <AddShoppingCartIcon fontSize="large" />
          </button>
        </div>
      </div>
    </Card>
  );
}

export default ProductCard;
