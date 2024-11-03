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
        </Routes>
      </Router>
    </QueryClientProvider>
    </>
  )
}

export default App
