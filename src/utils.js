import axios from 'axios'

function setHeaders() {
  let token = localStorage.getItem('token')
  let config = token
    ? {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    : {}
  return config
}

function setToken(token) {
  localStorage.setItem('token', token)
}

/**
 * If logged on returns user data and json web token.  If not logged on, an error will be thrown
 * And no data will be returned
 *
 * @returns {
 *      user: {
 *          username: String,
 *          password: String
 *      },
 *      token: JSonWebToken
 *  }
 */
export async function checkLogin() {
  try {
    console.log("in checkLogin")
    let { data } = await axios.get('/api/users/me', setHeaders())
    // if data has an id and user the user is logged on
    return data
  } catch (err) {
    console.log('checkLogin(): User is not logged on.\n', err)
    return err
  }
}

/**
 *  Login
 *
 *  @param username - Name of the user
 *  @param password - Users' password
 *
 *  @returns {
 *      user: {
 *          username: String,
 *          password: String
 *      },
 *      token: JSonWebToken
 *  }
 */
export async function login(username, password) {
  try {
    const { data } = await axios.post('/api/users/login', {
      username,
      password,
    })
    if (data.token) {
      setToken(data.token)
    }
    return data
  } catch (err) {
    console.error('login(): Unable to login.\n', err)
    // returns error to be handled.
    return err
  }
}

/**
 *  Register
 *
 *  @param username - Name of the user
 *  @param password - Users' password
 *
 *  @returns {
 *      user: {
 *          username: String,
 *          password: String
 *      },
 *      token: JSonWebToken
 *  }
 */
export async function register(username, password) {
  try {
    const { data } = await axios.post('/api/users/register', {
      username,
      password,
    })
    if (data.token) {
      setToken(data.token)
    }
    return data
  } catch (err) {
    console.error('register(): Unable to register user.\n', err)
    // returns error to be handled
    return err
  }
}

/* PRODUCT FUNCTIONS */
export async function getAllProducts() {
  try {
    const {data} = await axios.get('/api/products/all')
    return data
  } catch (err) {
    console.error('getAllProducts(): Unable to get all products.\n', err)
    return err
  }
}

export async function getProductBy(col, val) {
  try {
    const {data} = await axios.get(`/api/products/${col}/${val}`)
    return data;
  } catch (error) {
    console.error("getProductBy(): Unable to get product.\n", error);
    return error;
  }
}

export async function createProduct(product) {
  try {
    const {data} = await axios.post('/api/products',
      product
    );
    return data;
  } catch (error) {
    console.error("createProduct(): Unable to create product.\n", error);
    return error;
  }
}

export async function updateProduct(id, productInfo) {
  try {
    const {data} = await axios.patch(`/${id}`,
      productInfo
    );
    return data;
  } catch (error) {
    console.error("updateProduct(): Unable to update product.\n", error);
    return error;
  }
}

export async function deleteProduct(id) {
  try {
    const {data} = await axios.delete(`/${id}`);
    return data;
  } catch (error) {
    console.error("deleteProduct(): Unable to delete product.\n", error);
    return error;
  }
}

/* SHOPPING CART FUNCTIONS */

export async function getShoppingCart() {
  try {
    const {data} = await axios.get('/api/carts/me', setHeaders())
    return data
  } catch (error) {
    return error
  }
}

export async function addCartItem(productId, userId, quantity) {
  let config = setHeaders()
  config.body = {
    "productId": productId,
    "userId": userId,
    "quantity": quantity
  }
  try {
    const {data} = await axios.post('/api/carts/item', config)
    return data
  } catch (error) {
    return error 
  }
}

export async function updateCartItemQuantity(itemId, quantity, method) {
  let config = setHeaders()
  config.body = {
    "itemId": itemId,
    "inputQuantity": quantity,
    "method": method
  }
  try {
    const {data} = await axios.patch('/api/carts/item', config)
    return data
  } catch (error) {
    return error
  }
}

export async function deleteShoppingCart() {
  try {
    const {data} = await axios.delete('/api/carts/me', setHeaders())
    return data
  } catch (error) {
    return error
  }
}

export async function deleteShoppingCartItem(itemId) {
  let config = setHeaders()
  config.body = {
    "itemId": itemId
  }
  try {
    const {data} = await axios.delete('/api/carts/item', config)
    return data 
  } catch (error) {
    return error
  }
}