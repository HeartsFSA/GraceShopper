import React from 'react';
import {useEffect, useState} from 'react';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';

import ProductCard from './ProductCard';
import {createProduct, updateProduct} from '../utils';

import './css/ASDashboard.css';
import {Save} from '@material-ui/icons';

function ASDashboard(props) {
  const {type, user, products} = props;
  const [dashboardProducts, setDashboardProducts] = useState([]);
  const [editorFeature, setEditorFeature] = useState({
    category: null,
    creatorname: user.username ? user.username : '',
    datesopen: 'M-F',
    description: 'Description',
    hours: '8AM - 5PM',
    isactive: true,
    location: 'Location',
    name: 'Name',
    price: 'Price',
    photos: []
  });

  useEffect(async () => {
    if (type === 'admin') {
      setDashboardProducts(products);
    } else {
      setDashboardProducts(
        products.filter((product) => product.creatorName === user.username)
      );
    }
  }, []);

  async function handleSubmit() {
    if (editorFeature.id) {
      const id = editorFeature.id;
      let updatedFeature = {...editorFeature};
      delete updatedFeature.photos;
      const product = await updateProduct(id, updatedFeature);
      console.log('UPDATED PRODUCT: ', product);
    } else {
      let updatedFeature = {...editorFeature};
      delete updatedFeature.photos;
      const product = await createProduct(updatedFeature);
      console.log('CREATED PRODUCT: ', product);
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
            value={editorFeature.creatorname}
            onChange={(event) => {
              let updatedFeature = {...editorFeature};
              updatedFeature.creatorname = event.target.value;
              console.log('UPDATED: ', updatedFeature);
              setEditorFeature(updatedFeature);
            }}
          ></input>

          <label htmlFor="product-category-input">Category</label>
          <input
            id="product-category-input"
            value={editorFeature.category}
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
            value={editorFeature.datesopen}
            onChange={(event) => {
              let updatedFeature = {...editorFeature};
              updatedFeature.datesopen = event.target.value;
              console.log('UPDATED: ', updatedFeature);
              setEditorFeature(updatedFeature);
            }}
          ></input>

          <label htmlFor="product-hours-input">Hours Open</label>
          <input
            id="product-hours-input"
            value={editorFeature.hours}
            onChange={(event) => {
              let updatedFeature = {...editorFeature};
              updatedFeature.hours = event.target.value;
              console.log('UPDATED: ', updatedFeature);
              setEditorFeature(updatedFeature);
            }}
          ></input>

          <label htmlFor="product-active-input">Active</label>
          <input
            id="product-active-input"
            type="checkbox"
            checked={editorFeature.isactive}
            onChange={(event) => {
              let updatedFeature = {...editorFeature};
              updatedFeature.isactive = event.target.checked;
              console.log('UPDATED: ', updatedFeature);
              setEditorFeature(updatedFeature);
            }}
          ></input>

          <button type="submit">
            <SaveIcon />
          </button>
        </form>

        {/* <ProductCard product={editorFeature} /> */}
      </div>
      <div className="dashboard-list">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {dashboardProducts.map((product) => {
              return (
                <tr key={product.id}>
                  <td>
                    <span>
                      <button
                        onClick={() => {
                          console.log(product);
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
