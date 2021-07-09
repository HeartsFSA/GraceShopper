const express = require('express');
const router = express.Router();
const {
  createOrder,
  getAllOrders,
  getOrdersByUserId,
  getCartsByUserId,
  updateCartToOrderByOrderId,
  createOrderProduct,
  getOrderProductsByOrderId,
  updateOrderProductsById,
  getProductBy,
  getCartByUserId,
  updateCartItemQuantity,
  deleteCartItemByCartId,
  deleteCartByUserId
} = require('../db');
const {route} = require('./users');

async function _constructOrdersObjects(orders) {
  const ordersWithProducts = await Promise.all(
    orders.map(async (order) => {
      const orderProducts = await getOrderProductsByOrderId(order.id);
      const orderProductsWithProduct = await Promise.all(
        orderProducts.map(async (orderProduct) => {
          orderProduct.product = await getProductBy(
            'id',
            orderProduct.productId
          );
          return orderProduct;
        })
      );
      order.orderProducts = orderProductsWithProduct;
      return order;
    })
  );

  return ordersWithProducts;
}

// GET /api/orders/
// Sends all orders (carts, history, pending, etc.)
// Check if permission is admin
router.get('/', async (req, res, next) => {
  try {
    req.data = await getAllOrders();
    next();
  } catch (error) {
    next({
      name: 'OrderFetchError',
      message: 'The request to fetch all orders could not be completed'
    });
  }
});

// ***
// GET /api/orders/history
// Sends current users order history
router.get('/history', async (req, res, next) => {
  const {id: userId} = req.user;
  try {
    req.data = await getOrdersByUserId(userId);
    next();
  } catch (error) {
    next({
      name: 'OrderHistoryFetchError',
      message: 'The users order history was not received'
    });
  }
});

// ***
// GET /api/orders/carts
// Sends current users carts
router.get('/carts', async (req, res, next) => {
  const {id: userId} = req.user;
  try {
    req.data = await getCartsByUserId(userId);
    next();
  } catch (error) {
    next({
      name: 'CartFetchError',
      message: 'The users cart was not received'
    });
  }
});

// ***
// POST /api/orders/item
// Adds item to current users cart
router.post('/item', async (req, res, next) => {
  const orderProductData = req.body;
  const {productId} = req.body;
  const {id: userId} = req.user;
  try {
    await createOrderProduct(orderProductData);
    req.data = await getCartsByUserId(userId);
    next();
  } catch (error) {
    next({
      name: 'OrderItemCreationError',
      message: 'An item for this order was not able to be created'
    });
  }
});

// ***
// UPDATE /api/orders/item
// Updates order_product item
router.patch('/item', async (req, res, next) => {
  const orderProductData = req.body;
  const {id: userId} = req.user;
  try {
    await updateOrderProductsById(orderProductData);
    req.data = await getCartsByUserId(userId);
    next();
  } catch (error) {
    next({
      name: 'OrderItemUpdateError',
      message: 'An item for this order was not able to be updated'
    });
  }
});

// UPDATE /api/orders/carts
// Updates a cart to an order
router.patch('/carts', async (req, res, next) => {
  const {orderId} = req.body;
  const {id: userId} = req.user;
  try {
    await updateCartToOrderByOrderId(orderId);
    req.data = await getCartsByUserId(userId);
    next();
  } catch (error) {
    next({
      name: 'CartToOrderError',
      message: 'The cart was not able to be converted to an order'
    });
  }
});

// ***
// DELETE /api/carts/item
// Delete individual item from cart
router.delete('/item', async (req, res, next) => {
  const {itemId} = req.body;
  const {id: userId} = req.user;
  try {
    await deleteCartItemByCartId(itemId);
    req.data = await getCartByUserId(userId);
    next();
  } catch (error) {
    next({
      name: 'OrderItemDeleteError',
      message: 'An item for this order was not able to be deleted'
    });
  }
});

router.use(async (req, res, next) => {
  const ordersWithProducts = await _constructOrdersObjects(req.data);
  res.send(ordersWithProducts);
});

module.exports = router;
