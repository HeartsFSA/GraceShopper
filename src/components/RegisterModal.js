import React from "react";

import Modal from "./Modal";
import AuthForm from "./AuthForm";

function RegisterModal(props) {
  const { registerModalVisible, setUser, setRegisterModalVisible } = props;

  return (
    <Modal visible={registerModalVisible}>
      <AuthForm
        type="register"
        setRegisterModalVisible={setRegisterModalVisible}
        {...props}
        setUser={setUser}
      />
    </Modal>
  );
}

export default RegisterModal;
