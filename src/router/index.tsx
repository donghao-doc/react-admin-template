import { lazy } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'

const Dashboard = lazy(() => import('@/pages/dashboard'))
const AdminLayout = lazy(() => import('@/layout'))
const Login = lazy(() => import('@/pages/login'))
const NotFound = lazy(() => import('@/pages/404'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/404',
    element: <NotFound />,
  },
  {
    path: '*',
    element: <Navigate to="/404" replace />,
  },
])

export default router
