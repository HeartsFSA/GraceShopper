const client = require('./client')

const {getProductBy} = require('./products')

async function createCartItem({productId, userId, quantity}) {
  try {
    let today = new Date()
    const {
      rows: [item]
    } = await client.query(
      `
            INSERT INTO carts("productId", "userId", quantity, dateAdded)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `,
      [productId, userId, quantity, today]
    )
    return item
  } catch (error) {
    throw error
  }
}

async function getCartItemById(itemId) {
  try {
    const {
      rows: [item]
    } = await client.query(
      `
            SELECT * 
            FROM carts
            WHERE id=$1
        `,
      [itemId]
    )
    return item
  } catch (error) {
    throw error
  }
}

/**
 *
 * @param {number} userId
 * @returns {Array.<{
 * id: number,
 * productId: number,
 * userId: number,
 * quantity: number,
 * dateadded: Date}>}
 */
async function getRawCartByUserId(userId) {
  try {
    const {rows: idCart} = await client.query(
      `
            SELECT *
            FROM carts
            WHERE "userId"=$1
        `,
      [userId]
    )

    return idCart
  } catch (error) {
    throw error
  }
}

/**
 *
 * @param {number} userId
 * @returns {Array.<{
 * id: number,
 * quantity: number,
 * dateadded: Date,
 * product: object,
 */
async function getCartByUserId(userId) {
  try {
    const idCart = await getRawCartByUserId(userId)

    const cart = await Promise.all(
      idCart.map(async (item) => {
        return {
          id: item.id,
          quantity: item.quantity,
          dateAdded: item.dateadded,
          product: await getProductBy('id', item.productId)
        }
      })
    )

    return cart
  } catch (error) {
    throw error
  }
}

async function updateCartItemQuantity(itemId, inputQuantity, method) {
  try {
    const {quantity} = await getCartItemById(itemId)
    let newQuantity = 0
    if (method === 'add') {
      newQuantity = quantity + inputQuantity
    } else if (method === 'sub') {
      newQuantity = quantity - inputQuantity
    } else {
      throw error
    }

    const {
      rows: [item]
    } = await client.query(
      `
            UPDATE carts
            SET quantity=$1
            WHERE id=$2
            RETURNING *
        `,
      [newQuantity, itemId]
    )
    return item
  } catch (error) {
    throw error
  }
}

async function _deleteCartItemBy(column, value) {
  try {
    const {rows: items} = await client.query(
      `
            DELETE FROM carts
            WHERE ${column}=$1
            RETURNING *
        `,
      [value]
    )
    return items
  } catch (error) {
    throw error
  }
}

/**
 *
 * @param {number} userId
 * @returns {Array.<{
 * id: number,
 * productId: number,
 * userId: number,
 * quantity: number,
 * dateadded: Date}>}
 */
async function deleteCartItemByCartId(cartId) {
  try {
    const item = await _deleteCartItemBy('id', cartId)
    return item
  } catch (error) {
    throw error
  }
}

/**
 *
 * @param {number} userId
 * @returns {Array.<{
 * id: number,
 * productId: number,
 * userId: number,
 * quantity: number,
 * dateadded: Date}>}
 */
async function deleteCartByProductId(productId) {
  try {
    const items = await _deleteCartItemBy('"productId"', productId)
    return items
  } catch (error) {
    throw error
  }
}

/**
 *
 * @param {number} userId
 * @returns {Array.<{
 * id: number,
 * productId: number,
 * userId: number,
 * quantity: number,
 * dateadded: Date}>}
 */
async function deleteCartByUserId(userId) {
  try {
    const items = await _deleteCartItemBy('"userId"', userId)
    return items
  } catch (error) {
    throw error
  }
}

module.exports = {
  createCartItem,
  getRawCartByUserId,
  getCartByUserId,
  updateCartItemQuantity,
  deleteCartItemByCartId,
  deleteCartByProductId,
  deleteCartByUserId
}
