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
import Payment from './pages/Main/Payment'
import Patient from './pages/Main/Patient'
import { ToastContainer } from 'react-toastify'
import { QueryClient, QueryClientProvider } from 'react-query'
import "react-toastify/dist/ReactToastify.css";

export const queryClient = new QueryClient();

function App() {

  const auth_routes = [
    {
      title:'Patients',
      Component:Patient,
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
    {
      title:'Payments',
      Component:Payment,
      path:'payments',
    },
    {
      title:'Patient',
      Component:Patient,
      path:'patient',
    },
  ]

  const patient = [
    {
      title:'Patient',
      Component:Patient,
      path:'',
    },
  ]

  return (
    // <Register />
    <>
  <ToastContainer
    theme="colored"
    hideProgressBar
    pauseOnHover
    draggable
    autoClose={5000}
    closeOnClick={true}
    stacked={false}
    position="top-right"
  />
    <QueryClientProvider client={queryClient}>
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
          <Route path='/patient' Component={null}>
            {
              patient.map(route => <Route key={route.title} path={route.path} Component={route.Component} /> )
            }
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
    </>
  )
}

export default App
