import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../Services/AuthContext';

const PrivateRoute = ({ requiredRole }) => {
  const { isAuthenticated, isAdmin } = useContext(AuthContext);

  if (!isAuthenticated) {
    // Redirect unauthenticated users to the login page
    return <Navigate to="/" replace />;
  }

  // Determine the user's role
  const userRole = isAdmin ? 'ADMIN' : 'USER';

  if (userRole !== requiredRole) {
    // If the user is an admin but trying to access a user route, redirect to /admin/dashboard
    if (userRole === 'ADMIN') {
      return <Navigate to="/admin/dashboard" replace />;
    }
    // If the user is a normal user but trying to access an admin route, redirect to /dashboard
    return <Navigate to="/dashboard" replace />;
  }

  // If the roles match, render the child route(s)
  return <Outlet />;
};

export default PrivateRoute;
