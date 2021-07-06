<<<<<<< HEAD
import React from 'react';

import Modal from './Modal';
import AuthForm from './AuthForm';

function LoginModal(props) {
  const {loginModalVisible, setUser, setCart, setOrders} = props;
=======
import React from "react";

import Modal from "./Modal";
import AuthForm from "./AuthForm";

function LoginModal(props) {
  const { loginModalVisible, setUser, setLoginModalVisible } = props;
>>>>>>> 0aa9e9ab7e027953df8684465fdbd28248ae7d14

  return (
    <Modal visible={loginModalVisible}>
      <AuthForm
        type="login"
<<<<<<< HEAD
        {...props}
        setUser={setUser}
        setCart={setCart}
        setOrders={setOrders}
=======
        setLoginModalVisible={setLoginModalVisible}
        {...props}
        setUser={setUser}
>>>>>>> 0aa9e9ab7e027953df8684465fdbd28248ae7d14
      />
    </Modal>
  );
}

export default LoginModal;
