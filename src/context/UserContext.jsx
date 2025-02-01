import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
 
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedToken && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setToken(storedToken);
        setUser(parsedUser);  
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
      }
    }
  }, []);

  // Signup function
  const signup = async (data) => {
    try {
      const response = await axios.post(
        'https://quizz-app-one-chi.vercel.app/api/v1/users/signup',
        data,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      if (response.status === 201) {
        const { token, user: userData } = response.data.data;  
        login(userData, token); 
        return userData;  
      }
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Signup failed');
    }
  };

  // Login function
  const login = async (credentials) => {
    try {
      const response = await axios.post(
        'https://quizz-app-one-chi.vercel.app/api/v1/users/login',
        credentials,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
  
      if (response.status === 200) {
        const { user: userData } = response.data.data; 
     
        setUser(userData);  
        setToken(response.data.token);  
        localStorage.setItem('token', response.data.token); 
        localStorage.setItem('user', JSON.stringify(userData));  
        return userData;  
      }
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed! Please try again.');
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);  
    setToken(null);  
    localStorage.removeItem('token'); 
    localStorage.removeItem('user');  
  }; 
  return (
    <UserContext.Provider value={{ user, token, signup, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

// Custom hook to use the auth context
export const useAuth = () => useContext(UserContext);