import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes , Navigate } from 'react-router-dom'
import Login from './components/Login.jsx'
import { Toaster } from './components/ui/sonner'
import LandingPage from './components/LandingPage'
import ProtectedRoute from './components/ProtectedRoute'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Protected Routes */}
        <Route path="/" element={
          <ProtectedRoute>
            <App />
          </ProtectedRoute>
        } />
        
        <Route path="/landPage" element={
          <ProtectedRoute>
            <LandingPage />
          </ProtectedRoute>
        } />
        
        {/* Catch all route - redirect to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
    <Toaster 
        theme="dark"
  position="bottom-right"
  closeButton
  duration={3000}
  className="toaster group"
  toastOptions={{
    classNames: {
      toast:
        "group toast group-[.toaster]:bg-blue-900 group-[.toaster]:text-white group-[.toaster]:border-blue-700 group-[.toaster]:shadow-lg backdrop-blur-sm",
      description: "group-[.toast]:text-blue-200",
      actionButton:
        "group-[.toast]:bg-cyan-500 group-[.toast]:text-white hover:bg-cyan-400",
      cancelButton:
        "group-[.toast]:bg-blue-800 group-[.toast]:text-blue-200 hover:bg-blue-700",
      // Blue success toasts
      success: "group-[.toast]:bg-blue-900 group-[.toast]:border-cyan-400 group-[.toast]:shadow-cyan-400/20",
      // Red error toasts  
      error: "group-[.toast]:bg-red-900 group-[.toast]:border-red-400 group-[.toast]:shadow-red-400/20",
      // Yellow warning toasts
      warning: "group-[.toast]:bg-yellow-900 group-[.toast]:border-yellow-400 group-[.toast]:text-white",
      // Blue info toasts
      info: "group-[.toast]:bg-blue-900 group-[.toast]:border-cyan-400 group-[.toast]:shadow-cyan-400/20",
    },
  }}
    />
  </StrictMode>,
)