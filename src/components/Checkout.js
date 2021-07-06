import React, { useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import "./css/Checkout.css";
import axios from "axios";

function Checkout() {
  // test product information, will use actual database products later
  const [product] = React.useState({
    name: "Banana Land",
    price: "56.99",
    description: "Banana fun!",
    location: "the moon",
    quantity: "1", // can be changed once we start inputting actual data from the database
  });

  // handleToken function used to display object in console
  function handleToken(token, addresses) {
    console.log("handleToken: ", { token, addresses });
    // Need to make a axios.post request to the server
    // Work in Progress
  }

  return (
    <div className="block col-1">
      <div className="product">
        <img src="https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/vector-illustration-carnival-circus-marrishuanna.jpg" />
        <h1>Product: {product.name}</h1>
        <h3>Price: ${product.price}</h3>
        <h3>Description: {product.description}</h3>
        <h3>Location: {product.location}</h3>
        <h3>Quantity: {product.quantity}</h3>
      </div>

      <div className="stripeCheckout">
        <StripeCheckout
          // takes these props
          stripeKey="pk_test_51JABWMFJaq0luCY2OpoSh1FVFC3V6cbe55IMnYyR0m8b2gLE5Vh8iGKaoBgKKWO3tpOXRYa1OErp7HMqYhiSLy2h00E5zsfasg"
          token={handleToken}
          billingAddress // Adds in the billingAddress functionality
          shippingAddress // Adds in shippingAddress functionality
          amount={product.price * 100} // multiply by 100 to convert from dollars to cents, this will change the price in the field to actual price
          name={product.name} // Adding the name prop will show the name in the checkout field on top
        />
      </div>
    </div>
  );
}

export default Checkout;
