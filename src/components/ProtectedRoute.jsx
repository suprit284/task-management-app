// components/ProtectedRoute.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      // No token, redirect to login
      navigate('/login');
      return;
    }
    
    // Optional: Verify token is not expired
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const isExpired = payload.exp * 1000 < Date.now();
      
      if (isExpired) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
      }
    } catch (error) {
      // Invalid token format
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');
    }
  }, [navigate]);
  
  // While checking, you can show loading or nothing
  const token = localStorage.getItem('token');
  if (!token) {
    return null; // or <LoadingSpinner />
  }
  
  return children;
};

export default ProtectedRoute;