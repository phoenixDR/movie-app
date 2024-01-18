import React, { useContext } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import { AuthContext } from './AuthContext';

const ToastComponent = () => {
    const { showToast, toastMessage } = useContext(AuthContext);

    return (
        <ToastContainer position="top-center" className="p-3" style={{ zIndex: 1 }}>
            <Toast bg={"success"} show={showToast} delay={3000} autohide>
                <Toast.Body className={'text-white'}>{toastMessage}</Toast.Body>
            </Toast>
        </ToastContainer>
    );
};

export default ToastComponent;
