const client = require('./client');

module.exports = {
  client,
  ...require('./users'),
  ...require('./products'),
  ...require('./photos'),
  ...require('./orders'),
  ...require('./order_products')
};
