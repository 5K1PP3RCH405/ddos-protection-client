import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const signup = async (userData) => {
  try {
    const response = await api.post('/api/auth/register', userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('An error occurred during signup');
  }
};

export const verifyEmail = async (token) => {
  try {
    const response = await api.post('/api/auth/verify-email', { token });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('An error occurred during email verification');
  }
};

export const login = async (email, password) => {
  try {
    const response = await api.post('/api/auth/login', { email, password });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('An error occurred during login');
  }
};

export default api;