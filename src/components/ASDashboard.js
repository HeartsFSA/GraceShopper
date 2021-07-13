import React from 'react';
import {useEffect, useState} from 'react';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';

import ProductCard from './ProductCard';
import ASDashboardList from './ASDashboardList';
import {
  getItemCountInOrder,
  getStatusText,
  getUserTypeText,
  getOrderTotalPrice,
  getTotalValueByUser,
  getCartsByUser,
  getOrdersByUser,
  createProduct,
  updateProduct,
  getAllProducts,
  getAllOrders,
  getAllUsers
} from '../utils';

import './css/ASDashboard.css';

function ASDashboard(props) {
  const {type, user, products, setProducts} = props;
  const [dashboardProducts, setDashboardProducts] = useState(products);
  const [dashboardOrders, setDashboardOrders] = useState([]);
  const [dashboardUsers, setDashboardUsers] = useState([]);
  const [editorFeature, setEditorFeature] = useState(initializeProductObject());
  const [presentedList, setPresentedList] = useState('products');
  const [sorter, setSorter] = useState(['up', 'ID']);

  const PRODUCT_HEADERS = [
    '',
    'ID',
    'Name',
    'Description',
    'Category',
    'Price',
    'Location'
  ];

  useEffect(() => {
    function setDashboardProductsByUserType() {
      let prods = null;
      if (type === 'admin') {
        prods = products;
      } else {
        prods = products.filter(
          (product) => product.creator_name === user.username
        );
      }
      setDashboardProducts(setDashboardProductsBySortType(prods));
    }

    function setDashboardProductsBySortType(prods) {
      const direction = sorter[0];
      const sortingField = sorter[1].toLowerCase();
      console.log('Sorting Field: ', sortingField);
      console.log('Direction: ', direction);
      let sorted = null;
      if (direction === 'up') {
        sorted = prods.sort((a, b) => sortByField(a, b, sortingField));
      } else {
        sorted = prods
          .sort((a, b) => sortByField(a, b, sortingField))
          .reverse();
      }
      console.log('Sorted', sorted);
      return sorted;
    }

    function sortByField(a, b, field) {
      let strA = a[field];
      let strB = b[field];

      if (typeof a[field] === 'string') {
        if (a[field][0] === '$') {
          strA = strA.slice(1, strA.length);
          strB = strB.slice(1, strB.length);
        }
        strA = strA.toLowerCase();
        strB = strB.toLowerCase();
      }

      let comp = 0;
      if (strA > strB) {
        comp = 1;
      } else if (strA < strB) {
        comp = -1;
      }
      return comp;
    }

    function sortById(prods, sortingField, direction) {
      if (direction === 'up') {
        return prods.sort((a, b) => a[sortingField] - b[sortingField]);
      }
      return prods.sort((a, b) => b[sortingField] - a[sortingField]);
    }

    function sortByPrice(prods, sortingField, direction) {
      if (direction === 'up') {
        return prods.sort((a, b) =>
          parseFloat(
            a[sortingField].slice(1, a[sortingField].length) -
              parseFloat(b[sortingField].slice(1, b[sortingField].length))
          )
        );
      }
    }

    setDashboardProductsByUserType();
  }, [products, sorter]);

  useEffect(async () => {
    // console.log('Props: ', props)
    async function checkPermission() {
      if (
        !user.id ||
        (user.permission < 3 && type === 'admin') ||
        (user.permission !== 2 && type === 'seller')
      ) {
        console.log('Pushing to login');
        props.history.push('/');
      }
    }
    await checkPermission();
    await setDashboardOrders(await getAllOrders());
    await setDashboardUsers(await getAllUsers());
  }, []);

  function initializeProductObject() {
    return {
      category: '',
      creator_name: user.username ? user.username : '',
      dates_open: '',
      description: '',
      hours: '',
      is_active: true,
      location: '',
      name: '',
      price: '',
      photos: []
    };
  }

  async function handleSubmit() {
    if (editorFeature.id) {
      const id = editorFeature.id;
      let updatedFeature = {...editorFeature};
      delete updatedFeature.photos;
      const product = await updateProduct(id, updatedFeature);
      console.log('UPDATED PRODUCT: ', product);
      setProducts(await getAllProducts());
      setEditorFeature(initializeProductObject());
    } else {
      let updatedFeature = {...editorFeature};
      delete updatedFeature.photos;
      const product = await createProduct(updatedFeature);
      console.log('CREATED PRODUCT: ', product);
      setProducts(await getAllProducts());
      setEditorFeature(initializeProductObject());
    }
  }

  function presentList() {
    switch (presentedList) {
      case 'products':
        return (
          <ASDashboardList headers={PRODUCT_HEADERS} setSorter={setSorter}>
            {dashboardProducts.map((product) => {
              return (
                <tr
                  key={product.id}
                  className={product.is_active ? 'active' : 'inactive'}
                >
                  <td>
                    <span>
                      <button
                        onClick={async () => {
                          setEditorFeature(await initializeProductObject());
                          setEditorFeature(product);
                        }}
                      >
                        <EditIcon />
                      </button>
                    </span>
                  </td>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.category}</td>
                  <td>{product.price}</td>
                  <td>{product.location}</td>
                </tr>
              );
            })}
          </ASDashboardList>
        );
      case 'orders':
        return (
          <ASDashboardList
            headers={['ID', 'Status', 'User ID', 'Item Count', 'Total Price']}
          >
            {dashboardOrders.map((order) => {
              return (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{getStatusText(order.status)}</td>
                  <td>{order.userId}</td>
                  <td>{getItemCountInOrder(order)}</td>
                  <td>{`$${getOrderTotalPrice(order).toFixed(2)}`}</td>
                </tr>
              );
            })}
          </ASDashboardList>
        );
      case 'users':
        return (
          <ASDashboardList
            headers={[
              'ID',
              'Username',
              'Type',
              'Carts Total',
              'Orders Total',
              'Orders Placed'
            ]}
          >
            {dashboardUsers.map((dashboardUser) => {
              return (
                <tr>
                  <td>{dashboardUser.id}</td>
                  <td>{dashboardUser.username}</td>
                  <td>{getUserTypeText(dashboardUser.permission)}</td>
                  <td>
                    {`$${getTotalValueByUser(
                      dashboardUser,
                      getCartsByUser(dashboardUser, dashboardOrders)
                    ).toFixed(2)}`}
                  </td>
                  <td>
                    {`$${getTotalValueByUser(
                      dashboardUser,
                      getOrdersByUser(dashboardUser, dashboardOrders)
                    ).toFixed(2)}`}
                  </td>
                  <td>
                    {getOrdersByUser(dashboardUser, dashboardOrders).length}
                  </td>
                </tr>
              );
            })}
          </ASDashboardList>
        );
    }
  }

  return (
    <div className="dashboard">
      <div className="dashboard-navbar">
        <button
          onClick={() => {
            setPresentedList('products');
          }}
        >
          Products
        </button>
        <button
          onClick={() => {
            setPresentedList('orders');
          }}
        >
          Orders
        </button>
        <button
          onClick={() => {
            setPresentedList('users');
          }}
        >
          Users
        </button>
      </div>
      <div className="dashboard-editor">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleSubmit();
          }}
        >
          <div>
            <label htmlFor="product-name-input">Name</label>
            <input
              id="product-name-input"
              value={editorFeature.name}
              placeholder="Name..."
              onChange={(event) => {
                let updatedFeature = {...editorFeature};
                updatedFeature.name = event.target.value;
                console.log('UPDATED: ', updatedFeature);
                setEditorFeature(updatedFeature);
              }}
            ></input>
          </div>

          <div>
            <label htmlFor="product-creator-name-input">Creator Name</label>
            <input
              id="product-creator-name-input"
              value={editorFeature.creator_name}
              placeholder="Creator Name..."
              onChange={(event) => {
                let updatedFeature = {...editorFeature};
                updatedFeature.creator_name = event.target.value;
                console.log('UPDATED: ', updatedFeature);
                setEditorFeature(updatedFeature);
              }}
            ></input>
          </div>

          <div>
            <label htmlFor="product-category-input">Category</label>
            <input
              id="product-category-input"
              value={editorFeature.category}
              placeholder="Category..."
              onChange={(event) => {
                let updatedFeature = {...editorFeature};
                updatedFeature.category = event.target.value;
                console.log('UPDATED: ', updatedFeature);
                setEditorFeature(updatedFeature);
              }}
            ></input>
          </div>

          <div>
            <label htmlFor="product-description-input">Description</label>
            <textarea
              rows="5"
              id="product-description-input"
              value={editorFeature.description}
              placeholder="Description..."
              onChange={(event) => {
                let updatedFeature = {...editorFeature};
                updatedFeature.description = event.target.value;
                console.log('UPDATED: ', updatedFeature);
                setEditorFeature(updatedFeature);
              }}
            ></textarea>
          </div>

          <div>
            <label htmlFor="product-price-input">Price</label>
            <input
              id="product-price-input"
              value={editorFeature.price}
              placeholder="Price..."
              onChange={(event) => {
                let updatedFeature = {...editorFeature};
                updatedFeature.price = event.target.value;
                console.log('UPDATED: ', updatedFeature);
                setEditorFeature(updatedFeature);
              }}
            ></input>
          </div>

          <div>
            <label htmlFor="product-location-input">Location</label>
            <input
              id="product-location-input"
              value={editorFeature.location}
              placeholder="Location..."
              onChange={(event) => {
                let updatedFeature = {...editorFeature};
                updatedFeature.location = event.target.value;
                console.log('UPDATED: ', updatedFeature);
                setEditorFeature(updatedFeature);
              }}
            ></input>
          </div>

          <div>
            <label htmlFor="product-dates-input">Dates Open</label>
            <input
              id="product-dates-input"
              value={editorFeature.dates_open}
              placeholder="Dates Open..."
              onChange={(event) => {
                let updatedFeature = {...editorFeature};
                updatedFeature.dates_open = event.target.value;
                console.log('UPDATED: ', updatedFeature);
                setEditorFeature(updatedFeature);
              }}
            ></input>
          </div>

          <div>
            <label htmlFor="product-hours-input">Hours Open</label>
            <input
              id="product-hours-input"
              value={editorFeature.hours}
              placeholder="Hours Open..."
              onChange={(event) => {
                let updatedFeature = {...editorFeature};
                updatedFeature.hours = event.target.value;
                console.log('UPDATED: ', updatedFeature);
                setEditorFeature(updatedFeature);
              }}
            ></input>
          </div>

          <div>
            <label htmlFor="product-active-input">Active</label>
            <input
              className="product-active-input"
              type="checkbox"
              checked={editorFeature.is_active}
              onChange={(event) => {
                let updatedFeature = {...editorFeature};
                updatedFeature.is_active = event.target.checked;
                console.log('UPDATED: ', updatedFeature);
                setEditorFeature(updatedFeature);
              }}
            ></input>
          </div>

          <button type="submit">
            <SaveIcon />
          </button>
        </form>

        {/* <ProductCard product={editorFeature} /> */}
      </div>
      {presentList()}
    </div>
  );
}

export default ASDashboard;
