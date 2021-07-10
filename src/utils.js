import axios from 'axios';

/* ---------------------------FRONT-END UTIL FUNCTIONS---------------------------- */

// Returns number of items in an order
/**
 * @description
 * Returns number of items in an order
 *
 * @example
 * getItemCountInOrder(orderObject) => 12
 *
 * @param {object} order
 * @returns {number}
 */
export function getItemCountInOrder(order) {
  if (order && order.orderProducts.length > 0) {
    const count = order.orderProducts
      .map((orderProduct) => orderProduct.quantity)
      .reduce((acc, cv) => acc + cv);
    return count;
  } else {
    return 0;
  }
}

/**
 * @description
 * Returns order status text for corresponding order status code
 *
 * @example
 * getStatusText(0) => 'Primary Cart'
 *
 * @param {number} code
 * @returns {string}
 */
export function getStatusText(code) {
  const orderStatusTable = {
    0: 'Primary Cart',
    1: 'Pending Cart',
    2: 'Pending Order',
    3: 'Shipped Order'
  };

  return orderStatusTable[code];
}

export function getUserTypeText(code) {
  const userTypeTable = {
    0: 'Guest',
    1: 'Member',
    2: 'Vendor',
    3: 'Admin',
    4: 'Super Admin'
  };

  return userTypeTable[code];
}

export function getCartsByUser(user, orders) {
  return orders.filter((order) => order.userId === user.id && order.status < 2);
}

export function getOrdersByUser(user, orders) {
  return orders.filter((order) => order.userId === user.id && order.status > 2);
}

export function getTotalValueByUser(user, orders) {
  if (orders.length === 0) {
    return 0;
  }
  return orders.map(getOrderTotalPrice).reduce((acc, cv) => acc + cv);
}

/**
 * @description
 * Returns total price for an individual order object
 *
 * @example
 * getOrderTotalPrice(order) => 200.21
 *
 * @param {object} order
 * @returns {number}
 */
export function getOrderTotalPrice(order) {
  const totalPrice = order.orderProducts
    .map((orderProduct) => parseFloat(getOrderProductTotalPrice(orderProduct)))
    .reduce((acc, cv) => acc + cv);
  return totalPrice;
}

/**
 * @description
 * Returns total price for an individual orderProduct object (quantity * product price)
 *
 * @example
 * getOrderProductTotalPrice(orderProduct) => 39.96
 *
 * @param {object} orderProduct
 * @returns number
 */
export function getOrderProductTotalPrice(orderProduct) {
  const productPrice = orderProduct.product.price;
  const quantity = orderProduct.quantity;
  return parseFloat(quantity * productPrice.slice(1, productPrice.length));
}

export function _createLocalOrderProductObj(quantity, totalPrice, product) {
  return {
    id: null,
    productId: product.id,
    orderId: null,
    quantity: quantity,
    totalPrice: totalPrice,
    dateadded: new Date(),
    product: product
  };
}

export function _updateLocalOrderProductObj() {}

// export function addLocalOrderProduct(cart, quantity, totalPrice, product) {
//   let localCart = {...cart}
//   const opExists = localCart.orderProducts.length > 0
//   const foundOP = localCart.orderProducts.find((op) => op.productId === product.id)
//   if(opExists && foundOP) {
//     _updateLocalOrderProductObj()
//   } else {
//     localCart.orderProducts.push(_createLocalOrderProductObj())
//   }
//   setLocalCart(localCart)
//   return localCart
// }

export function setLocalCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function getLocalCart() {
  return JSON.parse(localStorage.getItem('cart'));
}

/* -----------------------------AXIOS/API FUNCTIONS------------------------------- */

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
    console.log('utlis', data);
    if (data.token) {
      setToken(data.token);
    }
    return data;
  } catch (err) {
    console.error('login(): Unable to login.\n', err.message);

    console.log('error message', err.message);

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
export async function register(username, password, email, displayname) {
  try {
    const {data} = await axios.post('/api/users/register', {
      username,
      password,
      email,
      displayname
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

/* USERS FUNCTIONS */

export async function getAllUsers() {
  try {
    const {data} = await axios.get('/api/users/', setHeaders());
    return data;
  } catch (error) {
    return error;
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

export async function updateUser(id, userInfo) {
  try {
    const {data} = await axios.patch(
      `/api/users/${id}`,
      userInfo,
      setHeaders()
    );
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}

/* PRODUCT FUNCTIONS */
export async function getAllProducts() {
  console.log('getAllProducts()');
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

/* ORDER FUNCTIONS */

export async function getAllOrders() {
  try {
    const {data} = await axios.get('/api/orders/');
    return data;
  } catch (error) {
    return error;
  }
}

export async function getShoppingCart() {
  try {
    const {data} = await axios.get('/api/orders/carts', setHeaders());
    return data;
  } catch (error) {
    return error;
  }
}

export async function addCartItem(orderId, productId, quantity, totalPrice) {
  const config = {
    orderId: orderId,
    productId: productId,
    quantity: quantity,
    totalPrice: totalPrice
  };
  try {
    const {data} = await axios.post('/api/orders/item', config, setHeaders());
    return data;
  } catch (error) {
    return error;
  }
}

export async function updateCartItemQuantity(itemId, quantity, totalPrice) {
  const config = {
    orderProductId: itemId,
    quantity: quantity,
    totalPrice: totalPrice
  };
  try {
    const {data} = await axios.patch('/api/orders/item', config, setHeaders());
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

export function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export async function regSeller(username, password, email) {
  try {
    const {data} = await axios.post('/api/users/seller', {
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
