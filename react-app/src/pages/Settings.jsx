import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

export default function Settings() {
    const { user, updateUser } = useAppContext()
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState('Account Settings')

    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
    })

    const [notifications, setNotifications] = useState({
        systemEmails: true,
        ticketUpdates: true,
        returnReminders: true,
        marketing: false
    })

    useEffect(() => {
        if (user) {
            setFormData({ name: user.name, email: user.email })
        }
    }, [user])

    const handleSaveAccount = (e) => {
        e.preventDefault()
        updateUser(formData)
        alert('Account settings saved successfully!')
    }

    const handleSaveNotifications = () => {
        alert('Notification preferences updated!')
    }

    return (
        <div id="page-settings" className="page-view active" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ marginBottom: '24px' }}>
                <Link to="/profile" className="text-btn" style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <i className="ph ph-arrow-left"></i> Back to Profile
                </Link>
            </div>
            <h1 className="page-title">Settings</h1>

            <div className="tabs-container">
                {['Account Settings', 'Notification Preferences'].map(tab => (
                    <div
                        key={tab}
                        className={`tab ${activeTab === tab ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </div>
                ))}
            </div>

            <div className="card" style={{ padding: '32px' }}>
                {activeTab === 'Account Settings' && (
                    <div className="settings-section">
                        <h3 style={{ fontSize: '18px', marginBottom: '24px', fontWeight: 600 }}>Account Settings</h3>
                        <form onSubmit={handleSaveAccount}>
                            <div className="form-group">
                                <label className="form-label">Full Name</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Email Address</label>
                                <input
                                    type="email"
                                    className="form-input"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </div>
                            <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid var(--border-color)' }}>
                                <button type="submit" className="btn btn-primary" style={{ padding: '10px 24px' }}>Save Profile</button>
                            </div>
                        </form>
                    </div>
                )}

                {activeTab === 'Notification Preferences' && (
                    <div className="settings-section">
                        <h3 style={{ fontSize: '18px', marginBottom: '24px', fontWeight: 600 }}>Notification Preferences</h3>

                        <div className="toggle-switch">
                            <div className="toggle-label">
                                <span className="toggle-title">System Emails</span>
                                <span className="toggle-desc">Receive emails for request approvals and denials.</span>
                            </div>
                            <label className="switch">
                                <input type="checkbox" checked={notifications.systemEmails} onChange={e => setNotifications({ ...notifications, systemEmails: e.target.checked })} />
                                <span className="slider"></span>
                            </label>
                        </div>

                        <div className="toggle-switch">
                            <div className="toggle-label">
                                <span className="toggle-title">Ticket Updates</span>
                                <span className="toggle-desc">Receive emails when your reported tickets change status.</span>
                            </div>
                            <label className="switch">
                                <input type="checkbox" checked={notifications.ticketUpdates} onChange={e => setNotifications({ ...notifications, ticketUpdates: e.target.checked })} />
                                <span className="slider"></span>
                            </label>
                        </div>

                        <div className="toggle-switch">
                            <div className="toggle-label">
                                <span className="toggle-title">Return Reminders</span>
                                <span className="toggle-desc">Receive a reminder email 1 day before equipment is due.</span>
                            </div>
                            <label className="switch">
                                <input type="checkbox" checked={notifications.returnReminders} onChange={e => setNotifications({ ...notifications, returnReminders: e.target.checked })} />
                                <span className="slider"></span>
                            </label>
                        </div>

                        <div className="toggle-switch">
                            <div className="toggle-label">
                                <span className="toggle-title">Marketing & Promotions</span>
                                <span className="toggle-desc">Receive emails about new equipment and system updates.</span>
                            </div>
                            <label className="switch">
                                <input type="checkbox" checked={notifications.marketing} onChange={e => setNotifications({ ...notifications, marketing: e.target.checked })} />
                                <span className="slider"></span>
                            </label>
                        </div>

                        <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid var(--border-color)' }}>
                            <button onClick={handleSaveNotifications} className="btn btn-primary" style={{ padding: '10px 24px' }}>Save Preferences</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
