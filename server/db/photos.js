
const client = require('./client');


//expects photo_id && photo_url || rel_path
async function createPhotos(inputPhoto) {

    // more specific error handling, so we don't have to worry about SQL error messages
    if (!inputPhoto.product_id) {
        throw new Error("Error: Corresponding Photo ID required");
    }

    if (!inputPhoto.photo_url) {
        if (!inputPhoto.rel_path) {
        throw new Error("Error: Need photo URL or relative path");
        }
    }

   
    try {
        const {rows: [photos]} = await client.query(`
            INSERT INTO photos (${Object.keys(inputPhoto).join()}) values (
                ${Object.keys(inputPhoto).map((_, idx) => `$${idx+1}`).join()}
            )
            RETURNING *;
        `, [...Object.values(inputPhoto)]);

        return photos
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function getPhotoById(photo_id) {
    try {

        const {rows: [photo]} = await client.query(`
            SELECT * FROM photos 
            WHERE photo_id={photo_id};
        `)

        return photo;
    } catch(error) {
        console.error("thrown from db/photo by id --- error", error);
        throw error;
    }
}
//not sure how this func. will be used
async function getAllPhotos() {
    try {
        const {rows: allPhotos} = await client.query(`
            SELECT * FROM photos;
        `);

        return allPhotos;
    } catch (error) {
        console.error("thrown from db/ error while get all photos", error);
        throw error;
    }
}

// all photos for a single product
// I am thinking using this for photo carousel

async function photosByProductId(product_id){
    try {
        const {rows: [photos]} = await client.query(`
        SELECT * FROM photos
        	JOIN products
	        ON photos.product_id=products.id
            WHERE products.id={product_id};
        `)
        return photos;
    } catch (error) {
        console.log("from DB / all photos by ID")
        throw error;
    }

}

async function delPhotoById(photo_id) {
    try {
        const {rows: [photo]} = await client.query(`
        DELETE FROM photos
        WHERE photos.photo_id={photo_id}
        `)
    return photo;
    } catch(error) {
        console.log("from DB / del Photo by photo id")
        throw error;
    }
}

async function delPhotoByProductId(product_id) {
    try {
        const {rows: [photo]} = await client.query(`
        DELETE FROM photos
        WHERE photos.product_id={product_id}
        `)
    return photo;
    } catch (error) {
        console.log("from DB/ del photo by product id")
        throw error;
    }
}


module.exports = {
    createPhotos,
    getPhotoById,
    getAllPhotos,
    delPhotoById,
    delPhotoByProductId
}