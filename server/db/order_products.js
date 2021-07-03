const client = require('./client')

/**
 * 
 * @param {object} param0 
 * @returns {<{
 * id: number,
 * productId: number,
 * orderId: number,
 * quantity: number,
 * totalPrice: 'money',
 * dateAdded: Date}>}
 */
async function createOrderProduct({orderId, productId, quantity, totalPrice}) {
  const today = new Date()
  try {
    const {
      rows: [product]
    } = await client.query(
      `
            INSERT INTO order_products("orderId", "productId", quantity, totalPrice, dateAdded)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
        `,
      [orderId, productId, quantity, totalPrice, today]
    )
    return product
  } catch (error) {
    throw error
  }
}

async function _getOrderProductsBy(column, value) {
  try {
    const {rows} = await client.query(
      `
            SELECT * 
            FROM order_products
            WHERE ${column}=$1
        `,
      [value]
    )
    return rows
  } catch (error) {
    throw error
  }
}

async function getOrderProductsByOrderId(orderId) {
  try {
    const products = await _getOrderProductsBy('"orderId"', orderId)
    return products
  } catch (error) {
    throw error
  }
}

async function updateOrderProductsById({orderProductId, quantity, totalPrice}) {
  try {
    const {
      rows: [orderProduct]
    } = await client.query(`
      UPDATE order_products
      SET quantity=$1, totalPrice=$2
      WHERE id=$3
      RETURNING *
    `, [quantity, totalPrice, orderProductId])
    return orderProduct
  } catch (error) {
    throw error
  }
}

module.exports = {
  createOrderProduct,
  getOrderProductsByOrderId,
  updateOrderProductsById
}
