import React from 'react';

import Modal from './Modal';
import AuthForm from './AuthForm';

function LoginModal(props) {
  const {loginModalVisible, setUser, setCart, setOrders} = props;

  return (
    <Modal visible={loginModalVisible}>
      <AuthForm
        type="login"
        {...props}
        setUser={setUser}
        setCart={setCart}
        setOrders={setOrders}
      />
    </Modal>
  );
}

export default LoginModal;
