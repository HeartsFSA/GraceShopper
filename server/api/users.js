const express = require('express');
const usersRouter = express.Router();
const jwt = require('jsonwebtoken');
<<<<<<< HEAD
const {createUser, getUser, getUserByUsername, getUserById} = require('../db');
=======
const {
  createUser,
  getUser,
  getUserByUsername,
  getUserById,
  checkUser
} = require('../db');
>>>>>>> acb7372dd1da913f143d5e362abf4354779deeea
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
<<<<<<< HEAD
      message: 'Please supply both a username and password'
=======
      message: 'Please supply both a username and password',
      status: 400
>>>>>>> acb7372dd1da913f143d5e362abf4354779deeea
    });
  }

  try {
    const user = await getUser({username, password});
    console.log(user);
    if (!user) {
      next({
        name: 'IncorrectCredentialsError',
<<<<<<< HEAD
        message: 'Username or password is incorrect'
=======
        message: 'Username or password is incorrect',
        status: 400
>>>>>>> acb7372dd1da913f143d5e362abf4354779deeea
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
<<<<<<< HEAD
    const {username, password} = req.body;
=======
    const {username, password, email} = req.body;
>>>>>>> acb7372dd1da913f143d5e362abf4354779deeea
    const queriedUser = await getUserByUsername(username);
    if (queriedUser) {
      res.status(401);
      next({
        name: 'UserExistsError',
<<<<<<< HEAD
        message: 'A user by that username already exists'
=======
        message: 'A user by that username already exists',
        status: 409
>>>>>>> acb7372dd1da913f143d5e362abf4354779deeea
      });
    } else {
      // Add email and permission later
      const user = await createUser({
        username,
<<<<<<< HEAD
        password
=======
        password,
        email
>>>>>>> acb7372dd1da913f143d5e362abf4354779deeea
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

<<<<<<< HEAD
// GET /api/users/:username
usersRouter.get('/:username', async (req, res, next) => {
  try {
    let returnUser = await getUserByUsername(req.params.username);
    if (!returnUser) {
      next({
        name: 'Error retrieving user',
        message: `Could not find user with the username ${req.params.username}`,
        status: 404
      });
    } else {
      res.send(returnUser);
    }
  } catch (error) {
    next({
      name: 'Error getting user',
      message: 'Internal server error',
      status: 500
    });
  }
});
=======
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
>>>>>>> acb7372dd1da913f143d5e362abf4354779deeea

// --------- ADD ADDITONAL USER ROUTES AS NEEDED ---------
module.exports = usersRouter;
