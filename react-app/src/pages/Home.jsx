export default function Home({ user }) {
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
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ fontWeight: 600 }}>REQ-045</td>
                                <td>John Smith</td>
                                <td>2</td>
                                <td style={{ color: 'var(--text-secondary)' }}>Feb 28</td>
                                <td><span className="status-badge badge-pending">PENDING</span></td>
                            </tr>
                            <tr>
                                <td style={{ fontWeight: 600 }}>REQ-044</td>
                                <td>Sarah Johnson</td>
                                <td>1</td>
                                <td style={{ color: 'var(--text-secondary)' }}>Feb 28</td>
                                <td><span className="status-badge badge-approved">APPROVED</span></td>
                            </tr>
                            <tr>
                                <td style={{ fontWeight: 600 }}>REQ-043</td>
                                <td>Mike Chen</td>
                                <td>3</td>
                                <td style={{ color: 'var(--text-secondary)' }}>Feb 27</td>
                                <td><span className="status-badge badge-borrowed">BORROWED</span></td>
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
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ fontWeight: 600 }}>TKT-128</td>
                                <td><span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#DC2626', fontSize: '12px', fontWeight: 600 }}><i className="ph-fill ph-warning-circle"></i> HIGH</span></td>
                                <td>Laptop won't power on</td>
                                <td style={{ color: 'var(--text-secondary)' }}>Lab 1 - PC-042</td>
                                <td><span className="status-badge badge-open">OPEN</span></td>
                            </tr>
                            <tr>
                                <td style={{ fontWeight: 600 }}>TKT-127</td>
                                <td><span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#D97706', fontSize: '12px', fontWeight: 600 }}><i className="ph-fill ph-warning-circle"></i> MEDIUM</span></td>
                                <td>Broken HDMI port</td>
                                <td style={{ color: 'var(--text-secondary)' }}>Bldg A - EQ-015</td>
                                <td><span className="status-badge badge-progress">IN PROGRESS</span></td>
                            </tr>
                            <tr>
                                <td style={{ fontWeight: 600 }}>TKT-126</td>
                                <td><span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#059669', fontSize: '12px', fontWeight: 600 }}><i className="ph-fill ph-check-circle"></i> LOW</span></td>
                                <td>Mouse not working</td>
                                <td style={{ color: 'var(--text-secondary)' }}>Lab 3 - PC-128</td>
                                <td><span className="status-badge badge-open">OPEN</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
