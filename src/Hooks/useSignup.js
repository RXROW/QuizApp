// hooks/useSignup.js
import axios from 'axios';
import { useState } from 'react';

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const signup = async (data) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('https://quizz-app-one-chi.vercel.app/api/v1/users/signup', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setLoading(false);

      if (response.status === 201) {
        return response.data;
      } else {
        throw new Error('Signup failed');
      }
    } catch (error) {
      setLoading(false);
      setError(error.message || 'An error occurred. Please try again.');
      throw error;
    }
  };

  return { signup, loading, error };
};

export default useSignup;
