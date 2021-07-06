import React from 'react';
import {useState} from 'react';
import './css/Navbar.css';
import {Link, NavLink, withRouter} from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {useStateValue} from '../StateProvider';

import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

function Navbar(props) {
  // Props
  const {user, setUser, setCart, setOrders} = props;

  // UseState
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [registerModalVisible, setRegisterModalVisible] = useState(false);
  const [{cart}] = useStateValue();

  return (
    <nav className="header">
      {/* logo on the left */}
      <Link to="/">
        <img
          className="header__logo"
          src="https://images.vexels.com/media/users/3/156708/isolated/lists/6f332cc60f7c82059eeeed0a5730aa7d-flight-ticket-icon.png"
          alt=""
          onClick={(e) => {
            setLoginModalVisible(false);
            setRegisterModalVisible(false);
          }}
        />
      </Link>

      {/* Search Box */}
      <div className="header__search">
        <input
          type="text"
          className="header__searchInput"
          placeholder="Search"
        />
        <SearchIcon className="header__searchIcon" />
      </div>

      {props.user.username ? (
        <h3
          className={'authfunc'}
          onClick={(e) => {
            setUser({});
          }}
        >
          Logout
        </h3>
      ) : (
        <>
          {' '}
          {/* 3 Links */}
          <div className="header__nav">
            <button
              className="header__link"
              onClick={() => {
                setRegisterModalVisible(false);
                setLoginModalVisible(!loginModalVisible);
              }}
            >
              <div className="header__option">
                <span className="header__optionLineOne"></span>
                <span className="header__optionLineTwo"> Sign In</span>
              </div>
            </button>
          </div>
          {/* <div className="header__nav">
          {/* 1st Link 
          <Link to="/login" className="header__link">
            <div className="header__option">
              <span className="header__optionLineOne"></span>
              <span className="header__optionLineTwo"> Sign In</span>
            </div>
          </Link>
        </div> */}
          {/* 2nd Link */}
          <div className="header__nav">
            <button
              className="header__link"
              onClick={() => {
                setLoginModalVisible(false);
                setRegisterModalVisible(!registerModalVisible);
              }}
            >
              <div className="header__option">
                <span className="header__optionLineOne"> </span>
                <span className="header__optionLineTwo"> Register</span>
              </div>
            </button>
          </div>
        </>
      )}

      {/* <Link to="/signup" className="header__link">
          <div className="header__option">
            <span className="header__optionLineOne"> Hello Guest</span>
            <span className="header__optionLineTwo"> Register</span>
          </div>
        </Link> */}

      {/* 3rd Link Cart */}
      <Link to="/cart" className="header__link">
        <div className="header__optionCart">
          {/* Shopping cart icon */}
          <ShoppingCartIcon />
          {/* Number of items in the cart */}
          <span className="header__optionLineTwo header__cartCount">
            {cart?.length}
          </span>
        </div>
      </Link>

      <LoginModal
        loginModalVisible={loginModalVisible}
        setUser={setUser}
        setCart={setCart}
        setOrders={setOrders}
        setLoginModalVisible={setLoginModalVisible}
      />

      <RegisterModal
        registerModalVisible={registerModalVisible}
        setUser={setUser}
        setRegisterModalVisible={setRegisterModalVisible}
      />
    </nav>
  );
}

export default Navbar;
