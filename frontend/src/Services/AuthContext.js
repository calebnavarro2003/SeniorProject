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
            const response = await axios.get('https://api.oslearn.app/auth/validate', { withCredentials: true });
            setIsAuthenticated(response.data.authenticated);
            setIsAdmin(response.data.isAdmin || false);
        } catch (error) {
            setIsAuthenticated(false);
            setIsAdmin(false);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            // Calling your backend logout endpoint which clears the cookie
            await axios.post('https://api.oslearn.app/auth/logout', {}, { withCredentials: true });
        } catch (error) {
            console.error('Error during logout', error);
        } finally {
            // Clear the client auth state after logout
            setIsAuthenticated(false);
            setIsAdmin(false);
            setLoading(true)
        }
    }

    useEffect(() => {
        refreshAuthState();
    }, [refreshAuthState]);

    // While loading, you can return a loading indicator (or null)
    if (loading) {
        return <div style={{ width: '100vw', height: '100vh', background: 'white' }}></div>;
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, isAdmin, refreshAuthState, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
