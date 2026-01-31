import React, { createContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Initialize auth state from localStorage
    useEffect(() => {
        const initAuth = async () => {
            const storedUser = localStorage.getItem('user');
            const accessToken = localStorage.getItem('accessToken');

            if (storedUser && accessToken) {
                try {
                    setUser(JSON.parse(storedUser));
                    setIsAuthenticated(true);

                    // Verify token is still valid by fetching profile
                    const response = await authAPI.getProfile();
                    setUser(response.data.data.user);
                } catch (error) {
                    console.error('Token validation failed:', error);
                    logout();
                }
            }
            setLoading(false);
        };

        initAuth();

        // Listen for auth:logout events from API interceptor
        const handleLogoutEvent = () => {
            setUser(null);
            setIsAuthenticated(false);
        };

        window.addEventListener('auth:logout', handleLogoutEvent);
        return () => window.removeEventListener('auth:logout', handleLogoutEvent);
    }, []);

    const login = async (email, password) => {
        try {
            const response = await authAPI.login({ email, password });
            const { user: userData, accessToken, refreshToken } = response.data.data;

            // Save to state
            setUser(userData);
            setIsAuthenticated(true);

            // Save to localStorage
            localStorage.setItem('user', JSON.stringify(userData));
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);

            return { success: true, user: userData };
        } catch (error) {
            console.error('Login error:', error);
            const message = error.response?.data?.message || 'Login failed';
            return { success: false, error: message };
        }
    };

    const register = async (name, email, password) => {
        try {
            const response = await authAPI.register({ name, email, password });
            const { user: userData, accessToken, refreshToken } = response.data.data;

            // Save to state
            setUser(userData);
            setIsAuthenticated(true);

            // Save to localStorage
            localStorage.setItem('user', JSON.stringify(userData));
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);

            return { success: true, user: userData };
        } catch (error) {
            console.error('Registration error:', error);
            const message = error.response?.data?.message || 'Registration failed';
            return { success: false, error: message };
        }
    };

    const logout = async () => {
        try {
            await authAPI.logout();
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            // Clear state
            setUser(null);
            setIsAuthenticated(false);

            // Clear localStorage
            localStorage.removeItem('user');
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
        }
    };

    const updateUserProfile = async (updates) => {
        try {
            const response = await authAPI.updateProfile(updates);
            const updatedUser = response.data.data.user;

            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));

            return { success: true, user: updatedUser };
        } catch (error) {
            console.error('Profile update error:', error);
            const message = error.response?.data?.message || 'Update failed';
            return { success: false, error: message };
        }
    };

    const value = {
        user,
        loading,
        isAuthenticated,
        login,
        register,
        logout,
        updateUserProfile
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
