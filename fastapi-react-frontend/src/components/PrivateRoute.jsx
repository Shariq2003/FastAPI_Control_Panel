import React from 'react'
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ is_admin, children }) => {
    if (is_admin) {
        return children;
    }
    else {
        return <Navigate to="/login" />
    }
}

export default PrivateRoute
