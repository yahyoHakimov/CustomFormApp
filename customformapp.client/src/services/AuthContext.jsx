// services/AuthContext.js
import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// Create the context
const AuthContext = createContext();

// Custom hook for consuming AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider component to wrap around parts of the app that need access to auth state
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    const login = () => {
        setIsAuthenticated(true);
        navigate('/templates'); // Redirect to templates page after login
    };

    const logout = () => {
        setIsAuthenticated(false);
        navigate('/login'); // Redirect to login page after logout
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
