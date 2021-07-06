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
      {username: "The Johnsonian", password: 'totallynotthesmithsonian', email: 'thejohnsonian@example.com', permission: 2},
      {username: 'Seven Flags', password: 'totallynotsixflags', email: 'sevenflags@example.com', permission: 2},
      {username: "Francis Johnson", password: 'totallynotfrancisjohnson', email:'fjohnson@example.com', permission: 2},
      {username: 'HowlCat', password: 'totallynotmeowwolf', email: 'howlcat@example.com', permission: 2},
      {username: 'Musee Du Leavre', password: 'totallynotmuseedulouvre', email: 'mdl@example.com', permission: 2},
      {username: 'State Hermit Museum', password: 'totallynottherussiangovernment', email: 'hermit@example.com', permission: 2},
      {username: 'Salivation Mountain', password: 'totallynotsalvationmountain', email: 'salmountain@example.com', permission: 2},
      {username: "Noah", password: 'totallynotnoah', email: 'noah@example.com', permission: 2}

    ]
    const users = await Promise.all(usersToCreate.map(createUser));

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
        name: "The Smallest Ball of Twine in Minnesota",
        description: "Come see the world-famous ball of twine!",
        price: "$2.99",
        location: "Darwin, MN",
        creatorName: "Francis Johnson"
      },
      {
        name: "The Leavre",
        description: "The world-famous art museum will absolutely, 100%, definitely make you want to stay!",
        price: "$59.99",
        location: "Paris, WI",
        creatorName: "Musee Du Leavre"
      },
      {
        name: "National Space and Air Museum",
        description: "Come see fabulous space and air, with none of those pesky rockets and stuff in the way!",
        price: "$0.00",
        location: "Washington, DC",
        creatorName: "The Johnsonian"
      },
      {
        name: "The Even Freer Gallery of Art",
        description: "This one is even more free than that other one!",
        price: "$5.99",
        location: "Washington, DC",
        creatorName: "The Johnsonian"
      },
      {
        name: "The National Going Postal Museum",
        description: "The museum of all things relating to violent outbursts of uncontrolled rage!  Fun for whole family!",
        price: "$0.00",
        location: "Washington, DC",
        creatorName: "The Johnsonian"
      },
      {
        name: "Seven Flags Mediocre America",
        description: "There will be more here later",
        price: "$69.99",
        location: "Chicago, IL",
        creatorName: "Seven Flags"
      },
      {
        name: "Seven Flags over Oklahoma",
        description: "The original Seven Flags park!",
        price: "$59.99",
        location: "Oklahoma City, OK",
        creatorName: "Seven Flags"
      },
      {
        name: "The State Hermit Museum",
        description: "The world-famous museum of hermits and everything hermit-related",
        price: "$0.75",
        location: "St Petersburg, FL",
        creatorName: "State Hermit Museum"
      },
      {
        name: "Noah's Ark",
        description: "No, not the waterpark, this is the real thing, so I suggest you get on real soon",
        price: "$0.00",
        location: "Lake Delton, WI",
        creatorName: "Noah"
      },
      {
        name: "Salivation Mountain",
        description: "A mouth-watering pile of every kind of food imaginable! We promise it hasn't spoiled in the desert sun!",
        price: "$9.99",
        location: "Niland, CA",
        creatorName: "Salivation Mountain"
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
}

module.exports = {
  rebuildDB,
}
