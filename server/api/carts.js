const express = require('express')
const router = express.Router()


// GET /api/carts/me
// Sends current users cart
router.get('/me', async (req, res, next) => {
    try {
        
    } catch (error) {
        next(error)
    }
})