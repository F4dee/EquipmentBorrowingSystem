import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { useAppContext } from '@/core/context/AppContext'
import { TopNav } from '@/core/components/TopNav'
import Login from '@/features/auth/Login'
import Home from '@/core/pages/Home'
import Register from '@/features/auth/Register'
import Catalog from '@/features/equipment/Catalog'
import ItemDetail from '@/features/equipment/ItemDetail'
import Cart from '@/features/borrowing/Cart'
import Requests from '@/features/borrowing/Requests'
import Tickets from '@/features/maintenance/Tickets'
import Report from '@/features/admin/Report'
import Admin from '@/features/admin/Admin'
import AdminInventory from '@/features/admin/AdminInventory'
import Profile from '@/features/user/Profile'
import Settings from '@/features/user/Settings'

// Protected Route Wrapper
const ProtectedRoute = ({ user, children, requiredRole }) => {
  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" replace />
  }

  return children
}

function App() {
  const { user, login, logout } = useAppContext()
  const location = useLocation()
  const isAuthPage = location.pathname === '/register' || location.pathname === '/login'

  return (
    <div className={`app-container ${isAuthPage ? 'auth-layout' : 'main-layout'}`}>
      {!isAuthPage && user && <TopNav user={user} onLogout={logout} />}
      <main className={isAuthPage ? '' : 'main-content'}>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login onLogin={login} />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes (Any logged in user) */}
          <Route path="/" element={<ProtectedRoute user={user}><Home user={user} /></ProtectedRoute>} />
          <Route path="/catalog" element={<ProtectedRoute user={user}><Catalog /></ProtectedRoute>} />
          <Route path="/item/:id" element={<ProtectedRoute user={user}><ItemDetail /></ProtectedRoute>} />
          <Route path="/cart" element={<ProtectedRoute user={user}><Cart /></ProtectedRoute>} />
          <Route path="/requests" element={<ProtectedRoute user={user}><Requests /></ProtectedRoute>} />
          <Route path="/tickets" element={<ProtectedRoute user={user}><Tickets /></ProtectedRoute>} />
          <Route path="/report" element={<ProtectedRoute user={user}><Report /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute user={user}><Profile user={user} /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute user={user}><Settings /></ProtectedRoute>} />

          {/* Admin Only Routes */}
          <Route path="/admin" element={<ProtectedRoute user={user} requiredRole="admin"><Admin /></ProtectedRoute>} />
          <Route path="/admin-inventory" element={<ProtectedRoute user={user} requiredRole="admin"><AdminInventory /></ProtectedRoute>} />
        </Routes>
      </main>
    </div>
  )
}

export default App
