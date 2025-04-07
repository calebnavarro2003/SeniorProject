import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    // Refresh authentication state by calling the backend validation endpoint.
    const refreshAuthState = async () => {
        try {
            const response = await axios.get('http://localhost:8080/auth/validate', { withCredentials: true });
            setIsAuthenticated(response.data.authenticated);
            setIsAdmin(response.data.isAdmin || false);
        } catch (error) {
            setIsAuthenticated(false);
            setIsAdmin(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refreshAuthState();
    }, []);

    // While loading, you can return a loading indicator (or null)
    if (loading) {
        return <div style={{ width: '100vw', height: '100vh', background: 'white' }}></div>;
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, isAdmin, refreshAuthState }}>
            {children}
        </AuthContext.Provider>
    );
};
