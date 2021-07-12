import React, {useEffect, useState} from 'react';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import {
  addCartItem,
  updateCartItemQuantity,
  _createLocalOrderProductObj,
  _updateLocalOrderProductObj,
  setLocalCart
} from '../utils';
import './css/ProductDisplay.css';

function ProductDetails(props) {
  const {user, products, setCart, primaryCart, setPrimaryCart} = props;

  let product = products.find((p) => p.name === props.match.params.name);

  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    for (let i = 0; i < product.photos.length; i++) {
      let imgToChange = document.getElementsByClassName('display-photos')[i];
      let dotToChange = document.getElementsByClassName('nav-dot')[i];
      if (i === currentImg) {
        imgToChange.style.display = 'block';
        dotToChange.style.backgroundColor = 'var(--black)';
      } else {
        imgToChange.style.display = 'none';
        dotToChange.style.backgroundColor = 'var(--dot-default)';
      }
    }

    console.log(currentImg);
  }, [currentImg]);

  function addUpdateOrderProduct() {
    console.log('addUpdateOrderProduct()');
    const foundOP = primaryCart.orderProducts.find(
      (orderProduct) => orderProduct.productId === product.id
    );
    console.log('foundOP: ', foundOP);
    if (foundOP) {
      updateCart(foundOP);
    } else {
      addToCart();
    }
  }

  // function addToCart
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
      setPrimaryCart(carts[0]);
      setCart(carts);
    } else {
      console.log('No user found');
      let cart = {...primaryCart};
      console.log('Cart: ', cart);
      cart.orderProducts.push(_createLocalOrderProductObj(1, 10, product));
      setLocalCart(cart);
      setPrimaryCart(cart);
    }
  }

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
      setPrimaryCart(carts[0]);
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
    <div id="product-info-display">
      <div id="product-info-card">
        {product ? (
          <>
            {' '}
            <h1>{product.name}</h1>
            {/* image slideshow container */}
            <div id="product-image-display">
              <div
                id="prev-btn"
                onClick={() =>
                  setCurrentImg(
                    currentImg === 0
                      ? product.photos.length - 1
                      : currentImg - 1
                  )
                }
              >
                <span>&#10094;</span>
              </div>
              {product.photos.map((img, i) => (
                <div id={`photo${i}`} className="display-photos">
                  <img src={img.photo_url}></img>
                </div>
              ))}
              {/* next and prev arrows */}
              <div
                id="next-btn"
                onClick={() =>
                  setCurrentImg(
                    currentImg === product.photos.length - 1
                      ? 0
                      : currentImg + 1
                  )
                }
              >
                <span>&#10095;</span>
              </div>
            </div>
            <div id="dots-div">
              {product.photos.map((_, i) => (
                <span
                  className="nav-dot"
                  // code for hovering over dots; I couldn't get this to work in the css file
                  onMouseOver={() =>
                    (document.getElementsByClassName('nav-dot')[
                      i
                    ].style.backgroundColor = 'var(--black)')
                  }
                  onMouseOut={() => {
                    if (currentImg !== i) {
                      document.getElementsByClassName('nav-dot')[
                        i
                      ].style.backgroundColor = 'var(--dot-default)';
                    }
                  }}
                  onClick={() => setCurrentImg(i)}
                ></span>
              ))}
            </div>{' '}
            <div id="product-info-display-description">
              <p>{product.description}</p>
              <p>Price: {product.price}</p>
              <p>Location: {product.location}</p>
              <p>{product.datesOpen ? `Open ${product.datesOpen}` : ''}</p>
              <p>
                {product.hours ? `Hours of Operation: ${product.hours}` : ''}
              </p>
              <p>Owned by: {product.creator.displayname}</p>
              <p>
                For more information, contact {product.creator.displayname} at{' '}
                {product.creator.email}
              </p>
              <button
                className="cartButton"
                onClick={() => addUpdateOrderProduct()}
              >
                <AddShoppingCartIcon fontSize="large" />
              </button>
            </div>
          </>
        ) : (
          <h1>Please update search criteria</h1>
        )}
      </div>
    </div>
  );
}

export default ProductDetails;
