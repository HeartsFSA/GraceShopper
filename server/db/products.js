const { createContext } = require('react');
const client = require('./client');
const {photosByProductId} = require('./photos')


// product functions

async function createProduct(inputProduct) {

    // more specific error handling, so we don't have to worry about SQL error messages
    if (!inputProduct.name) {
        throw new Error("Error: no product name given");
    }

    if (!inputProduct.description) {
        throw new Error("Error: no product description given");
    }

    if (!inputProduct.price) {
        throw new Error("Error: no product price given");
    }

    // the meat of it
    try {
        const {rows: [product]} = await client.query(`
            INSERT INTO products (${Object.keys(inputProduct).join()}) values (
                ${Object.keys(inputProduct).map((_, idx) => `$${idx+1}`).join()}
            )
            RETURNING *;
        `, [...Object.values(inputProduct)]);

        return product
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function getProductBy(column, value) {
    try {

        // can't be consistent with how values are inserted since column is a string
        // and value could be string or number
        const {rows: [product]} = await client.query(`
            SELECT * FROM products 
            WHERE ${column} = $1;
        `, [value]) 

        

        return product;
    } catch(error) {
        console.error("thrown from db/products.js/getProductBy", error);
        throw error;
    }
}

async function getAllProducts() {
    try {
        let {rows: productList} = await client.query(`
            SELECT * FROM products;
        `);

        const productListWithPhotos = Promise.all(productList.map( async (product) => {
           product.photos = await photosByProductId(product.id)
           return product
        }))
        return productListWithPhotos;
    } catch (error) {
        console.error("thrown from db/products.js/getAllProducts", error);
        throw error;
    }
}

module.exports = {
    createProduct,
    getProductBy,
    getAllProducts,
}