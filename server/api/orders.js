const express = require('express')
const router = express.Router()
const {
  createOrder,
  getOrdersByUserId,
  getCartsByUserId,
  updateCartToOrderByOrderId,
  createOrderProduct,
  getOrderProductsByOrderId,
  updateOrderProductsById,
  getProductBy,

  createCartItem,
  getCartByUserId,
  updateCartItemQuantity,
  deleteCartItemByCartId,
  deleteCartByUserId
} = require('../db')

async function _constructOrdersObjects(orders) {
  const ordersWithProducts = await Promise.all(
    orders.map(async (order) => {
      const orderProducts = await getOrderProductsByOrderId(order.id)
      const orderProductsWithProduct = await Promise.all(
        orderProducts.map(async (orderProduct) => {
          orderProduct.product = await getProductBy('id', orderProduct.productId)
          return orderProduct
        })
      )
      order.orderProducts = orderProductsWithProduct
      return order
    })
  )

  return ordersWithProducts
}

// ***
// GET /api/orders/history
// Sends current users order history
router.get('/history', async (req, res, next) => {
  const {id: userId} = req.user
  try {
    const orders = await getOrdersByUserId(userId)
    const ordersWithProducts = await _constructOrdersObjects(orders)

    res.send(ordersWithProducts)
  } catch (error) {
    next(error)
  }
})

// ***
// GET /api/orders/carts
// Sends current users carts
router.get('/carts', async (req, res, next) => {
  const {id: userId} = req.user
  try {
    const orders = await getCartsByUserId(userId)
    const ordersWithProducts = await _constructOrdersObjects(orders)

    res.send(ordersWithProducts)
  } catch (error) {
    next(error)
  }
})


// POST /api/orders/item
// Adds item to current users cart
router.post('/item', async (req, res, next) => {
  const orderProductData = req.body
  const {id: userId} = req.user
  try {
    await createOrderProduct(orderProductData)
    const carts = await getCartsByUserId(userId)
    res.send(await _constructOrdersObjects(carts))
  } catch (error) {
    next(error)
  }
})

// UPDATE /api/orders/item
// Updates order_product item
router.patch('/item', async (req, res, next) => {
  const orderProductData = req.body
  const {id: userId} = req.user
  try {
    await updateOrderProductsById(orderProductData)
    const carts = await getCartsByUserId(userId)
    res.send(await _constructOrdersObjects(carts))
  } catch (error) {
    next(error)
  }
})

// UPDATE /api/orders/carts
// Updates a cart to an order
router.patch('/carts', async (req, res, next) => {
  const {orderId} = req.body
  const {id: userId} = req.user
  try {
    await updateCartToOrderByOrderId(orderId)
    const carts = await getCartsByUserId(userId)
    res.send(await _constructOrdersObjects(carts))
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
