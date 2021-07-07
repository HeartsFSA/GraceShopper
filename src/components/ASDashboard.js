import React from 'react';
import {useEffect, useState} from 'react';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';

import ProductCard from './ProductCard';
import {createProduct, updateProduct, getAllProducts} from '../utils';

import './css/ASDashboard.css';
import {Save} from '@material-ui/icons';

function ASDashboard(props) {
  const {type, user, products, setProducts} = props;
  const [dashboardProducts, setDashboardProducts] = useState([]);
  const [editorFeature, setEditorFeature] = useState(initializeProductObject());

  useEffect(async () => {
    if (type === 'admin') {
      setDashboardProducts(
        products.sort((a, b) => {
          return a.id - b.id;
        })
      );
    } else {
      setDashboardProducts(
        products.filter((product) => product.creator_name === user.username)
      );
    }
  }, [products]);

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

  return (
    <div className="dashboard">
      <div className="dashboard-navbar">
        <h1>Navbar</h1>
      </div>
      <div className="dashboard-editor">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleSubmit();
          }}
        >
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

          <button type="submit">
            <SaveIcon />
          </button>
        </form>

        <ProductCard product={editorFeature} />
      </div>
      <div className="dashboard-list">
        <table>
          <thead>
            <tr className="table-header">
              <th></th>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Category</th>
              <th>Price</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
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
                      {/* <input
                        className="product-active-input"
                        type="checkbox"
                        checked={product.is_active}
                        onChange={async (event) => {
                          let updatedFeature = {...product};
                          updatedFeature.is_active = event.target.checked;
                          console.log('UPDATED: ', updatedFeature);
                          const product = await updateProduct(
                            product.id,
                            updatedFeature
                          );
                          setProducts(await getAllProducts());
                        }}
                      ></input> */}
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
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ASDashboard;
