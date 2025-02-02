import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/UserContext';

const ProtectedRoute = ({ element }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    // Optionally, you can return null or a loading indicator while checking user
    return null; // or <Loading /> component
  }

  return element;  
};

export default ProtectedRoute;
