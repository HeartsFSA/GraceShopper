import React from 'react'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import OpenWithIcon from '@material-ui/icons/OpenWith'

import Card from './Card'

import './css/ProductCard.css'
import { useStateValue } from '../StateProvider'

function ProductCard(props) {
    const [{ cart }, dispatch ] = useStateValue();

    // function to addToBasket
    const addToBasket = () => {
        dispatch({
            type: 'ADD_TO_BASKET'
        })
    }

    return (
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
                <div className='card-footer'>
                    <button><OpenWithIcon fontSize='large' /></button>
                    <h4>Seller</h4>
                    <button onClick={addToBasket}><AddShoppingCartIcon fontSize='large'/></button>
                </div>
            </div>
        </Card>
    )
}

export default ProductCard