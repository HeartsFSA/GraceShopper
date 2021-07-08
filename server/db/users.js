const client = require('./client');
const bcrypt = require('bcrypt');
const SALT_COUNT = 10;

// database functions

// user functions
async function createUser(newUser) {
  const hashedPassword = await bcrypt.hash(newUser.password, SALT_COUNT);
  newUser.password = hashedPassword;
  try {
    const {
      rows: [user]
    } = await client.query(
      `
      INSERT INTO users(${Object.keys(newUser).join()}) VALUES (${Object.keys(
        newUser
      )
        .map((_, idx) => `$${idx + 1}`)
        .join()})
      ON CONFLICT (username) DO NOTHING 
      RETURNING *;
    `,
      [...Object.values(newUser)]
    );
    delete user.password;
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
    console.log('password:', password, 'hashedPassword:', hashedPassword);
    console.log('passwords match?:', passwordsMatch);
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

async function updateUser(id, userInfo) {
  try {
    // if (userInfo.username) {
    //   await client.query(
    //     `
    //     UPDATE products
    //     SET creator_name=$1
    //     WHERE creator_name=$2
    //   `,
    //     [userInfo.username, oldUsername]
    //   );
    // }

    const {
      rows: [updatedUser]
    } = await client.query(
      `
      UPDATE users
      SET ${Object.keys(userInfo)
        .map((val, idx) => `${val}=$${idx + 1}`)
        .join()}
      WHERE id=${id}
      RETURNING *;
    `,
      Object.values(userInfo)
    );

    return updatedUser;
  } catch (error) {
    console.error('thrown from db/updateUser:');
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
  updateUser
};
