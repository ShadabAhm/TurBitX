import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Dashboard from './pages/Dashboard'
import Notifications from './pages/Notification'
import Settings from './pages/Settings'
import RolesAccess from './pages/RolesAccess'
import Members from './pages/Members'
import Billing from './pages/Billing'
import Profile from './pages/Profile'
import AppLayout from './Layout/AppLayout'
import Campaign from './pages/Campaigns/Campaigns'
import Insights from './pages/Campaigns/Inshights'
import Reports from './pages/Reports'
import Plans from './pages/Plan/Plan'


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const authStatus = localStorage.getItem('trubitx_auth')
    if (authStatus === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogout = () => {
    sessionStorage.removeItem('trubitx_auth')
    sessionStorage.removeItem('trubitx_user')
    setIsAuthenticated(false)
    navigate('/login')
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
      <Route path="/register" element={<Register setIsAuthenticated={setIsAuthenticated} />} />

      {/* Protected routes with AppLayout */}
      {isAuthenticated ? (
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard handleLogout={handleLogout} />} />
          <Route path="/plans" element={<Plans handleLogout={handleLogout} />} />
          <Route path="/campaign" element={<Campaign handleLogout={handleLogout} />} />
          <Route path="/inshight" element={<Insights handleLogout={handleLogout} />} />
          <Route path="/reports" element={<Reports handleLogout={handleLogout} />} />
          <Route path="/notification" element={<Notifications handleLogout={handleLogout} />} />
          <Route path="/settings" element={<Settings handleLogout={handleLogout} />} />
          <Route path="/roles-access" element={<RolesAccess handleLogout={handleLogout} />} />
          <Route path="/members" element={<Members handleLogout={handleLogout} />} />
          <Route path="/billing" element={<Billing handleLogout={handleLogout} />} />
          <Route path="/profile" element={<Profile handleLogout={handleLogout} />} />
        </Route>
      ) : (
        <Route path="*" element={<Navigate to="/login" replace />} />
      )}

      {/* Default redirect */}
      <Route path="*" element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} replace />} />
    </Routes>
  )
}

export default App
