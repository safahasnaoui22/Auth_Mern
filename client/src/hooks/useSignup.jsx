import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { message } from 'antd'; // Assuming you're using Ant Design for message component

function useSignup() {
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const registerUser = async (values) => {
    try {
      // Reset error state and set loading to true
      setError(null);
      setLoading(true);

      // Validate passwords match
      if (values.password !== values.passwordConfirm) {
        throw new Error('Passwords do not match');
      }

      // Send registration request
      const res = await fetch('http://localhost:8080/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });

      // Handle response
      const data = await res.json();
      if (res.status === 201) {
        // Registration successfubl
        message.success('Registration successful');
        login(data.token, data.user);
      } else if (res.status === 400) {
        // Registration failed due to client error
        setError(data.message || 'Registration failed');
      } else {
        // Server error
        throw new Error('Registration failed');
      }
    } catch (error) {
      // Error occurred during registration
      setError('An error occurred. Please try again later.');
      console.error('Error during registration:', error);
    } finally {
      // Reset loading state
      setLoading(false);
    }
  };

  return { loading, error, registerUser };
}

export default useSignup;
