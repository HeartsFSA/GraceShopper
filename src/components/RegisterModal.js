import React from 'react'

import Modal from './Modal'
import AuthForm from './AuthForm'

function RegisterModal(props) {
    const {registerModalVisible, setUser} = props

    return (
        <Modal
        visible={registerModalVisible} >
            <AuthForm type='register' {...props} setUser={setUser} />
        </Modal>
    )
}

export default RegisterModal