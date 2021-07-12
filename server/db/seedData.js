// require in the database adapter functions as you write them (createUser, createActivity...)
const {createUser} = require('./');
const {
  getAllUsers,
  createOrder,
  createOrderProduct,
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
} = require('./');
const client = require('./client');

async function dropTables() {
  console.log('Dropping All Tables...');
  // drop all tables, in the correct order

  //  Add more tables as you need them
  try {
    await client.query(`
    DROP TABLE IF EXISTS photos CASCADE;
    DROP TABLE IF EXISTS order_products CASCADE;
    DROP TABLE IF EXISTS orders CASCADE;
    DROP TABLE IF EXISTS products CASCADE;
    DROP TABLE IF EXISTS users CASCADE;
  `);
  } catch (error) {
    throw error;
  }
}

async function createTables() {
  try {
    console.log('Starting to build tables...');
    // create all tables, in the correct order

    console.log('Creating users table...');
    await client.query(`
      CREATE TABLE users(
        id  SERIAL PRIMARY KEY, 
        username VARCHAR(255) UNIQUE NOT NULL, 
        displayname VARCHAR(255),
        password VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE,
        permission INT DEFAULT 1
        
      );
      `);

    console.log('Creating products table...');
    await client.query(`
      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        description VARCHAR(1023) UNIQUE NOT NULL,
        price MONEY NOT NULL,
        hours VARCHAR(255),
        dates_open VARCHAR(255),
        location VARCHAR(255) NOT NULL,
        category VARCHAR(255),
        creator_name VARCHAR(255) REFERENCES users(username) NOT NULL,
        is_active BOOLEAN DEFAULT true
      );
      `);

    console.log('Creating photos table...');
    await client.query(`
      CREATE TABLE photos (
        photo_id SERIAL PRIMARY KEY,
        product_id INTEGER REFERENCES products(id),
        photo_url VARCHAR(255),
        rel_path VARCHAR(51)
      );
      `);

    console.log('Creating orders table...');
    await client.query(`
      CREATE TABLE orders (
        id SERIAL PRIMARY KEY,
        "userId" INTEGER NOT NULL,
        status INTEGER NOT NULL DEFAULT 0,
        datePurchased DATE DEFAULT NULL,
        subtotal DECIMAL(19,4),
        tax_rate DECIMAL(9,4),
        total DECIMAL(19,4),
        FOREIGN KEY ("userId") REFERENCES users(id)
      );
      `);

    console.log('Creating order_products table...');
    await client.query(`
      CREATE TABLE order_products (
        id SERIAL PRIMARY KEY,
        "productId" INTEGER NOT NULL,
        "orderId" INTEGER NOT NULL,
        quantity INTEGER NOT NULL DEFAULT 1,
        totalPrice MONEY NOT NULL DEFAULT 0,
        dateAdded DATE,
        FOREIGN KEY ("productId") REFERENCES products(id),
        FOREIGN KEY ("orderId") REFERENCES orders(id),
        CONSTRAINT po_id UNIQUE ("productId", "orderId")
      );
      `);

    /* Account Permission
         0  Guest User (Extra parameter, in case need to use)
         1  Basic User (Default in most case)
         2  Seller / Vender Access
         3  Admin User
         4  Super Admin (Extra)
         */

    /* Orders Table Status Codes
         0 Primary Cart
         1 Pending Cart
         2 Pending Order
         3 Shipped Order
         */

    // Add tables as you need them (A good place to start is Products and Orders
    // You may also need an extra table that links products and orders together (HINT* Many-To-Many)

    console.log('Finished building tables!');
  } catch (error) {
    console.error('Error building tables!');
    throw error;
  }
}

/* 
ADD DATA BELOW AS NEEDED. This is default seed data, and will help you start testing
*/

async function createInitialUsers() {
  console.log('Starting to create users...');
  try {
    const usersToCreate = [
      {
        username: 'albert',
        password: 'bertie99',
        email: 'albert@fullstack.com',
        permission: 1
      },
      {
        username: 'sandra',
        password: 'sandra123',
        email: 'sandra@fullstack.com',
        permission: 1
      },
      {
        username: 'glamgal',
        password: 'glamgal123',
        email: 'glamgal@fullstack.com',
        permission: 1
      },
      {
        username: 'viral',
        password: 'FSAtest99',
        email: 'bhavsar.viral@outlook.com',
        permission: 4
      },
      {
        username: 'mladouceur',
        password: 'testpass',
        email: 'michaelladouceurdev@gmail.com',
        permission: 4
      },
      {
        username: 'hissheys',
        displayname: "Hisshey's",
        password: 'totallynothersheys',
        email: 'hisshey@example.com',
        permission: 2
      },
      {
        username: 'the_johnsonian',
        displayname: 'The Johnsonian',
        password: 'totallynotthesmithsonian',
        email: 'thejohnsonian@example.com',
        permission: 2
      },
      {
        username: '7flags',
        displayname: 'Seven Flags',
        password: 'totallynotsixflags',
        email: 'sevenflags@example.com',
        permission: 2
      },
      {
        username: 'frankj',
        displayname: 'Frank Johnson',
        password: 'totallynotfrancisjohnson',
        email: 'fjohnson@example.com',
        permission: 2
      },
      {
        username: 'howlcat',
        displayname: 'HowlCat',
        password: 'totallynotmeowwolf',
        email: 'howlcat@example.com',
        permission: 2
      },
      {
        username: 'museeduleavre',
        displayname: 'Musee Du Leavre',
        password: 'totallynotmuseedulouvre',
        email: 'mdl@example.com',
        permission: 2
      },
      {
        username: 'statehermitmuseum',
        displayname: 'State Hermit Museum',
        password: 'totallynottherussiangovernment',
        email: 'hermit@example.com',
        permission: 2
      },
      {
        username: 'saliv_mount',
        displayname: 'Salivation Mountain',
        password: 'totallynotsalvationmountain',
        email: 'salmountain@example.com',
        permission: 2
      },
      {
        username: 'noah',
        displayname: 'Noah',
        password: 'totallynotnoah',
        email: 'noah@example.com',
        permission: 2
      },
      {
        username: 'dracula',
        displayname: 'Dracula',
        password: 'countdraculahaha',
        email: 'dracula@example.com',
        permission: 2
      },
      {
        username: 'wrapp_&_wrapp',
        displayname: 'Wrapp & Wrapp',
        password: 'cornpalaceisgreat',
        email: 'cornpalacemuseum@example.com',
        permission: 2
      },
      {
        username: 'burning_dog',
        displayname: 'Burning Dog',
        password: 'burningdognotburningman',
        email: 'burningman@example.com',
        permission: 2
      },
      {
        username: 'frank_lloyd_wrong',
        displayname: 'Frank Lloyd Wrong',
        password: 'notfranklloydwrighthehe',
        email: 'franklloydwrong@example.com',
        permission: 2
      },
      {
        username: 'new_york_state',
        displayname: 'Notagra Falls',
        password: 'notniagrafallshehe',
        email: 'notniagrafalls@example.com',
        permission: 2
      },
      {
        username: 'ja_guideline',
        displayname: 'Ja_Guideline',
        password: 'itsjaguideline',
        email: 'jaguideline@example.com',
        permission: 2
      }
    ];
    const users = await Promise.all(usersToCreate.map(createUser));

    console.log('Users created:');
    console.log(users);
    console.log('Finished creating users!');
  } catch (error) {
    console.error('Error creating users!');
    throw error;
  }
}

async function createInitialProducts() {
  console.log('starting to create products...');
  try {
    const productsToCreate = [
      {
        name: 'Banana Land',
        description: 'Banana fun!',
        price: '$56.99',
        location: 'the moon',
        creator_name: 'hissheys'
      },
      {
        name: 'The Smallest Ball of Twine in Minnesota',
        description: 'Come see the world-famous ball of twine!',
        price: '$2.99',
        location: 'Darwin, MN',
        creator_name: 'frankj'
      },
      {
        name: 'The Leavre',
        description:
          'The world-famous art museum will absolutely, 100%, definitely make you want to stay!',
        price: '$59.99',
        location: 'Paris, WI',
        creator_name: 'museeduleavre'
      },
      {
        name: 'National Space and Air Museum',
        description:
          'Come see fabulous space and air, with none of those pesky rockets and stuff in the way!',
        price: '$0.00',
        location: 'Washington, DC',
        creator_name: 'the_johnsonian'
      },
      {
        name: 'The Even Freer Gallery of Art',
        description: 'This one is even more free than that other one!',
        price: '$5.99',
        location: 'Washington, DC',
        creator_name: 'the_johnsonian'
      },
      {
        name: 'The National Going Postal Museum',
        description:
          'The museum of all things relating to violent outbursts of uncontrolled rage!  Fun for whole family!',
        price: '$0.00',
        location: 'Washington, DC',
        creator_name: 'the_johnsonian'
      },
      {
        name: 'Seven Flags Mediocre America',
        description: 'There will be more here later',
        price: '$69.99',
        location: 'Chicago, IL',
        creator_name: '7flags'
      },
      {
        name: 'Seven Flags over Oklahoma',
        description: 'The original Seven Flags park!',
        price: '$59.99',
        location: 'Oklahoma City, OK',
        creator_name: '7flags'
      },
      {
        name: 'The State Hermit Museum',
        description:
          'The world-famous museum of hermits and everything hermit-related',
        price: '$0.75',
        location: 'St Petersburg, FL',
        creator_name: 'statehermitmuseum'
      },
      {
        name: "Noah's Ark",
        description:
          'No, not the waterpark, this is the real thing, so I suggest you get on real soon',
        price: '$0.00',
        location: 'Lake Delton, WI',
        creator_name: 'noah'
      },
      {
        name: 'Salivation Mountain',
        description:
          "A mouth-watering pile of every kind of food imaginable! We promise it hasn't spoiled in the desert sun!",
        price: '$9.99',
        location: 'Niland, CA',
        creator_name: 'saliv_mount'
      },
      {
        name: 'The House of Eventual Comeback',
        description:
          'A mind-bending, interactive, explorable art exhibit for all ages',
        price: '$9.99',
        location: 'Santa Fe, NM',
        creator_name: 'howlcat'
      },
      {
        name: 'Omicron Mart',
        description: 'A mind-bending interactive art exhibit',
        price: '$9.99',
        location: 'Las Vegas, NV',
        creator_name: 'howlcat'
      },
      {
        name: 'Draculas Castle',
        description:
          'Enjoy a weekend stay at one of the creepiest castles in the world. The Dracula Castle has consistently frightened and amazed the human subjects that stay there.',
        price: '$4495.00',
        location: 'Transylvania',
        creator_name: 'dracula'
      },
      {
        name: 'Corn Palace',
        description:
          'Stop by the palace that simultaneously will amaze and bore you!',
        price: '$14.00',
        location: 'Mitchell, SD',
        creator_name: 'wrapp_&_wrapp'
      },
      {
        name: 'Burning Dog',
        description:
          'A celebration of freedom, culminating in the burning of the dog statue made of wood',
        price: '$19472.32',
        location: 'Somewhere, NV',
        creator_name: 'burning_dog'
      },
      {
        name: 'Frank Lloyd Wrong Architecture Tour',
        description:
          'A tour of the works of the renowned architect Frank Lloyd Wrong, such as Standing Water and the Hanna-Honeybrush House',
        price: '$115.00',
        location: 'Oak Park, IL',
        creator_name: 'frank_lloyd_wrong'
      },
      {
        name: 'Notagra Falls',
        description: 'More of a trickle than a river',
        price: '$42.00',
        location: 'Niagara, NY',
        creator_name: 'new_york_state'
      },
      {
        name: 'Watyr Festival',
        description:
          'Festival on the water, open to all!  This will be the greatest festival of all time, with no problems whatsoever!',
        price: '$1313.13',
        location: 'Bahamas',
        creator_name: 'ja_guideline'
      }
    ];

    console.log('products to Create:');
    console.log(productsToCreate);

    const products = await Promise.all(productsToCreate.map(createProduct));
    console.log('products created:');
    console.log(products);
    console.log('Finished creating products!');
  } catch (error) {
    console.error('Error creating products!');
    throw error;
  }
}

async function createInitialPhotos() {
  console.log('starting to create photos table...');

  try {
    const photosToCreate = [
      {
        product_id: '1',
        photo_url:
          'https://images.unsplash.com/photo-1617609026795-91a36f12cb53?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80'
      },
      {
        product_id: '1',
        photo_url:
          'https://images.unsplash.com/photo-1603012948341-3ba25e139d83?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1355&q=80'
      },
      {
        product_id: '1',
        photo_url:
          'https://images.unsplash.com/photo-1558724109-b3007f0fbf7f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
      },
      {
        product_id: '1',
        photo_url:
          'https://images.unsplash.com/photo-1611223426643-fa293cb2efbc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
      },
      {
        product_id: '1',
        photo_url:
          'https://images.unsplash.com/photo-1563881087619-238484dd283c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
      },
      {
        product_id: '2',
        photo_url:
          'https://images.unsplash.com/photo-1594352161389-11756265d1b5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80'
      },
      {
        product_id: '2',
        photo_url:
          'https://images.unsplash.com/photo-1524516892385-b78812fcf4a4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1951&q=80'
      },
      {
        product_id: '3',
        photo_url:
          'https://images.unsplash.com/photo-1613757874090-456665221c00?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=802&q=80'
      },
      {
        product_id: '3',
        photo_url:
          'https://www.seekpng.com/png/detail/198-1984147_pythagoras-theorem-in-3d-shapes-pythagorean-theorem-3d.png'
      },
      {
        product_id: '4',
        photo_url:
          'https://images.unsplash.com/photo-1582513166998-56ed1ea02d13?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1789&q=80'
      },
      {
        product_id: '4',
        photo_url:
          'https://images.unsplash.com/photo-1551412827-ef3f9c31e62f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80'
      },
      {
        product_id: '5',
        photo_url:
          'https://images.unsplash.com/photo-1601272238150-d8db5fc0c4b6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
      },
      {
        product_id: '5',
        photo_url:
          'https://images.unsplash.com/photo-1624385830135-2d0f08132490?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1526&q=80'
      },
      {
        product_id: '5',
        photo_url:
          'https://images.unsplash.com/photo-1622287483085-5160a984e317?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3900&q=80'
      },
      {
        product_id: '6',
        photo_url:
          'https://images.unsplash.com/photo-1572725377459-c93a1980591a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
      },
      {
        product_id: '6',
        photo_url:
          'https://images.unsplash.com/photo-1544699748-bdfb8b2f3796?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=975&q=80'
      },
      {
        product_id: '7',
        photo_url:
          'https://images.unsplash.com/photo-1498940757830-82f7813bf178?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8ZnVufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
      },
      {
        product_id: '7',
        photo_url:
          'https://images.unsplash.com/photo-1460176449511-ff5fc8e64c35?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGZ1bnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
      },
      {
        product_id: '7',
        photo_url:
          'https://images.unsplash.com/photo-1531012451721-432c0ae74527?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fGZ1bnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
      },
      {
        product_id: '7',
        photo_url:
          'https://images.unsplash.com/photo-1464059728276-d877187d61a9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjJ8fGZ1bnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
      },
      {
        product_id: '8',
        photo_url:
          'https://images.unsplash.com/photo-1471116260918-e7a900488f12?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzV8fGZ1bnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
      },
      {
        product_id: '8',
        photo_url:
          'https://images.unsplash.com/photo-1509123825938-c6766eb401bf?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80'
      },
      {
        product_id: '8',
        photo_url:
          'https://images.unsplash.com/photo-1514891163508-4d0d04535922?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2300&q=80'
      },
      {
        product_id: '8',
        photo_url:
          'https://images.unsplash.com/photo-1609715637966-21cdbbb20bd9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2l4JTIwZmxhZ3MlMjBncmVhdCUyMGFkdmVudHVyZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=60'
      },
      {
        product_id: '9',
        photo_url:
          'https://images.unsplash.com/photo-1620517762957-3e4622447d9c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80'
      },
      {
        product_id: '9',
        photo_url:
          'https://images.unsplash.com/photo-1614454693286-c377fd417410?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=975&q=80'
      },
      {
        product_id: '10',
        photo_url:
          'https://images.unsplash.com/photo-1584376251243-bd18b19f8c27?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80'
      },
      {
        product_id: '10',
        photo_url:
          'https://images.unsplash.com/photo-1602444307048-952df9146135?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=734&q=80'
      },
      {
        product_id: '10',
        photo_url:
          'https://images.unsplash.com/photo-1616940013387-313ffaaf1136?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1494&q=80'
      },
      {
        product_id: '11',
        photo_url:
          'https://static.tvtropes.org/pmwiki/pub/images/mountain_of_food.jpg'
      },
      {
        product_id: '11',
        photo_url:
          'http://newsimg.bbc.co.uk/media/images/45155000/jpg/_45155275_1c7c560e-5703-49d5-b962-12af00876981.jpg'
      },
      {
        product_id: '11',
        photo_url:
          'https://images.unsplash.com/photo-1524932326868-56e1f1ede465?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
      },

      {
        product_id: '12',
        photo_url:
          'https://images.unsplash.com/photo-1572455658253-7e14e62862a3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
      },
      {
        product_id: '12',
        photo_url:
          'https://images.unsplash.com/photo-1437680041790-b7ed7b5a4950?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
      },
      {
        product_id: '12',
        photo_url:
          'https://images.unsplash.com/photo-1437680041790-b7ed7b5a4950?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
      },
      {
        product_id: '13',
        photo_url:
          'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=934&q=80'
      },
      {
        product_id: '13',
        photo_url:
          'https://images.unsplash.com/photo-1556767576-5ec41e3239ea?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80'
      },
      {
        product_id: '14',
        photo_url:
          'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=631&q=80'
      },
      {
        product_id: '14',
        photo_url:
          'https://images.unsplash.com/photo-1553434320-e9f5757140b1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=564&q=80'
      },
      {
        product_id: '14',
        photo_url:
          'https://images.unsplash.com/photo-1515356619894-b89131037e3d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
      },
      {
        product_id: '14',
        photo_url:
          'https://images.unsplash.com/photo-1432671431739-d0ba1dd6e3c7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80'
      },
      {
        product_id: '15',
        photo_url:
          'https://cornpalace.com/PhotoGallery/2/1954%20Corn%20Palace.jpg'
      },
      {
        product_id: '15',
        photo_url:
          'https://www.agweek.com/incoming/4905662-s6sorm-2509142050516.N.DR_.MURALS2.jpg/alternates/BASE_LANDSCAPE/2509142%2B050516.N.DR_.MURALS2.jpg'
      },
      {
        product_id: '15',
        photo_url:
          'https://www.mitchellrepublic.com/incoming/5027550-vuelmz-040420.N.DR.EMPTYPLACES10.JPG/alternates/BASE_LANDSCAPE/040420.N.DR.EMPTYPLACES10.JPG'
      },
      {
        product_id: '15',
        photo_url:
          'https://cornpalace.com/ImageRepository/Path?filePath=%2Fdocuments%5CIntranet%2FBackground2.jpg'
      },
      {
        product_id: '16',
        photo_url:
          'https://images.unsplash.com/photo-1536940385103-c729049165e6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=673&q=80'
      },
      {
        product_id: '16',
        photo_url:
          'https://images.unsplash.com/photo-1601949027928-7ec9f531d266?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1491&q=80'
      },
      {
        product_id: '17',
        photo_url:
          'https://images.unsplash.com/photo-1583437624797-0e3348843acd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=926&q=80'
      },
      {
        product_id: '17',
        photo_url:
          'https://images.unsplash.com/photo-1574011444639-de77ca245a68?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
      },
      {
        product_id: '17',
        photo_url:
          'https://images.unsplash.com/photo-1588854080664-923c2a272da0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
      },
      {
        product_id: '17',
        photo_url:
          'https://images.unsplash.com/photo-1518533856279-30b62c40cc30?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1028&q=80'
      },

      {
        product_id: '18',
        photo_url:
          'https://media-cdn.tripadvisor.com/media/photo-s/02/7d/5d/69/filename-img-50003005.jpg'
      },
      {
        product_id: '18',
        photo_url:
          'https://hgtvhome.sndimg.com/content/dam/images/grdn/fullset/2015/1/9/0/Original_orig-telkamp-water-feature.jpg.rend.hgtvcom.616.411.suffix/1452969690289.jpeg'
      },
      {
        product_id: '18',
        photo_url:
          'https://st.hzcdn.com/simgs/pictures/landscapes/backyard-renovation-in-ann-arbor-mi-poseidon-ponds-and-landscaping-img~855180b708543d59_14-9490-1-512101a.jpg'
      },
      {
        product_id: '19',
        photo_url:
          'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1504&q=80'
      },
      {
        product_id: '19',
        photo_url:
          'https://images.unsplash.com/photo-1519766030446-ae88fde27309?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1789&q=80'
      }
    ];

    console.log('photos to Create:');
    console.log(photosToCreate);

    const photos = await Promise.all(photosToCreate.map(createPhotos));
    console.log('photos created:');
    console.log(photos);
    console.log('Finished creating photos!');
  } catch (error) {
    console.error('Error creating photos!');
    throw error;
  }
}

async function createInitialOrders() {
  console.log('Starting to create initial carts...');
  try {
    const users = await getAllUsers();
    const prods = await getAllProducts();

    // const ordersToCreate = users.map((user) => {
    //   const prodId = Math.floor(Math.random() * prods.length) + 1
    //   const quantity = Math.floor(Math.random() * 5) + 1
    //   return {productId: prodId, userId: user.id, quantity: quantity}
    // })
    const ordersToCreate = users.map((user) => user.id);

    console.log('Users to create orders for: ');
    console.log(ordersToCreate);

    const orders = await Promise.all(ordersToCreate.map(createOrder));

    console.log('Orders created: ');
    console.log(orders);

    const orderProductsToCreate = await Promise.all(
      orders.map(async (order) => {
        const prodId = Math.floor(Math.random() * prods.length) + 1;
        const quantity = Math.floor(Math.random() * 10) + 1;
        const product = await getProductBy('id', prodId);
        const totalPrice =
          parseFloat(product.price.slice(1, product.price.length)) * quantity;
        return {
          orderId: order.id,
          productId: prodId,
          quantity: quantity,
          totalPrice: totalPrice
        };
      })
    );

    console.log('Order products to create: ');
    console.log(orderProductsToCreate);

    const orderProducts = await Promise.all(
      orderProductsToCreate.map(createOrderProduct)
    );

    console.log('Order products created: ');
    console.log(orderProducts);
  } catch (error) {
    console.error('Error creating carts!');
    throw error;
  }
}

async function rebuildDB() {
  try {
    client.connect();
    await dropTables();
    await createTables();
    await createInitialUsers();
    await createInitialProducts();
    await createInitialPhotos();
    await createInitialOrders();

    // remove if not testing db calls
    await testDB();

    // create other data
  } catch (error) {
    console.log('Error during rebuildDB');
    throw error;
  }
}

async function testDB() {
  console.log('getting product by id:');
  console.log(await getProductBy('id', 1));

  console.log('getting all products:');
  console.log(await getAllProducts());

  // console.log('Getting raw carts by user id: ')
  // console.log(await getRawCartByUserId(1))

  // console.log('Getting carts by user id: ')
  // console.log(await getCartByUserId(1))
}

module.exports = {
  rebuildDB
};
