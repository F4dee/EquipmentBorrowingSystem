import { NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'

export function Sidebar({ user, onLogout }) {
    const [adminOpen, setAdminOpen] = useState(false)
    const navigate = useNavigate()

    const handleLogout = () => {
        onLogout()
        navigate('/login')
    }

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <div className="logo-placeholder"></div>
                <div className="logo-text">
                    <span>EQUIPMENT</span>
                    <span>BORROWING SYSTEM</span>
                </div>
            </div>
            <nav className="sidebar-nav">
                <div className="nav-section">
                    <p className="nav-section-title">MAIN MENU</p>
                    <NavLink to="/" className="nav-item">
                        <i className="ph ph-house"></i>
                        Home
                    </NavLink>
                    <NavLink to="/catalog" className="nav-item">
                        <i className="ph ph-list-dashes"></i>
                        Catalog
                    </NavLink>
                    <NavLink to="/cart" className="nav-item">
                        <i className="ph ph-shopping-cart"></i>
                        Cart
                    </NavLink>
                    <NavLink to="/requests" className="nav-item">
                        <i className="ph ph-file-text"></i>
                        Requests
                    </NavLink>
                    <NavLink to="/report" className="nav-item">
                        <i className="ph ph-warning"></i>
                        Report
                    </NavLink>
                </div>

                {user?.role === 'admin' && (
                    <div className="nav-section">
                        <p className="nav-section-title">ADMINISTRATION</p>
                        <div className="nav-group">
                            <button
                                className="nav-item nav-group-header"
                                onClick={() => setAdminOpen(!adminOpen)}
                                style={{ width: '100%', border: 'none', background: 'transparent', textAlign: 'left', cursor: 'pointer' }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <i className="ph ph-gear"></i>
                                    Admin
                                </div>
                                <i className={`ph ph-caret-down nav-group-icon ${adminOpen ? 'open' : ''}`}></i>
                            </button>
                            {adminOpen && (
                                <div className="nav-group-items">
                                    <NavLink to="/admin" className="nav-item">Dashboard</NavLink>
                                    <NavLink to="/admin-inventory" className="nav-item">Inventory</NavLink>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                <div className="nav-section">
                    <p className="nav-section-title">PERSONAL</p>
                    <NavLink to="/profile" className="nav-item">
                        <i className="ph ph-user"></i>
                        Profile
                    </NavLink>
                    <NavLink to="/settings" className="nav-item">
                        <i className="ph ph-sliders"></i>
                        Settings
                    </NavLink>
                </div>

                <div className="nav-section">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <p className="nav-section-title" style={{ marginBottom: 0 }}>RECENT PAGES</p>
                        <button className="btn btn-outline" style={{ padding: '2px 4px', fontSize: '12px', border: 'none' }}>
                            <i className="ph ph-plus"></i>
                        </button>
                    </div>
                    <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <NavLink to="/item/4" className="nav-item" style={{ fontSize: '13px', padding: '6px 12px' }}>
                            <i className="ph ph-clock-counter-clockwise"></i>
                            item/4
                        </NavLink>
                    </div>
                </div>
            </nav>

            <div style={{ padding: '16px 24px', borderTop: '1px solid var(--border-color)', marginTop: 'auto' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <img src={`https://ui-avatars.com/api/?name=${user?.name?.replace(' ', '+')}&background=E5E7EB&color=111827`} alt="User avatar" style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
                    <div>
                        <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>{user?.name}</p>
                        <p style={{ fontSize: '11px', color: 'var(--text-secondary)', margin: 0, textTransform: 'uppercase' }}>{user?.role}</p>
                    </div>
                </div>
                <button onClick={handleLogout} className="btn btn-outline" style={{ width: '100%', justifyContent: 'center', color: 'var(--error-red)', borderColor: 'var(--error-red)' }}>
                    <i className="ph ph-sign-out"></i> Logout
                </button>
            </div>
        </aside>
    )
}
