import { useState } from 'react'
import './App.css'
import AuthLayout from './layouts/AuthLayout'
import Register from './pages/Auth/Register'
import Login from './pages/Auth/Login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ForgotPassword from './pages/Auth/ForgotPassword'
import VerifyOTP from './pages/Auth/VerifyOTP'

function App() {

  const routes = [
    {
      title:'Login',
      Component:Login,
      path:'/',
    },
    {
      title:'_Login',
      Component:Login,
      path:'/login',
    },
    {
      title:'Register',
      Component:Register,
      path:'/register',
    },
    {
      title:'Reset Password',
      Component:ForgotPassword,
      path:'/forgot-password',
    },
    {
      title:'Verify OTP',
      Component:VerifyOTP,
      path:'/otp-verification',
    },
  ]

  return (
    // <Register />
    <Router>
      <Routes>
        {
          routes.map(route => <Route key={route.title} path={route.path} Component={route.Component} /> )
        }
      </Routes>
    </Router>
  )
}

export default App
