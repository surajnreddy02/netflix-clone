import axios from 'axios';
import { API_URL } from '../config';

export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, {
            email,
            password
        });
        return response.data;
    } catch (error) {
        throw new Error('Login failed. Please check your credentials.');
    }
};

export const signUp = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/auth/signup`, {
            email,
            password
        });
        return response.data;
    } catch (error) {
        throw new Error('Sign up failed. Please try again.');
    }
};

export const logout = async () => {
    try {
        await axios.post(`${API_URL}/auth/logout`);
    } catch (error) {
        throw new Error('Logout failed. Please try again.');
    }
};