import { useState } from 'react'
import './App.css'
import AuthLayout from './layouts/AuthLayout'
import Register from './pages/Auth/Register'
import Login from './pages/Auth/Login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ForgotPassword from './pages/Auth/ForgotPassword'
import VerifyOTP from './pages/Auth/VerifyOTP'
import ChangePassword from './pages/Auth/ChangePassword'
import Dashboard from './pages/Main/Dashboard'
import MainLayout from './layouts/MainLayout'
import Referrals from './pages/Main/Referrals'
import Profile from './pages/Main/Profile'

function App() {

  const auth_routes = [
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
    {
      title:'Change Password',
      Component:ChangePassword,
      path:'/change-password',
    },
  ]

  const main_routes = [
    {
      title:'Dashboard',
      Component:Dashboard,
      path:'/dashboard',
    },
    {
      title:'Referrals',
      Component:Referrals,
      path:'referrals',
    },
    {
      title:'Profile',
      Component:Profile,
      path:'profile',
    },
  ]

  return (
    // <Register />
    <Router>
      <Routes>
        {
          auth_routes.map(route => <Route key={route.title} path={route.path} Component={route.Component} /> )
        }
        <Route path='/dashboard' Component={MainLayout}>
          {
            main_routes.map(route => <Route key={route.title} path={route.path} Component={route.Component} /> )
          }
        </Route>
      </Routes>
    </Router>
  )
}

export default App
