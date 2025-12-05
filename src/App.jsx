import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout/index.jsx'
import React from 'react'

import { Toaster } from 'react-hot-toast'

import Login from './pages/Login/index.jsx'
import SignUp from './pages/Signup/index.jsx'
import UserManagement from './pages/UserManagement/index.jsx'
import Profile from './pages/Profile/index.jsx'

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const accessToken = localStorage.getItem('accessToken');
  
  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {

  return (
    <>
    <BrowserRouter>
          <Toaster  className="top-20 right-20" />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
           <Route path="/login" element={<Login />} />     
           <Route path="/signup" element={<SignUp />} />     
         
        <Route path="/home" element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
        <Route index element={<Navigate to="userManagement" replace />} />
          <Route path="userManagement" element={<UserManagement />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
