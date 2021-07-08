const express = require('express');
const usersRouter = express.Router();
const jwt = require('jsonwebtoken');
const {
  createUser,
  getUser,
  getUserByUsername,
  getUserById,
  checkUser,

  createSeller,

  updateUser

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
  console.log('username received:', username);
  console.log('password received:', password);

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
        message: "hmmmm.... that didn't feel right... please try again...",
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
    const {username, password, email, displayname} = req.body;
    const queriedUser = await getUserByUsername(username);
    if (queriedUser) {
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
        email,
        displayname
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

usersRouter.patch('/:id', async (req, res, next) => {
  try {
    // if (req.user.id !== req.params.id) {
    //   next({
    //     name: 'Authorization error',
    //     message: 'Error: you do not have authorization to update the user',
    //     status: 401
    //   });
    // }

    let returnUser = await updateUser(req.params.id, req.body);
    delete returnUser.password;

    res.send(returnUser);
  } catch (error) {
    console.error('req.body:', req.body);
    console.error(error);
    next({
      name: 'Error updating user',
      message: 'Error updating user information',
      status: 500
    });
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
usersRouter.post('/seller', async (req, res, next) => {
  try {
    const {username, password, email} = req.body;
    const queriedUser = await getUserByUsername(username);
    if (queriedUser) {
      next({
        name: 'UserExistsError',
        message: 'A user by that username already exists',
        status: 409
      });
    } else {
      // Add email and permission later
      const user = await createSeller({
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


module.exports = usersRouter;
