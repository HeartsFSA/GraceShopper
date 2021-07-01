// require in the database adapter functions as you write them (createUser, createActivity...)
const { createUser } = require('./')
const {
  getAllUsers,
  createCartItem,
  getRawCartByUserId,
  getCartByUserId,
  deleteCartItemByCartId,
  deleteCartByUserId,
  deleteCartByProductId,
  createProduct,
  getProductBy,
  getAllProducts,
  createPhotos
} = require('./')
const client = require('./client')

async function dropTables() {
  console.log('Dropping All Tables...')
  // drop all tables, in the correct order

  //  Add more tables as you need them
  try {
    await client.query(`

    DROP TABLE IF EXISTS photos;

    DROP TABLE IF EXISTS carts;

    DROP TABLE IF EXISTS products;
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
        permission INT DEFAULT 1
        
      );

      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        description VARCHAR(1023) UNIQUE NOT NULL,
        price MONEY NOT NULL,
        hours VARCHAR(255),
        datesOpen VARCHAR(255),
        location VARCHAR(255) NOT NULL,
        category VARCHAR(255),
        creatorName VARCHAR(255) REFERENCES users(username) NOT NULL
      );


      CREATE TABLE photos (
        photo_id SERIAL PRIMARY KEY,
        product_id INTEGER REFERENCES products(id),
        photo_url VARCHAR(255),
        rel_path VARCHAR(51)
        );



      CREATE TABLE carts (
        id SERIAL PRIMARY KEY,
        "productId" INTEGER,
        "userId" INTEGER,
        quantity INTEGER DEFAULT 1,
        dateAdded DATE,
        FOREIGN KEY ("productId") REFERENCES products(id),
        FOREIGN KEY ("userId") REFERENCES users(id),
        CONSTRAINT id UNIQUE ("productId", "userId")
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
      { username: 'albert', password: 'bertie99', email: 'albert@fullstack.com', permission: 1 },
      { username: 'sandra', password: 'sandra123', email: 'sandra@fullstack.com', permission: 1 },
      { username: 'glamgal', password: 'glamgal123', email: 'glamgal@fullstack.com', permission: 1 },
      {username: 'viral', password: 'FSAtest99', email: 'bhavsar.viral@outlook.com', permission: 4},
      {username: "Hisshey's", password: 'totallynothersheys', email: 'hisshey@example.com', permission: 2},
      {username: 'SevenFlags', password: 'totallynotsixflags', email: 'sevenflags@example.com', permission: 2},
      {username: 'HowlCat', password: 'totallynotmeowwolf', email: 'howlcat@example.com', permission: 2}
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

async function createInitialProducts() {
  console.log("starting to create products...") 
  try {
    const productsToCreate = [
      {
        name: "Banana Land",
        description: "Banana fun!",
        price: "$56.99",
        location: "the moon",
        creatorName: "Hisshey's"
      },
      {
        name: "Seven Flags Mediocre America",
        description: "There will be more here later",
        price: "$69.99",
        location: "Chicago, IL",
        creatorName: "SevenFlags"
      },
      {
        name: "Seven Flags over Oklahoma",
        description: "The original Seven Flags park!",
        price: "$59.99",
        location: "Oklahoma City, OK",
        creatorName: "SevenFlags"
      },
      {
        name: "The House of Eventual Comeback",
        description: "A mind-bending, interactive, explorable art exhibit for all ages",
        price: "$9.99",
        location: "Santa Fe, NM",
        creatorName: "HowlCat"
      },
      {
        name: "Omicron Mart",
        description: "A mind-bending interactive art exhibit",
        price: "$9.99",
        location: "Las Vegas, NV",
        creatorName: "HowlCat"
      }
    ]

    console.log("products to Create:");
    console.log(productsToCreate)

    const products = await Promise.all(productsToCreate.map(createProduct));
    console.log("products created:")
    console.log(products);
    console.log("Finished creating products!")
  } catch (error) {
    console.error("Error creating products!");
    throw error;
  }
}

async function createInitialPhotos() {
  console.log("starting to create photos table...") 
  try {
    const photosToCreate = [
      {
        product_id: "2",
        photo_url: "https://placeimg.com/480/480/nature"
      },
      {
        product_id: "1",
        photo_url: "https://placeimg.com/480/480/nature"
      },
      {
        product_id: "1",
        photo_url: "https://placeimg.com/480/480/nature"
      },
      {
        product_id: "2",
        photo_url: "https://placeimg.com/480/480/nature"
      },
      {
        product_id: "1",
        photo_url: "https://placeimg.com/480/480/nature"
      },
      {
        product_id: "1",
        photo_url: "https://placeimg.com/480/480/nature"
      },
      {
        product_id: "2",
        photo_url: "https://placeimg.com/480/480/nature"
      },
      {
        product_id: "2",
        photo_url: "https://placeimg.com/480/480/nature"
      },
      {
        product_id: "1",
        photo_url: "https://placeimg.com/480/480/nature"
      },
      {
        product_id: "2",
        photo_url: "https://placeimg.com/480/480/nature"
      },
      {
        product_id: "1",
        photo_url: "https://placeimg.com/480/480/nature"
      },
      
    ]

    console.log("photos to Create:");
    console.log(photosToCreate)

    const photos = await Promise.all(photosToCreate.map(createPhotos));
    console.log("photos created:")
    console.log(photos);
    console.log("Finished creating photos!")
  } catch (error) {
    console.error("Error creating photos!");
    throw error;
  }
}

async function createInitialCarts() {
  console.log('Starting to create initial carts...')
  try {
    const users = await getAllUsers()
    const prods = await getAllProducts()

    const cartsToCreate = users.map((user) => {
      const prodId = Math.floor(Math.random() * prods.length) + 1
      const quantity = Math.floor(Math.random() * 5) + 1
      return {'productId': prodId, 'userId': user.id, 'quantity': quantity}
    })

    console.log('Carts to Create: ')
    console.log(cartsToCreate)

    const carts = await Promise.all(cartsToCreate.map(createCartItem))

    console.log('Carts created: ')
    console.log(carts)
  } catch (error) {
    console.error('Error creating carts!')
    throw error
  }
}

async function rebuildDB() {
  try {
    client.connect()
    await dropTables()
    await createTables()
    await createInitialUsers()
    await createInitialProducts()
    await createInitialPhotos()
    await createInitialCarts()
    

    // remove if not testing db calls
    await testDB();


    // create other data
  } catch (error) {
    console.log('Error during rebuildDB')
    throw error
  }
}

async function testDB() {

  console.log("getting product by id:");
  console.log(await getProductBy("id", 1));

  console.log("getting all products:")
  console.log(await getAllProducts());

  console.log('Getting raw carts by user id: ')
  console.log(await getRawCartByUserId(1))

  console.log('Getting carts by user id: ')
  console.log(await getCartByUserId(1))

  console.log('Deleting carts by product id: ')
  console.log(await deleteCartByProductId(1))
}

module.exports = {
  rebuildDB,
}
