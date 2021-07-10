import React from 'react';
import {useState, useEffect} from 'react';
import './css/Cart.css';
import {useStateValue} from '../StateProvider';
import Card from './Card';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import OpenWithIcon from '@material-ui/icons/OpenWith';
import {Switch, Route, withRouter, Link} from 'react-router-dom';

import {getOrderProductTotalPrice} from '../utils';

function Cart(props) {
  // Change this in the future for multiple carts
  const {cart, primaryCart, setPrimaryCart} = props;
  console.log('CART IN CART.JS: ', primaryCart);

  return (
    // This is if the user does not have anything in their cart
    <div className="block col-1">
      {primaryCart.orderProducts.length === 0 ? (
        <div>
          <br></br>
          <h1> Your Shopping Cart is empty</h1>
          <p>
            You have no items in your cart. To buy one or more items, click "Add
            to Cart icon" next to the item.
          </p>
        </div>
      ) : (
        <>
          {/* This is if the user has something in their shopping cart */}
          <div>
            <h2 className="checkout_title"> Your Shopping Basket </h2>
          </div>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {primaryCart.orderProducts.map((orderProduct, idx) => {
                primaryCart.orderProducts[idx].totalprice =
                  getOrderProductTotalPrice(orderProduct); // rounds to two decimal places
                return (
                  <tr key={idx}>
                    <td>{orderProduct.product.name}</td>
                    <td>
                      <input
                        type="number"
                        value={orderProduct.quantity}
                        min="1" // limits to 1 as lowest value
                        onChange={(event) => {
                          console.log(event.target.value);
                          let updatedCart = {...primaryCart};
                          updatedCart.orderProducts[idx].quantity = parseFloat(
                            event.target.value
                          );
                          setPrimaryCart(updatedCart);
                        }}
                      ></input>
                    </td>
                    <td>{orderProduct.product.price}</td>
                    <td>{`$${orderProduct.totalprice.toFixed(2)}`}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="checkout__right">
            <br></br>
            <h4> Subtotal: $</h4>
            <h5> Tax: $ </h5>
            <h1> Total: $ </h1>
          </div>

          <div className="continueShop">
            <button> Continue Shopping </button>
          </div>
          <Switch>
            <Link to="/checkout">
              <div className="checkout">
                <button> Checkout </button>
              </div>
            </Link>
          </Switch>
        </>
      )}
      ;
    </div>
  );
}

export default withRouter(Cart);
