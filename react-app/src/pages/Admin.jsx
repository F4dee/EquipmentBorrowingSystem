import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { requestApi, ticketApi } from '../services/api'
import { useAppContext } from '../context/AppContext'

export default function Admin() {
    const { showToast } = useAppContext()
    const [requests, setRequests] = useState([])
    const [tickets, setTickets] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate();

    const loadRequestsAndTickets = async () => {
        try {
            const [reqData, ticketData] = await Promise.all([
                requestApi.getAll(),
                ticketApi.getAll()
            ])
            setRequests(reqData.requests || [])
            setTickets(ticketData.tickets || [])
        } catch (err) {
            console.error("Failed to load data", err)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        loadRequestsAndTickets()
    }, [])

    const handleUpdateStatus = async (id, newStatus) => {
        try {
            await requestApi.updateStatus(id, newStatus)
            showToast(`Request ${id} marked as ${newStatus}`)
            // Reload the requests after update
            loadRequestsAndTickets()
        } catch (err) {
            showToast("Failed to update status: " + err.message, "error")
        }
    }

    const pendingCount = requests.filter(r => r.status === 'PENDING').length
    const activeCount = requests.filter(r => r.status === 'APPROVED' || r.status === 'BORROWED').length

    const downloadCSV = (dataList, filename, headers, rowMapper) => {
        if (!dataList) return showToast("No data available to export", "error");

        const rows = dataList.map(rowMapper);
        const csvContent = [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const exportRequests = () => {
        downloadCSV(
            requests,
            "admin_requests_report.csv",
            ["Request ID", "User", "Equipment", "Borrow Date", "Return Date", "Status"],
            req => [`REQ-${req.id}`, req.user?.name || 'Unknown', req.equipment?.name || 'Unknown', req.borrowDate, req.returnDate, req.status]
        );
    }

    const exportTickets = () => {
        downloadCSV(
            tickets,
            "admin_tickets_report.csv",
            ["Ticket ID", "User", "Location", "PC Number", "Description", "Status"],
            tkt => [`TKT-${tkt.id}`, tkt.user?.name || 'Unknown', tkt.labLocation, tkt.pcNumber, `"${tkt.description}"`, tkt.status]
        );
    }

    return (
        <div id="page-admin" className="page-view active" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <h1 className="page-title" style={{ margin: 0 }}>Admin Dashboard</h1>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', background: 'white', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '8px 16px' }}>
                    <i className="ph ph-calendar" style={{ color: 'var(--text-secondary)', fontSize: '18px' }}></i>
                    <span style={{ fontSize: '14px', fontWeight: 500 }}>Feb 28, 2026 - Mar 02, 2026</span>
                    <i className="ph ph-caret-down" style={{ color: 'var(--text-secondary)', marginLeft: '8px' }}></i>
                </div>
            </div>

            <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
                <div className="card stat-card">
                    <p className="stat-label">Total Equipment</p>
                    <h2 className="stat-value">156</h2>
                </div>
                <div className="card stat-card">
                    <p className="stat-label">Pending Requests</p>
                    <h2 className="stat-value">{isLoading ? '-' : pendingCount}</h2>
                </div>
                <div className="card stat-card">
                    <p className="stat-label">Active Loans</p>
                    <h2 className="stat-value">{isLoading ? '-' : activeCount}</h2>
                </div>
                <div className="card stat-card">
                    <p className="stat-label">Open Tickets</p>
                    <h2 className="stat-value">{isLoading ? '-' : tickets.filter(t => t.status === 'OPEN').length}</h2>
                </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
                <Link to="/admin-inventory" className="btn btn-primary"><i className="ph ph-plus"></i> Add New Equipment</Link>
                <button className="btn btn-outline" onClick={exportRequests}><i className="ph ph-file-text"></i> Generate Report (Requests)</button>
                <button className="btn btn-outline" onClick={exportTickets}><i className="ph ph-download-simple"></i> Export Data (Tickets)</button>
            </div>

            <div className="dashboard-grid">
                <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                    <div className="card-header-inner">
                        <h3 className="card-title">Recent Requests</h3>
                    </div>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Request #</th>
                                <th>Student</th>
                                <th>Items</th>
                                <th>Borrow Date</th>
                                <th>Status</th>
                                <th style={{ textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: 'center', padding: '24px' }}>Loading requests...</td>
                                </tr>
                            ) : requests.length > 0 ? requests.slice().reverse().map(req => (
                                <tr key={req.id}>
                                    <td style={{ fontWeight: 600 }}>REQ-{req.id}</td>
                                    <td>{req.user?.name || 'Unknown Student'}</td>
                                    <td>{req.equipment?.name || 'Unknown Item'}</td>
                                    <td style={{ color: 'var(--text-secondary)' }}>{req.borrowDate}</td>
                                    <td><span className={`status-badge badge-${req.status.toLowerCase()}`}>{req.status}</span></td>
                                    <td style={{ textAlign: 'right' }}>
                                        {req.status === 'PENDING' ? (
                                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                                <button className="btn btn-outline" onClick={() => handleUpdateStatus(req.id, 'APPROVED')} style={{ padding: '6px 12px', fontSize: '13px', color: 'var(--success-green)', borderColor: 'var(--success-green)' }}><i className="ph-fill ph-check-circle"></i> Approve</button>
                                                <button className="btn btn-outline" onClick={() => handleUpdateStatus(req.id, 'DENIED')} style={{ padding: '6px 12px', fontSize: '13px', color: 'var(--error-red)', borderColor: 'var(--error-red)' }}><i className="ph-fill ph-x-circle"></i> Deny</button>
                                            </div>
                                        ) : req.status === 'APPROVED' ? (
                                            <button className="btn btn-outline" onClick={() => handleUpdateStatus(req.id, 'BORROWED')} style={{ padding: '6px 12px', fontSize: '13px' }}>Mark Picked Up</button>
                                        ) : req.status === 'BORROWED' ? (
                                            <button className="btn btn-outline" onClick={() => handleUpdateStatus(req.id, 'RETURNED')} style={{ padding: '6px 12px', fontSize: '13px' }}>Mark Returned</button>
                                        ) : (
                                            <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Resolved</span>
                                        )}
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: 'center', padding: '24px' }}>No requests found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="card" style={{ padding: 0, overflow: 'hidden', marginTop: '24px' }}>
                    <div className="card-header-inner">
                        <h3 className="card-title">Recent Tickets</h3>
                    </div>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Ticket #</th>
                                <th>Priority</th>
                                <th>Description</th>
                                <th>Location</th>
                                <th>Status</th>
                                <th style={{ textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: 'center', padding: '24px' }}>Loading tickets...</td>
                                </tr>
                            ) : tickets.length > 0 ? tickets.slice().reverse().map(ticket => (
                                <tr key={ticket.id}>
                                    <td style={{ fontWeight: 600 }}>TKT-{ticket.id}</td>
                                    <td><span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#D97706', fontSize: '12px', fontWeight: 600 }}><i className="ph-fill ph-warning-circle"></i> STANDARD</span></td>
                                    <td>{ticket.description}</td>
                                    <td style={{ color: 'var(--text-secondary)' }}>{ticket.labLocation} - {ticket.pcNumber}</td>
                                    <td><span className={`status-badge badge-${ticket.status.toLowerCase()}`}>{ticket.status}</span></td>
                                    <td style={{ textAlign: 'right' }}><button className="btn btn-outline" style={{ padding: '6px 16px', fontSize: '13px' }}>View</button></td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: 'center', padding: '24px' }}>No tickets found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
