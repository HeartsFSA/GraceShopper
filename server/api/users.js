const express = require('express');
const usersRouter = express.Router();
const jwt = require('jsonwebtoken');
const {
  createUser,
  getUser,
  getUserByUsername,
  getAllUsers,
  getUserById,
  checkUser
} = require('../db');
const SALT_COUNT = 10;
const {JWT_SECRET = 'neverTell'} = process.env;

usersRouter.use((req, res, next) => {
  console.log('usersRouter is working');
  next();
});
// POST /api/users/login
usersRouter.post('/login', async (req, res, next) => {
  const {username, password} = req.body;

  // request must have both
  if (!username || !password) {
    next({
      name: 'MissingCredentialsError',
      message: 'Please supply both a username and password',
      status: 400
    });
  }

  try {
    const user = await getUser({username, password});
    console.log(user);
    if (!user) {
      next({
        name: 'IncorrectCredentialsError',
        message: 'Username or password is incorrect',
        status: 400
      });
    } else {
      const token = jwt.sign(
        {id: user.id, username: user.username},
        JWT_SECRET,
        {expiresIn: '1w'}
      );
      res.send({user, message: "you're logged in!", token});
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// POST /api/users/register
usersRouter.post('/register', async (req, res, next) => {
  try {
    const {username, password, email} = req.body;
    const queriedUser = await getUserByUsername(username);
    if (queriedUser) {
      res.status(401);
      next({
        name: 'UserExistsError',
        message: 'A user by that username already exists',
        status: 409
      });
    } else {
      // Add email and permission later
      const user = await createUser({
        username,
        password,
        email
      });
      if (!user) {
        next({
          name: 'UserCreationError',
          message: 'There was a problem registering you. Please try again.'
        });
      } else {
        const token = jwt.sign(
          {id: user.id, username: user.username},
          JWT_SECRET,
          {expiresIn: '1w'}
        );
        res.send({user, message: "you're signed up!", token});
      }
    }
  } catch (error) {
    next(error);
  }
});

// GET /api/users/me
usersRouter.get('/me', (req, res, next) => {
  try {
    res.send(req.user);
  } catch (error) {
    next(error);
  }
});

// GET /api/users/
usersRouter.get('/', async (req, res, next) => {
  console.log('USER: ', req.user);
  try {
    res.send(await getAllUsers());
  } catch (error) {
    next(error);
  }
});

// ** Disabled for security **
// usersRouter.get('/check', async (req, res, next) => {
//   const {username} = req.body;
//   try {
//     const check = await checkUser(username);
//     res.send(check);
//   } catch (error) {
//     next(error);
//   }
// });

// --------- ADD ADDITONAL USER ROUTES AS NEEDED ---------
module.exports = usersRouter;
