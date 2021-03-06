import React from 'react';
import {useState, useEffect} from 'react';
import './css/Cart.css';
import {useStateValue} from '../StateProvider';
import Card from './Card';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import OpenWithIcon from '@material-ui/icons/OpenWith';
import {Switch, Route, withRouter, Link} from 'react-router-dom';

import {
  getOrderProductTotalPrice,
  getOrderTotalPrice,
  setLocalCart,
  addUpdateOrderProduct,
  removeOrderProduct
} from '../utils';

function Cart(props) {
  // Change this in the future for multiple carts
  let {user, setCart, cart, primaryCart, setPrimaryCart} = props;
  const [total, setTotal] = useState(0);
  const [tax, setTax] = useState(0);
  // console.log('CART IN CART.JS: ', primaryCart);

  useEffect(() => {
    function setTotalAndTax() {
      const taxRate = 0.1;
      let newTotal = getOrderTotalPrice(primaryCart);
      setTax(newTotal * taxRate);
      newTotal = newTotal + tax;
      setTotal(newTotal);
    }
    setTotalAndTax();
  }, [primaryCart]);

  // let total = 0;
  // primaryCart.orderProducts.forEach((line) => {
  //   total = total + line.quantity * line.product.price.slice(1);
  // });

  // let tax = 0.1 * total;
  // total = total + tax;

  // useEffect(() => {}, [primaryCart]);

  function removeLine(idx) {
    // let newCart = primaryCart;
    // console.log('newCart is: ', newCart);

    primaryCart.orderProducts.splice(idx, 1);
    setLocalCart(primaryCart);
    // localStorage.setItem('cart', JSON.stringify(primaryCart));
    // const updatedCart = primaryCart.orderProducts.splice(idx, 1);
    setPrimaryCart(primaryCart);
  }

  return (
    // This is if the user does not have anything in their cart
    <div className="block col-1">
      {primaryCart.orderProducts.length === 0 ? (
        <div>
          <br></br>
          <h1> Your Shopping Cart is empty</h1>
          <br></br>
          <br></br>
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
                <th>{/* Remove Button */}</th>
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
                    <Link to={`/products/${orderProduct.product.name}`}>
                      <div className="cartProduct">
                        {orderProduct.product.name}
                      </div>
                    </Link>

                    {/* Quantity */}
                    <td>
                      <input
                        type="number"
                        value={orderProduct.quantity}
                        min="1" // limits to 1 as lowest value
                        onChange={async (event) => {
                          console.log(event.target.value);
                          const quantity = parseFloat(event.target.value);
                          const product = orderProduct.product;
                          setCart(
                            await addUpdateOrderProduct(
                              user,
                              primaryCart,
                              product,
                              quantity,
                              'replace'
                            )
                          );
                        }}
                      ></input>
                    </td>
                    <td>
                      {/* Remove Item Button */}
                      <button
                        className="removeItem"
                        onClick={async (e) => {
                          // let updatedCart = {...primaryCart};
                          // removeLine(idx);
                          // setPrimaryCart(updatedCart);
                          await setCart(
                            await removeOrderProduct(
                              user,
                              primaryCart,
                              orderProduct
                            )
                          );
                          console.log('CART: ', cart);
                        }}
                      >
                        Remove Item
                      </button>
                    </td>
                    {/* Price */}
                    <td>{orderProduct.product.price}</td>
                    {/* Subtotal */}
                    <td>{`$${orderProduct.totalprice.toFixed(2)}`}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="checkout__right">
            <br></br>
            <h5> Tax: $ {tax.toFixed(2)}</h5>
            <h1> Total: ${total.toFixed(2)} </h1>
          </div>

          <div className="continueShop">
            <Link to="/">
              <button> Continue Shopping </button>
            </Link>
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
    </div>
  );
}

export default withRouter(Cart);
