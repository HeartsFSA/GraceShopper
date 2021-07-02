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

async function getOrdersByUserId(userId) {
  try {
    const {rows: orders} = await client.query(
      `
            SELECT * 
            FROM orders
            WHERE "userId"=$1
        `,
      [userId]
    )
    return orders
  } catch (error) {
    throw error
  }
}

module.exports = {
  createOrder,
  getOrdersByUserId
}
