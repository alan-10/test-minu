import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CreateUserPage } from './pages/CreateUserPage';
import { Login } from './pages/Login';
import { Home } from './pages/Home'
import { UserPage } from './pages/UserPage';

import { useAuth } from './hook/UseAuth'
import { Navigate } from "react-router-dom";

interface ProtectedRouteChildren {
  children: React.ReactNode
}

export const ProtectedRoute = ({ children }: ProtectedRouteChildren) => {
  const {user }  = useAuth();
  
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/new-user",
    element: <CreateUserPage />,
  }, 
  {
    path: "/home",
    element: <ProtectedRoute><Home /></ProtectedRoute> 
  }, 
  {
    path: "/user",
    element: <ProtectedRoute><UserPage /></ProtectedRoute>
  }
])



export function MainRoutes() {
  return (
    <RouterProvider router={Router} />
  )
}