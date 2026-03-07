import { Link } from 'react-router-dom'

export default function Admin() {
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
                    <h2 className="stat-value">12</h2>
                </div>
                <div className="card stat-card">
                    <p className="stat-label">Active Loans</p>
                    <h2 className="stat-value">8</h2>
                </div>
                <div className="card stat-card">
                    <p className="stat-label">Open Tickets</p>
                    <h2 className="stat-value">5</h2>
                </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
                <Link to="/admin-inventory" className="btn btn-primary"><i className="ph ph-plus"></i> Add New Equipment</Link>
                <button className="btn btn-outline"><i className="ph ph-file-text"></i> Generate Report</button>
                <button className="btn btn-outline"><i className="ph ph-download-simple"></i> Export Data</button>
            </div>

            <div className="dashboard-grid">
                <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                    <div className="card-header-inner">
                        <h3 className="card-title">Recent Requests</h3>
                        <a href="#" className="view-all">View All</a>
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
                            <tr>
                                <td style={{ fontWeight: 600 }}>REQ-045</td>
                                <td>John Smith</td>
                                <td>2</td>
                                <td style={{ color: 'var(--text-secondary)' }}>Feb 28</td>
                                <td><span className="status-badge badge-pending">PENDING</span></td>
                                <td style={{ textAlign: 'right' }}>
                                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                        <button className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '13px', color: 'var(--success-green)', borderColor: 'var(--success-green)' }}><i className="ph-fill ph-check-circle"></i> Approve</button>
                                        <button className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '13px', color: 'var(--error-red)', borderColor: 'var(--error-red)' }}><i className="ph-fill ph-x-circle"></i> Deny</button>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ fontWeight: 600 }}>REQ-044</td>
                                <td>Sarah Johnson</td>
                                <td>1</td>
                                <td style={{ color: 'var(--text-secondary)' }}>Feb 28</td>
                                <td><span className="status-badge badge-approved">APPROVED</span></td>
                                <td style={{ textAlign: 'right' }}>
                                    <button className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '13px', border: 'none', background: 'transparent' }}><i className="ph ph-eye"></i> View</button>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ fontWeight: 600 }}>REQ-043</td>
                                <td>Mike Chen</td>
                                <td>3</td>
                                <td style={{ color: 'var(--text-secondary)' }}>Feb 27</td>
                                <td><span className="status-badge badge-borrowed">BORROWED</span></td>
                                <td style={{ textAlign: 'right' }}>
                                    <button className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '13px', border: 'none', background: 'transparent' }}><i className="ph ph-eye"></i> View</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="card" style={{ padding: 0, overflow: 'hidden', marginTop: '24px' }}>
                    <div className="card-header-inner">
                        <h3 className="card-title">Recent Tickets</h3>
                        <a href="#" className="view-all">View All</a>
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
                            <tr>
                                <td style={{ fontWeight: 600 }}>TKT-128</td>
                                <td><span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#DC2626', fontSize: '12px', fontWeight: 600 }}><i className="ph-fill ph-warning-circle"></i> HIGH</span></td>
                                <td>Laptop won't power on</td>
                                <td style={{ color: 'var(--text-secondary)' }}>Lab 1 - PC-042</td>
                                <td><span className="status-badge badge-open">OPEN</span></td>
                                <td style={{ textAlign: 'right' }}><button className="btn btn-outline" style={{ padding: '6px 16px', fontSize: '13px' }}>Update</button></td>
                            </tr>
                            <tr>
                                <td style={{ fontWeight: 600 }}>TKT-127</td>
                                <td><span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#D97706', fontSize: '12px', fontWeight: 600 }}><i className="ph-fill ph-warning-circle"></i> MEDIUM</span></td>
                                <td>Broken HDMI port</td>
                                <td style={{ color: 'var(--text-secondary)' }}>Bldg A - EQ-015</td>
                                <td><span className="status-badge badge-progress">IN PROGRESS</span></td>
                                <td style={{ textAlign: 'right' }}><button className="btn btn-outline" style={{ padding: '6px 16px', fontSize: '13px' }}>Update</button></td>
                            </tr>
                            <tr>
                                <td style={{ fontWeight: 600 }}>TKT-126</td>
                                <td><span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#059669', fontSize: '12px', fontWeight: 600 }}><i className="ph-fill ph-check-circle"></i> LOW</span></td>
                                <td>Mouse not working</td>
                                <td style={{ color: 'var(--text-secondary)' }}>Lab 3 - PC-128</td>
                                <td><span className="status-badge badge-open">OPEN</span></td>
                                <td style={{ textAlign: 'right' }}><button className="btn btn-outline" style={{ padding: '6px 16px', fontSize: '13px' }}>Update</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
