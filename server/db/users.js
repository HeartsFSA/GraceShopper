const client = require('./client');
const bcrypt = require('bcrypt');
const SALT_COUNT = 10;

// database functions

// user functions
async function createUser({username, password, email, permission}) {
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  try {
    const {
      rows: [user]
    } = await client.query(
      `
      INSERT INTO users(username, password, email, permission) VALUES ($1, $2, $3, $4)
      ON CONFLICT (username) DO NOTHING 
      RETURNING id, username
    `,
      [username, hashedPassword, email, permission]
    );
    return user;
  } catch (error) {
    throw error;
  }
}

async function getAllUsers() {
  try {
    const {rows: users} = await client.query(`
      SELECT *
      FROM users
    `);
    return users;
  } catch (error) {
    throw error;
  }
}

async function getUser({username, password}) {
  if (!username || !password) {
    return;
  }

  try {
    const {
      rows: [user]
    } = await client.query(
      `
      SELECT *
      FROM users
      WHERE username = $1;
    `,
      [username]
    );

    if (!user) return;
    const hashedPassword = user.password;
    const passwordsMatch = await bcrypt.compare(password, hashedPassword);
    if (!passwordsMatch) return;
    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserByUsername(userName) {
  // first get the user
  try {
    const {
      rows: [user]
    } = await client.query(
      `
      SELECT *
      FROM users
      WHERE username = $1;
    `,
      [userName]
    );
    // if it doesn't exist, return null
    if (!user) return null;
    console.log('getting user', user, 'from db/users.js');
    // if it does:
    // delete the 'password' key from the returned object
    delete user.password;
    return user;
  } catch (error) {
    console.error(error);
  }
}

async function getUserById(userId) {
  // first get the user
  try {
    const {rows} = await client.query(
      `
      SELECT *
      FROM users
      WHERE id = $1;
    `,
      [userId]
    );
    // if it doesn't exist, return null
    if (!rows || !rows.length) return null;
    // if it does:
    // delete the 'password' key from the returned object
    const [user] = rows;
    // delete user.password;
    return user;
  } catch (error) {
    console.error(error);
  }
}

async function checkUser(userName) {
  // first get the user
  try {
    const {rows} = await client.query(
      `
      SELECT username, id
      FROM users
      WHERE username = $1;
    `,
      [userName]
    );
    // if it doesn't exist, return null
    if (!rows || !rows.length) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.error(error);
  }
}

async function updatePassword({username, password}) {
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);

  try {
    const {
      rows: [user]
    } = await client.query(
      `
      INSERT INTO users(username, password) VALUES ($1, $2)
      ON CONFLICT (username) DO NOTHING 
      RETURNING id, username
    `,
      [username, hashedPassword]
    );
    return user;
  } catch (error) {
    throw error;
  }
}

async function updateEmail({username, email}) {
  try {
    const {
      rows: [user]
    } = await client.query(
      `
      INSERT INTO users(username, email) VALUES ($1, $2)
      ON CONFLICT (username) DO NOTHING 
      RETURNING id, username
    `,
      [username, email]
    );
    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createUser,
  getAllUsers,
  getUser,
  getUserById,
  getUserByUsername,
  checkUser,
  updatePassword,
  updateEmail
};
