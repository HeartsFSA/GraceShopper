import React from 'react';
import './css/Cart.css';
import { useStateValue } from '../StateProvider'
import Card from './Card';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import OpenWithIcon from '@material-ui/icons/OpenWith'

function Cart(props) {
    const [{ cart }] = useStateValue();

    return  (
        <div className="block col-1">
            {cart?.length === 0 ? (
                <div>
                    <br></br>
                    <h1> Your Shopping Cart is empty</h1>
                    <p>
                        You have no items in your cart. To buy one or more items, 
                        click "Add to Cart icon" next to the item.
                    </p>
                </div>
            ) : (
                <div>
                    <h2 className="checkout_title"> Your Shopping Basket </h2>
                    
                    {/* List all of the Checkout Products */}
                    <br></br>
                    <Card>
                        <div className='card-content'>
                            <div className='card-header'>
                                <img src='https://www.history.com/.image/ar_4:3%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTU3ODc5MDg3NTA5MDg3NTYx/taj-mahal-2.jpg'/>
                                <div>
                                    <h1>Product Name</h1>
                                    <h3>Product Price</h3>
                                </div>
                            </div>
                            <div className='card-body'>
                                <p>Product Body</p>
                            </div>
                        </div>
                    </Card>
                </div>
            )}
            {cart.length > 0 && (
            <div className="checkout__right">
                <h4> Subtotal: $50.00</h4>
                <h5> Tax: $1.99 </h5>
                <h1> Total: $51.99 </h1>
            </div>
        )}
            <div className="continueShop">
                <button> Continue Shopping </button>
            </div>

            <div className="checkout"> 
                <button> Checkout </button>
            </div>

        </div>
    )
}

export default Cart;