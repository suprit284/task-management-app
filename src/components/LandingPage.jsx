import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const LandingPage = () => {

    const navigate = useNavigate();


    // In your React component
// In your LandingPage.jsx
const handleLogout = async () => {
  try {
    const token = localStorage.getItem('token');
    console.log('Logging out with token:', token);
    
    if (!token) {
      console.log('No token found, clearing storage anyway');
      localStorage.removeItem('token');
      navigate('/login');
      return;
    }

    const response = await axios.post('http://localhost:5000/api/auth/logout', {}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    console.log('Logout response:', response.data);
    
    // Clear frontend storage
    localStorage.removeItem('token');
    
    // Redirect to login
    navigate('/login');
    toast.success('Logged out successfully');

  } catch (error) {
    console.error('Full logout error:', error);
    console.error('Error response:', error.response?.data);
    
    // Still clear storage and redirect even if API call fails
    localStorage.removeItem('token');
    navigate('/login');
    toast.success('Logged out successfully');
  }
};
  return (
    <div className='bg-blue-950 w-full h-[100vh] flex flex-col  items-center'>
        <header className='bg-red-700 w-full h-[20vh] flex  items-center flex-row-reverse'>
                <div className='w-[7vw] h-[7vh] rounded-3xl bg-lime-500 cursor-pointer' 
                onClick={ () => 
                {
                    handleLogout()
                }
                }
                >
                     
                </div>
        </header>
        <main className='bg-pink-700 w-full h-[50vh] flex flex-col'>

        </main>
        <footer className='bg-emerald-700 w-full h-[30vh] flex flex-col'>

        </footer>
    </div>
  )
}

export default LandingPage;