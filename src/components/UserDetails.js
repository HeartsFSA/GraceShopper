import React, {useEffect, useState} from 'react';
import {getUserByUsername, updateUser} from '../utils';
import ProductCard from './ProductCard';
import './css/UserDetails.css';

function UserDetails(props) {
  const [userToShow, setUserToShow] = useState({});
  const [productsToShow, setProductsToShow] = useState([]);
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [currentlyEditing, setCurrentlyEditing] = useState(false);
  const {products, user, setProducts} = props;

  // useEffect for getting the userToShow
  useEffect(async function () {
    setUserToShow(await getUserByUsername(props.match.params.username));
  }, []);

  // separate useEffect for finding the user's products
  useEffect(() => {
    setProductsToShow(
      products.filter((prod) => {
        return prod.creator_name === userToShow.username;
      })
    );
  }, [userToShow]);

  // checks on page load to see if the user is looking at their own page
  useEffect(async () => {
    if (userToShow.username === user.username) {
      setIsCurrentUser(true);
    } else {
      setIsCurrentUser(false);
      setCurrentlyEditing(false); // just in case...
    }
  }, [userToShow]);

  // checks on login or logout if the user is looking at their own page.
  // Other than the run conditions, this is the exact same as above
  useEffect(async () => {
    if (userToShow.username === user.username) {
      setIsCurrentUser(true);
    } else {
      setIsCurrentUser(false);
      setCurrentlyEditing(false);
    }
  }, [user]);

  // updates the products used for the site
  useEffect(() => {
    products
      .filter((prod) => prod.creator_name === userToShow.username)
      .forEach((prod) => {
        prod.creator = userToShow;
        console.log('user to show:', userToShow);
        console.log('product updated:', prod);
      });
  }, [userToShow]);

  // updates user changes

  async function saveChanges() {
    const newDisplayname = document.getElementById('username-input').value;
    const newEmail = document.getElementById('email-input').value;

    let updatedInfo = {};
    if (newDisplayname.trim() !== '') {
      updatedInfo.displayname = newDisplayname;
    }
    if (newEmail.trim() !== '') {
      updatedInfo.email = newEmail;
    }

    if (Object.keys(updatedInfo).length > 0) {
      setUserToShow(await updateUser(user.id, updatedInfo));
    }
  }

  return (
    <div id="user-details-container">
      {/* sets up loading screen; forces wait for userToShow to load */}
      {userToShow.username ? (
        <div id="user-details-card">
          {currentlyEditing ? (
            //   Edit info display
            <div id="user-info">
              <h1>{userToShow.displayname}</h1>
              <div id="edit-button">
                <button
                  onClick={() => {
                    saveChanges();
                    setCurrentlyEditing(false);
                  }}
                >
                  Save Changes
                </button>
              </div>
              <input
                type="text"
                placeholder="Enter new username"
                id="username-input"
              ></input>
              <br></br>
              <h3>Contact: {userToShow.email}</h3>
              <br></br>
              <input
                type="text"
                placeholder="Enter new email address"
                id="email-input"
              ></input>
            </div>
          ) : (
            // not editing info
            <div id="user-info">
              <h1>{userToShow.displayname}</h1>
              <div id="edit-button">
                {isCurrentUser ? (
                  <button onClick={() => setCurrentlyEditing(true)}>
                    Edit information
                  </button>
                ) : (
                  <></>
                )}
              </div>
              <h3>Contact: {userToShow.email}</h3>
            </div>
          )}
          <br></br>
          {productsToShow.length > 0 ? (
            <>
              <h3>Products:</h3>
              {currentlyEditing && user.permission >= 2 ? (
                // This button will link to Mike's product edit page
                <button id="edit-products-btn">Edit Products</button>
              ) : (
                ''
              )}
              <div id="user-products-display">
                {productsToShow.map((prod, i) => {
                  return <ProductCard product={prod} key={i} />;
                })}
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      ) : (
        // loading screen
        <h1>Loading, please wait...</h1>
      )}
    </div>
  );
}

export default UserDetails;
