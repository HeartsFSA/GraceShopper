import React from 'react';
import {useEffect, useState} from 'react';
import Card from './Card';

import './css/ASDashboard.css';

function ASDashboard(props) {
  const {type, products} = props;
  const [dashboardProducts, setDashboardProducts] = useState([]);

  useEffect(async () => {
    if (type === 'admin') {
      setDashboardProducts(products);
    } else {
      setDashboardProducts(
        products.filter((product) => product.creatorName === user.username)
      );
    }
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard-navbar">
        <h1>Navbar</h1>
      </div>
      <div className="dashboard-editor">
        <h1>Dashboard Editor</h1>
      </div>
      <div className="dashboard-list">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {dashboardProducts.map((product) => {
              return (
                <tr>
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
