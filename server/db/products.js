
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

    if (!inputProduct.creatorName) {
        throw new Error("Error: no creator name given")
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

// combines getProductById, getProductByName, getProductByPrice, etc.
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

// takes id, might change later
// productInfo is an object which contains all updated info
async function updateProduct(id, productInfo) {
    try {
        const {rows: [updatedProduct]} = await client.query(`
            UPDATE products
            SET ${Object.keys(productInfo).map((val, idx) => `${val}=$${idx+1}`).join()}
            WHERE id=${id}
            RETURNING *;
        `, Object.values(productInfo));

        return updatedProduct;
    } catch (error) {
        console.error("thrown from db/products.js/updateProduct");
        throw error;
    }
}

// takes id, might change later
async function deleteProduct(id) {
    try {
        const {rows: [product]} = await client.query(`
            DELETE FROM products
            WHERE id=$1
            RETURNING *;
        `, [id])

        console.log("product being deleted:", product)
        return product;
    } catch (error) {
        console.error("thrown from db/products.js/deleteProduct", error);
        throw error;
    }
}

module.exports = {
    createProduct,
    getProductBy,
    getAllProducts,
    updateProduct,
    deleteProduct,
}