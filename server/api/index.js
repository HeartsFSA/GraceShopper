const express = require('express')
const apiRouter = express.Router()
const jwt = require('jsonwebtoken')
const { JWT_SECRET = 'neverTell' } = process.env
const { getUserById } = require('../db')

/* Middlware to see if user is logged in already*/

// set `req.user` if possible
apiRouter.use(async (req, res, next) => {
  console.log('api router got hit')
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

apiRouter.use((req, res, next) => {
  if (req.user) {
    console.log('User is set:', req.user)
  }
  next()
})

apiRouter.get((req, res, next) => {
  console.log('api hit')
  res.send('api got hit')
})

// ROUTER: /api/users
const usersRouter = require('./users')
apiRouter.use('/users', usersRouter)

// ROUTER: /api/products
// const productsRouter = require('./products')

// ROUTER: /api/carts


// ------ ADD MORE ROUTES BELOW ------

module.exports = apiRouter
