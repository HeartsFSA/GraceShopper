const client = require('./client')

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

module.exports = {
  createOrderProduct
}
