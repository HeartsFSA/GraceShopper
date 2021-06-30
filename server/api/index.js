const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const { JWT_SECRET = 'neverTell' } = process.env
const { getUserById } = require('../db')

/* Middlware to see if user is logged in already*/

// set `req.user` if possible
router.use(async (req, res, next) => {
  const prefix = 'Bearer '
  const auth = req.header('Authorization')
  if (!auth) {
    // nothing to see here
    next()
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length)

    try {
      const parsedToken = jwt.verify(token, JWT_SECRET)

      const id = parsedToken && parsedToken.id
      if (id) {
        req.user = await getUserById(id)
        next()
      }
    } catch (error) {
      next(error)
    }
  } else {
    next({
      name: 'AuthorizationHeaderError',
      message: `Authorization token must start with ${prefix}`,
    })
  }
})

router.use((req, res, next) => {
  if (req.user) {
    console.log('User is set:', req.user)
  }
  next()
})

// ROUTER: /api/users
const usersRouter = require('./users')
router.use('/users', usersRouter)

// ROUTER: /api/products
// const productsRouter = require('./products')

// ROUTER: /api/carts


// ------ ADD MORE ROUTES BELOW ------

module.exports = router
