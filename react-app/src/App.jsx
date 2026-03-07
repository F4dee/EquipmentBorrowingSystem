import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { useAppContext } from './context/AppContext'
import { TopNav } from './components/TopNav'
import Login from './pages/Login'
import Home from './pages/Home'
import Register from './pages/Register'
import Catalog from './pages/Catalog'
import ItemDetail from './pages/ItemDetail'
import Cart from './pages/Cart'
import Requests from './pages/Requests'
import Report from './pages/Report'
import Admin from './pages/Admin'
import AdminInventory from './pages/AdminInventory'
import Profile from './pages/Profile'
import Settings from './pages/Settings'

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
