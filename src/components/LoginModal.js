import React from "react";

import Modal from "./Modal";
import AuthForm from "./AuthForm";

function LoginModal(props) {
  const { loginModalVisible, setUser, setLoginModalVisible } = props;

  return (
    <Modal visible={loginModalVisible}>
      <AuthForm
        type="login"
        setLoginModalVisible={setLoginModalVisible}
        {...props}
        setUser={setUser}
      />
    </Modal>
  );
}

export default LoginModal;
