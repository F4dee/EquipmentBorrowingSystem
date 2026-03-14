import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAppContext } from '../context/AppContext'
import '../styles/styles.css'

export function TopNav({ user, onLogout }) {
    const { cartItems, isDarkMode, toggleTheme, globalSearch, setGlobalSearch } = useAppContext()
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const navigate = useNavigate()

    const handleLogout = () => {
        onLogout()
        navigate('/login')
    }

    return (
        <header className="topnav">
            <div className="topnav-container">
                <div className="topnav-left">
                    <Link to="/" className="topnav-logo">
                        <div className="logo-placeholder" style={{ width: '28px', height: '28px', backgroundColor: 'var(--border-color)', borderRadius: '0', marginRight: '12px' }}></div>
                        <span style={{ fontWeight: 700, fontSize: '18px', color: 'var(--text-primary)' }}>Equipment System</span>
                    </Link>
                </div>

                <div className="topnav-center">
                    <div className="topnav-search">
                        <i className="ph ph-magnifying-glass search-icon"></i>
                        <input
                            type="text"
                            placeholder="Search equipment..."
                            className="search-input"
                            value={globalSearch}
                            onChange={(e) => {
                                setGlobalSearch(e.target.value)
                                if (window.location.pathname !== '/catalog') navigate('/catalog')
                            }}
                        />
                    </div>
                </div>

                <div className="topnav-right">
                    <NavLink to="/cart" className="icon-btn" style={{ position: 'relative' }}>
                        <i className="ph ph-shopping-cart"></i>
                        {cartItems && cartItems.length > 0 && (
                            <span style={{ position: 'absolute', top: '0', right: '0', background: 'var(--error-red)', color: 'white', fontSize: '10px', fontWeight: 'bold', width: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'translate(25%, -25%)' }}>
                                {cartItems.length}
                            </span>
                        )}
                    </NavLink>

                    <button className="icon-btn" onClick={toggleTheme} title="Toggle Theme">
                        <i className={isDarkMode ? "ph ph-sun" : "ph ph-moon"}></i>
                    </button>

                    <div className="user-menu-container">
                        <button className="icon-btn" onClick={() => setDropdownOpen(!dropdownOpen)}>
                            <i className="ph ph-user"></i>
                        </button>

                        {dropdownOpen && (
                            <div className="dropdown-menu">
                                <div className="dropdown-header">
                                    <span style={{ fontWeight: 600 }}>{user?.name}</span>
                                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{user?.email}</span>
                                </div>
                                <NavLink to="/profile" className="dropdown-item" onClick={() => setDropdownOpen(false)}>Profile</NavLink>
                                <NavLink to="/requests" className="dropdown-item" onClick={() => setDropdownOpen(false)}>My Requests</NavLink>
                                {user?.role === 'admin' && (
                                    <>
                                        <div className="dropdown-divider"></div>
                                        <NavLink to="/admin" className="dropdown-item" onClick={() => setDropdownOpen(false)}>Admin Dashboard</NavLink>
                                        <NavLink to="/admin-inventory" className="dropdown-item" onClick={() => setDropdownOpen(false)}>Inventory</NavLink>
                                    </>
                                )}
                                <div className="dropdown-divider"></div>
                                <button className="dropdown-item logout-btn" onClick={handleLogout}>Sign Out</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}
