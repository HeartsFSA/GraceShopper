const { MoodOutlined } = require('@material-ui/icons');
const express = require('express')
const photosRouter = express.Router()

const {
    createPhotos,
    getPhotoById,
    getAllPhotos,
    delPhotoById,
    delPhotoByProductId,
    photosByProductId,
    getAllProducts
} = require('../db')

//this is .js is more for testing photos


photosRouter.use((req,res,next) => {console.log('photosRouter working L15'); next()})

photosRouter.get('/', async (req,res,next) => {
    res.send(await getAllProducts())
})

// photosRouter.get('/all', async (req, res, next) => {
//    res.send('hi')

// })

module.exports = photosRouter;