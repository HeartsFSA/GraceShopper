const express = require('express');
const productsRouter = express.Router();
const {
    getAllProducts, 
    getProductBy, 
    createProduct
} = require('../db');

// GET /api/products/all
// sends all products
productsRouter.use((req,res,next) => {console.log('productsRouter is working'); next()})

productsRouter.get('/all', async (req, res, next) => {
    try {
        res.send(await getAllProducts());
    } catch (error) {
        console.error("Error in API getting all products:", error);
        throw error;
    }
})

// GET /api/products/:column/:value
// finds product by column value
// use %20 to represent a space in the path e.g, /name/Banana%20Land
productsRouter.get('/:column/:value', async (req, res, next) => {
    try {
        res.send(await getProductBy(req.params.column, req.params.value));
    } catch (error) {
        console.error("Error in API getting product by column:", error);
        throw error;
    }
})

// POST /api/products
// creates a new product
// remember that the req.body needs to be json (axios takes care of this for you,
// but postman does not, so bear that in mind when testing)
const photosRouter = require('./photos')
productsRouter.use('/photos', photosRouter)

productsRouter.post('/', async (req, res, next ) => {
    try {
        res.send(await createProduct(req.body))
    } catch (error) {
        console.error("Error in API creating product:", error);
        throw error;
    }
})

module.exports = productsRouter;