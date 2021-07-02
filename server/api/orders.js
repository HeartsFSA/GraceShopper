const express = require('express')
const router = express.Router()
const {
  getOrdersByUserId,
  getOrderProductsByOrderId,

  createCartItem,
  getCartByUserId,
  updateCartItemQuantity,
  deleteCartItemByCartId,
  deleteCartByUserId
} = require('../db')

// ***
// GET /api/orders/me
// Sends current users orders
router.get('/me', async (req, res, next) => {
  const {id: userId} = req.user
  try {
    let orders = await getOrdersByUserId(userId)
    const ordersWithProducts = await Promise.all(
      orders.map(async (order) => {
        order['order_products'] = await getOrderProductsByOrderId(order.id)
        return order
      })
    )

    res.send(ordersWithProducts)
  } catch (error) {
    next(error)
  }
})

// POST /api/carts/item
// Adds item to current users cart
router.post('/item', async (req, res, next) => {
  const {id: userId} = req.user
  try {
    await createCartItem(req.body)
    res.send(await getCartByUserId(userId))
  } catch (error) {
    next(error)
  }
})

// UPDATE /api/carts/item
// Updates quantity of item in cart
router.patch('/item', async (req, res, next) => {
  const {itemId, inputQuantity, method} = req.body
  const {id: userId} = req.user
  try {
    await updateCartItemQuantity(itemId, inputQuantity, method)
    res.send(await getCartByUserId(userId))
  } catch (error) {
    next(error)
  }
})

// DELETE /api/carts/me
// Delete entire cart of current user
router.delete('/me', async (req, res, next) => {
  const {id: userId} = req.user
  try {
    await deleteCartByUserId(userId)
    res.send(await getCartByUserId(userId))
  } catch (error) {
    next(error)
  }
})

// DELETE /api/carts/item
// Delete individual item from cart
router.delete('/item', async (req, res, next) => {
  const {itemId} = req.body
  const {id: userId} = req.user
  try {
    await deleteCartItemByCartId(itemId)
    res.send(await getCartByUserId(userId))
  } catch (error) {
    next(error)
  }
})

module.exports = router
