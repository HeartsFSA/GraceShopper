import React, {useEffect} from 'react';
import {useState} from 'react';
import './css/Navbar.css';
import {Link, NavLink, withRouter} from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {useStateValue} from '../StateProvider';

import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import {DomainDisabled} from '@material-ui/icons';

function Navbar(props) {
  // Props

  const {
    user,
    setUser,
    query,
    setQuery,
    products,
    setCart,
    setOrders,
    messenger,
    showMessage,
    setShowMessage
  } = props;

  console.log(products);

  // UseState
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [registerModalVisible, setRegisterModalVisible] = useState(false);
  const [{cart}] = useStateValue();
  const [searchPlaceholder, setSearchPlaceholder] = useState('');

  useEffect(() => {
    let searchPlaceholder = [];

    products.forEach((product) => {
      searchPlaceholder.push(product.name);
    });

    setSearchPlaceholder(
      '    🔍  ' +
        "   Let's go to " +
        searchPlaceholder[Math.floor(Math.random() * searchPlaceholder.length)]
    );
  }, [query]);

  function backHome() {
    return <Redirect to="/" />;
  }

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
            setQuery('');
          }}
        />
      </Link>

      {/* Search Box */}
      <div className="header__search">
        <input
          type="text"
          className="header__searchInput"
          placeholder={searchPlaceholder}
          value={query}
          // onKeyPress={(event) => {
          //   if (event.key === 'Enter') {
          //     return <backHome />;
          //   }
          // }}
          onChange={(e) => {
            setQuery(e.target.value);
          }}

          // onClick={(e) => {
          //   props.history.push('/');
          // }}
        />
        {/* <SearchIcon
          className="header__searchIcon"
          // onClick={(e) => {
          //   props.history.push('/');
          // }}
        /> */}
      </div>

      {props.user.username ? (
        <h3
          id="signin_register"
          onClick={(e) => {
            localStorage.setItem('token', '');
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
                // setRegisterModalVisible(false);
                setLoginModalVisible(!loginModalVisible);
              }}
            >
              <div className="header__option">
                {/* <span className="header__optionLineOne"></span> */}
                <span className="header__optionLineTwo">
                  {' '}
                  Sign In / Register
                </span>
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
          {/* <div className="header__nav">
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
          </div> */}
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
        user={user}
        messenger={messenger}
      />

      {/* <RegisterModal
        registerModalVisible={registerModalVisible}
        setUser={setUser}
        setRegisterModalVisible={setRegisterModalVisible}
      /> */}
    </nav>
  );
}

export default Navbar;
