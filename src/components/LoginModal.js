import React from 'react'

import Modal from './Modal'
import AuthForm from './AuthForm'

function LoginModal(props) {
    const {loginModalVisible, setUser} = props

    return (
        <Modal
        visible={loginModalVisible} >
            <AuthForm type='login' {...props} setUser={setUser} />
        </Modal>
    )
}

export default LoginModal