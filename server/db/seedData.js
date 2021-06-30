// require in the database adapter functions as you write them (createUser, createActivity...)
const { createUser } = require('./')
const client = require('./client')

async function dropTables() {
  console.log('Dropping All Tables...')
  // drop all tables, in the correct order

  //  Add more tables as you need them
  try {
    await client.query(`
    DROP TABLE IF EXISTS users;
  `)
  } catch (error) {
    throw error
  }
}

async function createTables() {
  try {
    console.log('Starting to build tables...')
    // create all tables, in the correct order

    // User's Table
    await client.query(`
      CREATE TABLE users(
        id  SERIAL PRIMARY KEY, 
        username VARCHAR(255) UNIQUE NOT NULL, 
        password VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE,
        permission INT DEFAULT '1'
        
      );
    `)
        /* Account Permission
         0  Guest User (Extra parameter, in case need to use)
         1  Basic User (Default in most case)
         2  Seller / Vender Access
         3  Admin User
         4  Super Admin (Extra)
         */
        



    // Add tables as you need them (A good place to start is Products and Orders
    // You may also need an extra table that links products and orders together (HINT* Many-To-Many)

    console.log('Finished building tables!')
  } catch (error) {
    console.error('Error building tables!')
    throw error
  }
}

/* 
ADD DATA BELOW AS NEEDED. This is default seed data, and will help you start testing
*/

async function createInitialUsers() {
  console.log('Starting to create users...')
  try {
    const usersToCreate = [
      { username: 'albert', password: 'bertie99', email: 'albert@fullstack.com', account_permission: 0 },
      { username: 'sandra', password: 'sandra123', email: 'sandra@fullstack.com', account_permission: 0 },
      { username: 'glamgal', password: 'glamgal123', email: 'glamgal@fullstack.com', account_permission: 0 },
      {username: 'viral', password: 'FSAtest99', email: 'bhavsar.viral@outlook.com', account_permission: 4}
    ]
    const users = await Promise.all(usersToCreate.map(createUser))

    console.log('Users created:')
    console.log(users)
    console.log('Finished creating users!')
  } catch (error) {
    console.error('Error creating users!')
    throw error
  }
}

async function rebuildDB() {
  try {
    client.connect()
    await dropTables()
    await createTables()
    await createInitialUsers()

    // create other data
  } catch (error) {
    console.log('Error during rebuildDB')
    throw error
  }
}

module.exports = {
  rebuildDB,
}
