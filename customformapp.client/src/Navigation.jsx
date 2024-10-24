// Navigation.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './services/AuthContext';
import './assets/Navigation.css';


const Navigation = () => {
    const { isAuthenticated, logout } = useAuth();

    return (
        <nav>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            {isAuthenticated && (
                <>
                    <Link to="/create-template">Create Template</Link>
                    <Link to="/view-templates">View Templates</Link>
                    <button onClick={logout}>Logout</button>
                </>
            )}
        </nav>
    );
};

export default Navigation;
