import React from 'react';

import Modal from './Modal';
import AuthForm from './AuthForm';

function LoginModal(props) {
  const {
    loginModalVisible,
    user,
    setUser,
    setCart,
    setOrders,
    setLoginModalVisible
  } = props;

  return (
    <Modal visible={loginModalVisible}>
      <AuthForm
        type="login"
        {...props}
        setUser={setUser}
        setCart={setCart}
        setOrders={setOrders}
        setLoginModalVisible={setLoginModalVisible}
        user={user}
      />
    </Modal>
  );
}

export default LoginModal;
