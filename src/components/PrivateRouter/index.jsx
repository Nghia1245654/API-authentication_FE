import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRouter = ({ Children }) => {
    const accessToken = localStorage.getItem('accessToken');
    
    if (!accessToken) {
        return <Navigate to="/login" replace />;
    }
    
    return <Children />;
};

export default PrivateRouter
