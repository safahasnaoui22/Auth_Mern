import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { message } from 'antd'; // Assuming you're using Ant Design for message component

function useLogin() {
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const loginUser = async (values) => {
    try {
      // Reset error state and set loading to true
      setError(null);
      setLoading(true);


      // Send registration request
      const res =
       await
        fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });

      // Handle response
      const data = await res.json();
      if (res.status === 200) {
        // Registration successfubl
        message.success('login successful');
        login(data.token, data.user);
      } else if (res.status === 400) {
        // Registration failed due to client error
        setError(data.message || 'login failed');
      } else {
        // Server error
        throw new Error('login failed');
      }
    } catch (error) {
      // Error occurred during registration
      setError('An error occurred. Please try again later.');
      console.error('Error during login:', error);
    } finally {
      // Reset loading state
      setLoading(false);
    }
  };

  return { loading, error, loginUser };
}

export default useLogin;
