import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { requestApi, ticketApi } from '../services/api'

export default function Home({ user }) {
    const [requests, setRequests] = useState([])
    const [tickets, setTickets] = useState([])

    useEffect(() => {
        if (user?.id) {
            requestApi.getByUser(user.id)
                .then(res => setRequests(res.requests || []))
                .catch(console.error)
            ticketApi.getByUser(user.id)
                .then(res => setTickets(res.tickets || res || []))
                .catch(console.error)
        }
    }, [user])
    return (
        <div id="page-home" className="page-view active" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ marginBottom: '32px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 700, margin: 0 }}>Good afternoon, {user?.name || 'User'}</h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '4px' }}>Here's what's happening today.</p>
            </div>

            <div className="stats-grid">
                <div className="card stat-card">
                    <p className="stat-label">Active Requests</p>
                    <h2 className="stat-value">32</h2>
                </div>
                <div className="card stat-card">
                    <p className="stat-label">Completed Today</p>
                    <h2 className="stat-value">15</h2>
                </div>
                <div className="card stat-card">
                    <p className="stat-label">Open Tickets</p>
                    <h2 className="stat-value">8</h2>
                </div>
            </div>

            <div className="dashboard-grid">
                <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                    <div className="card-header-inner">
                        <h3 className="card-title">Recent Requests</h3>
                        <Link to="/requests" className="view-all">View All</Link>
                    </div>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Request #</th>
                                <th>Student</th>
                                <th>Items</th>
                                <th>Borrow Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.length > 0 ? requests.slice(0, 5).map(req => (
                                <tr key={req.id}>
                                    <td style={{ fontWeight: 600 }}>REQ-{req.id}</td>
                                    <td>{user?.name || 'Student'}</td>
                                    <td>{req.equipment?.name || 'Equipment Item'}</td>
                                    <td style={{ color: 'var(--text-secondary)' }}>{req.borrowDate}</td>
                                    <td><span className={`status-badge badge-${req.status.toLowerCase()}`}>{req.status}</span></td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: 'center', padding: '24px', color: 'var(--text-secondary)' }}>No recent requests found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="card" style={{ padding: 0, overflow: 'hidden', marginTop: '24px' }}>
                    <div className="card-header-inner">
                        <h3 className="card-title">Recent Tickets</h3>
                        <Link to="/tickets" className="view-all">View All</Link>
                    </div>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Ticket #</th>
                                <th>Priority</th>
                                <th>Description</th>
                                <th>Location</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tickets.length > 0 ? tickets.slice(0, 5).map(ticket => (
                                <tr key={ticket.id}>
                                    <td style={{ fontWeight: 600 }}>TKT-{ticket.id}</td>
                                    <td><span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600 }}><i className="ph-fill ph-warning-circle"></i> STANDARD</span></td>
                                    <td>{ticket.description}</td>
                                    <td style={{ color: 'var(--text-secondary)' }}>{ticket.labLocation} - {ticket.pcNumber}</td>
                                    <td><span className={`status-badge badge-${ticket.status.toLowerCase()}`}>{ticket.status}</span></td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: 'center', padding: '24px', color: 'var(--text-secondary)' }}>No recent tickets found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
