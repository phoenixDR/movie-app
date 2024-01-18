import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext({
    showToast: false,
    toastMessage: "",
    setToast: () => {},
});

export const AuthProvider = ({ children }) => {
    const EXPIRY_DURATION = 24 * 60 * 60 * 1000;
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const setToast = (message) => {
        setToastMessage(message);
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
            setToastMessage('');
        }, 3000);
    };

    const setTokenWithExpiry = (token) => {
        const now = new Date();
        const item = {
            value: token,
            expiry: now.getTime() + EXPIRY_DURATION,
        };

        localStorage.setItem('token', JSON.stringify(item));
    };

    const getTokenWithExpiry = () => {
        const tokenString = localStorage.getItem('token');
        const tokenObj = tokenString ? JSON.parse(tokenString) : null;
        if (!tokenObj) {
            return null;
        }

        const now = new Date();
        if (now.getTime() > tokenObj.expiry) {
            localStorage.removeItem('token');
            return null;
        }
        return tokenObj.value;
    };

    useEffect(() => {
        const token = getTokenWithExpiry();
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const login = (newToken) => {
        setTokenWithExpiry(newToken);
        setIsAuthenticated(true);
        setToast('You successfully logged in.');
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setToast('You successfully logged out.');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, showToast, toastMessage, setToast }}>
            {children}
        </AuthContext.Provider>
    );
};
