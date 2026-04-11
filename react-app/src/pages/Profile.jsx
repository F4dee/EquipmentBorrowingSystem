import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { requestApi } from '../services/api'

export default function Profile({ user }) {
    const [history, setHistory] = useState([])

    useEffect(() => {
        if (user?.id) {
            requestApi.getByUser(user.id).then(res => setHistory(res.requests || [])).catch(console.error)
        }
    }, [user])

    const downloadCSV = () => {
        if (!history || history.length === 0) return alert("No history to download");

        const headers = ["Request ID", "Equipment Name", "Borrow Date", "Return Date", "Status"];
        const rows = history.map(req => [
            `REQ-${req.id}`,
            req.equipment?.name || 'Unknown',
            req.borrowDate,
            req.returnDate,
            req.status
        ]);

        const csvContent = [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.setAttribute("download", `borrowing_history_${user.name.replace(/\s+/g, '_')}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (
        <div id="page-profile" className="page-view active" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ marginBottom: '32px' }}>
                <h1 className="page-title" style={{ margin: 0, fontSize: '24px' }}>User Profile</h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '4px' }}>Manage your account and view borrowing history</p>
            </div>

            <div className="profile-layout">
                {/* Left Sidebar */}
                <div className="profile-sidebar">
                    <div className="profile-card">
                        <div className="profile-avatar-box">
                            <div className="avatar-placeholder">
                                <i className="ph ph-user"></i>
                            </div>
                        </div>
                        <h2 className="profile-name-text">{user?.name || 'John Smith'}</h2>
                        <p className="profile-id-text">Student ID: STU-2024-001</p>

                        <div className="profile-contact-info">
                            <div className="info-row">
                                <i className="ph ph-envelope-simple"></i>
                                <span>{user?.email || 'john.smith@university.edu'}</span>
                            </div>
                            <div className="info-row">
                                <i className="ph ph-phone"></i>
                                <span>{user?.phone || '+63 (000) 000-0000'}</span>
                            </div>
                            <div className="info-row">
                                <i className="ph ph-calendar-blank"></i>
                                <span>Joined: {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'}) : new Date().toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})}</span>
                            </div>
                        </div>

                        <Link to="/settings" className="btn btn-primary btn-full" style={{ marginBottom: '8px', padding: '12px', boxSizing: 'border-box', justifyContent: 'center' }}>
                            <i className="ph ph-gear"></i> Edit Profile
                        </Link>
                    </div>

                    <div className="account-status-card">
                        <h3 className="status-header">ACCOUNT STATUS</h3>
                        <div className="status-row">
                            <span>Status:</span>
                            <span className="badge-active">ACTIVE</span>
                        </div>
                        <div className="status-row">
                            <span>Reputation:</span>
                            <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '13px' }}>Excellent</span>
                        </div>
                    </div>
                </div>

                {/* Right Main Content */}
                <div className="profile-main">
                    <div className="profile-stats-row">
                        <div className="stat-box">
                            <i className="ph ph-package stat-icon"></i>
                            <h2 className="stat-number">15</h2>
                            <p className="stat-label-text">Total Borrows</p>
                        </div>
                        <div className="stat-box">
                            <i className="ph ph-clock stat-icon"></i>
                            <h2 className="stat-number">2</h2>
                            <p className="stat-label-text">Active Requests</p>
                        </div>
                        <div className="stat-box">
                            <i className="ph ph-check-circle stat-icon"></i>
                            <h2 className="stat-number">13</h2>
                            <p className="stat-label-text">Completed</p>
                        </div>
                    </div>

                    <div className="history-section">
                        <div className="history-header">
                            <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0 }}>Borrowing History</h3>
                            <Link to="/requests" style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>View All</Link>
                        </div>
                        <div className="history-list">
                            {history.length > 0 ? history.map(req => (
                                <div className="history-card" key={req.id}>
                                    <div className="history-top">
                                        <div>
                                            <h4 style={{ margin: '0 0 4px 0', fontSize: '14px' }}>REQ-{req.id}</h4>
                                            <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)' }}>{req.borrowDate} &rarr; {req.returnDate}</p>
                                        </div>
                                        <span className={`status-badge badge-${req.status.toLowerCase()}`}>{req.status}</span>
                                    </div>
                                    <ul className="history-items">
                                        <li>{req.equipment?.name || 'Equipment Item'}</li>
                                    </ul>
                                </div>
                            )) : (
                                <p style={{ color: 'var(--text-secondary)', padding: '16px' }}>No borrowing history found.</p>
                            )}
                        </div>
                    </div>

                    <div className="quick-actions-section">
                        <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>Quick Actions</h3>
                        <div className="actions-grid">
                            <Link to="/catalog" className="btn btn-outline" style={{ justifyContent: 'center', padding: '12px' }}>Browse Equipment</Link>
                            <Link to="/requests" className="btn btn-outline" style={{ justifyContent: 'center', padding: '12px' }}>My Requests</Link>
                            <Link to="/report" className="btn btn-outline" style={{ justifyContent: 'center', padding: '12px' }}>Report Issue</Link>
                            <button onClick={downloadCSV} className="btn btn-primary" style={{ justifyContent: 'center', padding: '12px' }}>Download History</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
