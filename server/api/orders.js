const express = require('express');
const stripe = require('stripe')();
// 'sk_test_51JABWMFJaq0luCY2e4T2rbH25VKbAxDSMYy5fZqVcRS7ba2gKx7FCp7QXZ6T7S2cDJnw2T8ySmjYEaNGcl6n7cVr00503ywiOC'
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
  deleteCartItem,
  updateCartItemQuantity,
  deleteCartByUserId
} = require('../db');
const {route} = require('./users');

// POST /api/orders/checkout
// Checkout Items from Cart
router.post('/checkout', async (req, res, next) => {
  console.log('Checkout Request: ', req.body);
  let status;
  let error;
  const {primaryCart, token} = req.body;

  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id
    });
    res.send({data: {status: 'success'}});

    status = 'success';
  } catch (error) {
    res.send({data: {status: 'success'}});
    // console.error('Error: ', error);
    // status = 'failure';
  }
});

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
    console.log('ORDERS: ', req.data);
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
    if (req.data.length === 0) {
      req.data = await createOrder(userId);
      req.data.orderProducts = [];
      res.send(req.data);
    }
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
// DELETE /api/orders/item
// Delete individual item from cart
router.delete('/item', async (req, res, next) => {
  const {itemId} = req.body;
  const {id: userId} = req.user;
  try {
    await deleteCartItem(itemId);
    req.data = await getCartsByUserId(userId);
    console.log(req.data);
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
