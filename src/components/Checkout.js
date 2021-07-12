import React, {useState} from 'react';
import StripeCheckout from 'react-stripe-checkout';
import './css/Checkout.css';
import axios from 'axios';
import {toast} from 'react-toastify';

toast.configure();

function Checkout(props) {
  async function initializeGuestCart() {
    return {
      id: null,
      userId: null,
      status: 0,
      datepurchased: null,
      orderProducts: []
    };
  }

  const {setPrimaryCart, primaryCart, messenger} = props;
  console.log('primaryCart Object is: ', primaryCart);

  // handleToken function used to display object in console
  async function handleToken(token, addresses) {
    console.log('handleToken: ', {token, addresses});
    // Need to make a axios.post request to the server
    const response = await axios.post('api/orders/checkout', {
      token,
      primaryCart
    });
    const {status} = response.data.data;
    console.log('Status is: ', response.data.data.status);
    if (status === 'success') {
      // toast('Success! Check email for details', {type: 'success'});
      messenger(
        'Success! Your order has been placed thank you for shopping with us!'
      );
      localStorage.removeItem('cart'); // Remove Products in Guest Cart
      setPrimaryCart(await initializeGuestCart());
    } else {
      // toast('Something went wrong', {type: 'error'});
      messenger(
        'Error: Payment failed! Please use a different payment method and try again.'
      );
    }
  }

  let checkoutTotal = 0;
  primaryCart.orderProducts.forEach((line) => {
    checkoutTotal = checkoutTotal + line.quantity * line.product.price.slice(1);
  });

  checkoutTotal = checkoutTotal * 1.1;

  console.log('Checkout Total: ', checkoutTotal);

  return (
    <div className="block col-1">
      <div className="product">
        <h1>Your Checkout Total is: $ {checkoutTotal.toFixed(2)}</h1>
      </div>

      <div className="stripeCheckout">
        <StripeCheckout
          // takes these props
          stripeKey="pk_test_51JABWMFJaq0luCY2OpoSh1FVFC3V6cbe55IMnYyR0m8b2gLE5Vh8iGKaoBgKKWO3tpOXRYa1OErp7HMqYhiSLy2h00E5zsfasg"
          token={handleToken}
          billingAddress // Adds in the billingAddress functionality
          shippingAddress // Adds in shippingAddress functionality
          amount={checkoutTotal * 100} // multiply by 100 to convert from dollars to cents, this will change the price in the field to actual price
          // name={product.name} // Adding the name prop will show the name in the checkout field on top
        />
      </div>
    </div>
  );
}

export default Checkout;

// primaryCart Object is:
// {id: null, userId: null, status: 0, datepurchased: null, orderProducts: Array(4)}
//    datepurchased: null
//    id: null
//    orderProducts: Array(4)
//      0:
//        dateadded: "2021-07-11T19:08:45.989Z"
//        id: null
//        orderId: null
//        product: {id: 1, name: "Banana Land", description: "Banana fun!", price: "$56.99", hours: null, …}
//        productId: 1
//        quantity: 1
//        totalPrice: 10
//        totalprice: 56.99
// __proto__: Object
// 1: {id: null, productId: 3, orderId: null, quantity: 1, totalPrice: 10, …}
// 2: {id: null, productId: 4, orderId: null, quantity: 1, totalPrice: 10, …}
// 3: {id: null, productId: 2, orderId: null, quantity: 1, totalPrice: 10, …}
//    length: 4
// __proto__: Array(0)
// status: 0
// userId: null
// __proto__: Object

// handleToken:
// {token: {…}, addresses: {…}}
//    addresses:
//        billing_address_city: "t"
//        billing_address_country: "Taiwan"
//        billing_address_country_code: "TW"
//        billing_address_line1: "t"
//        billing_address_zip: "t"
//        billing_name: "t"
//        shipping_address_city: "t"
//        shipping_address_country: "Taiwan"
//        shipping_address_country_code: "TW"
//        shipping_address_line1: "t"
//        shipping_address_zip: "t"
//        shipping_name: "t"
// __proto__: Object
// token:
//    card: {id: "card_1JCAoZFJaq0luCY2MlnxlfLR", object: "card", address_city: "t", address_country: "Taiwan", address_line1: "t", …}
//        client_ip: "67.176.197.85"
//        created: 1626041275
//        email: "test@email.com"
//        id: "tok_1JCAoZFJaq0luCY2awebZthl"
//        livemode: false
//        object: "token"
//        type: "card"
//        used: false
// __proto__: Object
// __proto__: Object
