import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout/index.jsx'
import React from 'react'
import { Toaster } from 'react-hot-toast'
import Login from './pages/Login/index.jsx'
import SignUp from './pages/Signup/index.jsx'
import UserManagement from './pages/UserManagement/index.jsx'
import Profile from './pages/Profile/index.jsx'
import DashBoard from './pages/DashBoard/index.jsx'
import Projects from './pages/Projects/index.jsx'
import PrivateRouter from './components/PrivateRouter/index.jsx'


function App() {

  return (
    <>
    <BrowserRouter>
          <Toaster  className="top-20 right-20" />
      <Routes>
        <Route index element={<Navigate to="/login" replace />} />
           <Route path="/login" element={<Login />} />     
           <Route path="/signup" element={<SignUp />} />     
        <Route path="/home" element={<PrivateRouter Children ={Layout} />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DashBoard />} />
          <Route path="projects" element={<Projects />} />
          <Route path="userManagement" element={<UserManagement />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
