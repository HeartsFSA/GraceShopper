import React from 'react';

import Modal from './Modal';
import AuthForm from './AuthForm';

function LoginModal(props) {
  const {
    loginModalVisible,
    user,
    setUser,
    setCart,
    primaryCart,
    setPrimaryCart,
    setOrders,
    setLoginModalVisible,
    messenger
  } = props;

  return (
    <Modal visible={loginModalVisible}>
      <AuthForm
        type="login"
        {...props}
        setUser={setUser}
        setCart={setCart}
        primaryCart={primaryCart}
        setPrimaryCart={setPrimaryCart}
        setOrders={setOrders}
        setLoginModalVisible={setLoginModalVisible}
        user={user}
        messenger={messenger}
      />
    </Modal>
  );
}

export default LoginModal;
