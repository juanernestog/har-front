import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from './UserContext';

export default function ProtectedRoute({ children }) {
  const { user } = useContext(UserContext);

  if (!user?.username) {
    return <Navigate to="/login" />;
  }

  return children;
}
