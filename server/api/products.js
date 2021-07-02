const express = require('express');
const productsRouter = express.Router();
const {
    getAllProducts, 
    getProductBy, 
    createProduct,
    deleteProduct,
    updateProduct,
    deleteCartByProductId,
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


router.patch('/:productID', async (req, res, next) => {
    try {
        let productToBeUpdated = await getProductBy("id", req.params.productID)
        if ( productToBeUpdated.creatorname !== req.user.username){
            console.log("user", req.user.username, "tried to edit", productToBeUpdated);
            res.send("Error: you are not logged as the creator of this item")
        } else {
            res.send(await updateProduct(req.params.productID, req.body));
        }
    } catch (error) {
        console.error("Error in API updating product:", error);
        throw error;
    }
})

// DELETE /api/products
// I'm requiring that the id be in the body of the request so that people cant
// delete products by typing the right URL
router.delete('/', async (req, res, next) => {
    try {
        let productToBeDeleted = await getProductBy("id", req.body.id)

        if ( productToBeDeleted.creatorname !== req.user.username){
            console.log("user", req.user.username, "tried to edit", productToBeDeleted);
            res.send("Error: you are not logged as the creator of this item")
        } else {
            await deleteCartByProductId(req.body.id);
            res.send(await deleteProduct(req.body.id));
        }
    } catch (error) {
        console.error("Error in API deleting product:", error);
        throw error;
    }
})

module.exports = productsRouter;
