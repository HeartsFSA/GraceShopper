import axios from 'axios';

function setHeaders() {
  let token = localStorage.getItem('token');
  let config = token
    ? {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    : {};
  return config;
}

function setToken(token) {
  localStorage.setItem('token', token);
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
    console.log('in checkLogin');
    let {data} = await axios.get('/api/users/me', setHeaders());
    // if data has an id and user the user is logged on
    return data;
  } catch (err) {
    console.log('checkLogin(): User is not logged on.\n', err);
    return err;
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
    const {data} = await axios.post('/api/users/login', {
      username,
      password
    });
    if (data.token) {
      setToken(data.token);
    }
    return data;
  } catch (err) {
    console.error('login(): Unable to login.\n', err);
    // returns error to be handled.
    return err;
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
export async function register(username, password, email) {
  try {
    const {data} = await axios.post('/api/users/register', {
      username,
      password,
      email
    });
    if (data.token) {
      setToken(data.token);
    }
    return data;
  } catch (err) {
    console.error('register(): Unable to register user.\n', err);
    // returns error to be handled
    return err;
  }
}

export async function getUserByUsername(username) {
  try {
    const {data} = await axios.get(`/api/users/${username}`);
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}

/* PRODUCT FUNCTIONS */
export async function getAllProducts() {
  try {
    const {data} = await axios.get('/api/products/all');
    return data;
  } catch (err) {
    console.error(
      'utils.js: getAllProducts(): Unable to get all products.\n',
      err
    );
    return err;
  }
}

export async function getProductBy(col, val) {
  try {
    const {data} = await axios.get(`/api/products/${col}/${val}`);
    return data;
  } catch (error) {
    console.error('getProductBy(): Unable to get product.\n', error);
    return error;
  }
}

export async function createProduct(product) {
  console.log('UTILS Product: ', product);
  try {
    const {data} = await axios.post('/api/products/', product);
    return data;
  } catch (error) {
    console.error('createProduct(): Unable to create product.\n', error);
    return error;
  }
}

export async function updateProduct(id, productInfo) {
  console.log('Product ID: ', id);
  console.log('Product: ', productInfo);
  try {
    const {data} = await axios.patch(
      `/api/products/${id}`,
      productInfo,
      setHeaders()
    );
    return data;
  } catch (error) {
    console.error('updateProduct(): Unable to update product.\n', error);
    return error;
  }
}

export async function deleteProduct(id) {
  try {
    const {data} = await axios.delete(`/${id}`);
    return data;
  } catch (error) {
    console.error('deleteProduct(): Unable to delete product.\n', error);
    return error;
  }
}

/* SHOPPING CART FUNCTIONS */

export async function getShoppingCart() {
  try {
    const {data} = await axios.get('/api/orders/carts', setHeaders());
    console.log('Cart: ', data);
    return data;
  } catch (error) {
    return error;
  }
}

export async function addCartItem(productId, userId, quantity) {
  const config = {
    productId: productId,
    userId: userId,
    quantity: quantity
  };
  try {
    const {data} = await axios.post('/api/carts/item', config, setHeaders());
    return data;
  } catch (error) {
    return error;
  }
}

export async function updateCartItemQuantity(itemId, quantity, method) {
  const config = {
    itemId: itemId,
    inputQuantity: quantity,
    method: method
  };
  try {
    const {data} = await axios.patch('/api/carts/item', config, setHeaders());
    return data;
  } catch (error) {
    return error;
  }
}

export async function deleteShoppingCart() {
  try {
    const {data} = await axios.delete('/api/carts/me', setHeaders());
    return data;
  } catch (error) {
    return error;
  }
}

export async function deleteShoppingCartItem(itemId) {
  const config = {
    itemId: itemId
  };
  try {
    const {data} = await axios.delete('/api/carts/item', config, setHeaders());
    return data;
  } catch (error) {
    return error;
  }
}

/* ORDER HISTORY FUNCTIONS */

export async function getOrderHistory() {
  try {
    const {data} = await axios.get('/api/orders/history', setHeaders());
    console.log('Orders: ', data);
    return data;
  } catch (error) {
    return error;
  }
}

/* Check user function */

export async function checkUser(username) {
  try {
    const data = await axios.get('/api/users/check', {
      body: {
        username: username
      }
    });
    console.log('check users utitls ', data);
    return data;
  } catch (error) {
    return error;
  }
}
