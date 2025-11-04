import React, { useState } from 'react'
import Fieldinput from './Fieldinput';
import { Link, useNavigate } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import { toast } from 'sonner';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

function AuthForm({ action  , headerText   }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const userAction = action === 'sign up' ? 'Sign up' : 'Login';

  const navigate = useNavigate()
   const [showPassword, setShowPassword] = useState(false);
  

  const onSubmit = async (data) => {
  console.log('Form data being sent:', data);
  
  try {
    if (action === "sign up") {
      const response = await axios.post('http://localhost:5000/api/auth/signup', data);
      console.log('Signup success:', response.data);
      
      if (response.status === 201) {
        toast.success(response.data.message);
      }
      setTimeout(() => {

          reset();
        }, 3000);
      setTimeout( () => 
      {
        navigate("/login");
      },3500)
      
    } else if (action === "login") {
      const { ...loginData } = data;
      const response = await axios.post('http://localhost:5000/api/auth/login', loginData);
      console.log('Login success:', response.data);
      
      if (response.status === 200) {
          localStorage.setItem('token', response.data.user.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        toast.success(response.data.message);
      }

       
      setTimeout(() => {
          reset();
        }, 3000);

        setTimeout( () => 
      {
        navigate("/landPage");
      },3500)
    }
  } catch (error) {
    console.log('Full error object:', error);
    console.log('Error response data:', error.response?.data);
    console.log('Error status:', error.response?.status);
    
    const message = error.response?.data?.message || "Server error";
    toast.error(message);
  }
}
  return (
    <div className='w-[50vw] h-[50vh] flex flex-col justify-center items-center gap-2'>

        <h2 className='text-2xl font-semibold text-white'>{headerText}</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Show Name field only for sign up */}
      {action === 'sign up' && (
        <div className='flex flex-col gap-1'>
          <label htmlFor="name" className="block text-sm font-medium text-white">
            Name
          </label>
          <input
            {...register('name')}
            type="text"
            id="name"
            className="rounded-lg w-[25vw] border border-blue-700 bg-blue-900 px-3 py-1 outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-white"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>
      )}
      
      {/* Email field */}
      <div className='flex flex-col gap-1'>
        <label htmlFor="email" className="block text-sm font-medium text-white">
          Email address
        </label>
        <input
          {...register('email')}
          type="email"
          id="email"
          className="rounded-lg w-[25vw] border border-blue-700 bg-blue-900 px-3 py-1 outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-white"
        />
        {errors.email && ( action !== "login" ? 
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p> : <p className='className="mt-1 text-sm text-red-600'>email is required</p>
        )}
      </div>
      
      {/* Password field */}
      <div className='flex flex-col gap-1'>
  <label htmlFor="password" className="block text-sm font-medium text-white">
    Password
  </label>
  <input
    {...register('password')}
    type={showPassword ? 'text' : 'password'}
    id="password"
    className="rounded-lg w-[25vw] border border-blue-700 bg-blue-900 px-3 py-1 outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-white"
  />
  <div className="flex justify-between items-center">
    <div>
      {errors.password && ( action !== "login" ? 
        <p className="text-sm text-red-600">{errors.password.message}</p> : <p className='text-sm text-red-600'>password is required</p>
      )}
    </div>
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="text-cyan-400 hover:text-cyan-300 text-xs"
    >
      {showPassword ? 'Hide' : 'Show password'}
    </button>
  </div>
</div>
      
      <button 
        type="submit" 
        className="font-semibold bg-blue-500 hover:bg-blue-400 text-white py-2 px-6 w-[25vw] rounded-lg transition-all duration-300 shadow-lg shadow-blue-500/50 hover:shadow-blue-400/60"
      >
        {userAction}
      </button>
      
    </form>
        {action === "sign up" ? (
        <p className='text-white font-thin text-sm'>
          already signed up? <Link to="/login" className="text-cyan-400">Login</Link>

        </p>
        
        
      ) : (
        <p className='text-white font-thin text-sm'>
          Not registered? <Link to="/" className="text-cyan-400">sign up</Link>
        </p>
      )}
    </div>
    
  );
}

export default AuthForm;