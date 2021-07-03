const client = require('./client')

async function createOrder(userId) {
  try {
    const {
      rows: [order]
    } = await client.query(
      `
            INSERT INTO orders("userId")
            VALUES ($1)
            RETURNING *
        `,
      [userId]
    )
    return order
  } catch (error) {
    throw error
  }
}

/**
 * 
 * @param {number} userId 
 * @returns {Array.<{
 * id: number,
 * userId: number,
 * status: number,
 * datePurchased: Date}>}
 */
async function _getOrdersBy(valueObject) {
  const valueString = Object.keys(valueObject).map((key, idx) => {
    return `${key}=$${idx + 1}`
  }).join(' AND ')

  try {
    const {rows: orders} = await client.query(
      `
            SELECT * 
            FROM orders
            WHERE ${valueString}
        `,
      Object.values(valueObject)
    )
    return orders 
  } catch (error) {
    throw error
  }
}

/**
 * 
 * @param {number} userId 
 * @returns {Array.<{
 * id: number,
 * userId: number,
 * status: number,
 * datePurchased: Date}>}
 */
async function getOrdersByUserId(userId) {
  try {
    const orders = await _getOrdersBy({'"userId"': userId, 'status': 1})
    return orders
  } catch (error) {
    throw error
  }
}

/**
 * 
 * @param {number} userId 
 * @returns {Array.<{
 * id: number,
 * userId: number,
 * status: number,
 * datePurchased: Date}>}
 */
async function getCartsByUserId(userId) {
  try {
    const carts = await _getOrdersBy({'"userId"': userId, 'status': 0})
    return carts
  } catch (error) {
    throw error
  }
}

async function updateCartToOrderByOrderId(orderId) {
  try {
    const today = new Date()
    const {
      rows: [order]
    } = await client.query(`
      UPDATE orders
      SET status=1, datePurchased=$1
      WHERE id=$2
    `, [today, orderId])
    return order
  } catch (error) {
    throw error
  }
}

module.exports = {
  createOrder,
  getOrdersByUserId,
  getCartsByUserId,
  updateCartToOrderByOrderId
}
