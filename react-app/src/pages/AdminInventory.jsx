export default function AdminInventory() {
    return (
        <div id="page-admin-inventory" className="page-view active" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h1 className="page-title">Inventory Management</h1>
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ padding: '24px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
                    <button className="btn btn-primary"><i className="ph ph-plus"></i> Add New Item</button>
                    <div style={{ display: 'flex', gap: '12px', flex: 1, maxWidth: 600 }}>
                        <div className="search-wrapper" style={{ flex: 1 }}>
                            <i className="ph ph-magnifying-glass"></i>
                            <input type="text" className="search-input" placeholder="Search inventory..." />
                        </div>
                        <select className="form-input" style={{ width: 160 }} defaultValue="All Categories">
                            <option>All Categories</option>
                            <option>Router</option>
                            <option>Switch</option>
                        </select>
                        <select className="form-input" style={{ width: 160 }} defaultValue="All Statuses">
                            <option>All Statuses</option>
                            <option>Available</option>
                            <option>Out of Stock</option>
                        </select>
                    </div>
                </div>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th style={{ textAlign: 'center' }}>Total Qty</th>
                            <th style={{ textAlign: 'center' }}>Available</th>
                            <th>Status</th>
                            <th style={{ textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div style={{ width: '40px', height: '40px', background: 'var(--bg-page)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', fontSize: '24px' }}>
                                    <i className="ph ph-router"></i>
                                </div>
                            </td>
                            <td style={{ fontWeight: 600 }}>Router TP-Link</td>
                            <td style={{ color: 'var(--text-secondary)' }}>Router</td>
                            <td style={{ textAlign: 'center' }}>10</td>
                            <td style={{ textAlign: 'center' }}>5</td>
                            <td><span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--success-green)', fontSize: '13px', fontWeight: 500 }}><i className="ph-fill ph-circle"></i> Available</span></td>
                            <td style={{ textAlign: 'right' }}>
                                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                    <button className="btn btn-outline" style={{ padding: '6px', fontSize: '16px', border: 'none', background: 'transparent', color: 'var(--text-secondary)' }}><i className="ph ph-pencil-simple"></i></button>
                                    <button className="btn btn-outline" style={{ padding: '6px', fontSize: '16px', border: 'none', background: 'transparent', color: 'var(--error-red)' }}><i className="ph ph-trash"></i></button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div style={{ width: '40px', height: '40px', background: 'var(--bg-page)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', fontSize: '24px' }}>
                                    <i className="ph ph-plugs"></i>
                                </div>
                            </td>
                            <td style={{ fontWeight: 600 }}>Network Hub</td>
                            <td style={{ color: 'var(--text-secondary)' }}>Hub</td>
                            <td style={{ textAlign: 'center' }}>4</td>
                            <td style={{ textAlign: 'center' }}>0</td>
                            <td><span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--error-red)', fontSize: '13px', fontWeight: 500 }}><i className="ph-fill ph-circle"></i> Out of Stock</span></td>
                            <td style={{ textAlign: 'right' }}>
                                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                    <button className="btn btn-outline" style={{ padding: '6px', fontSize: '16px', border: 'none', background: 'transparent', color: 'var(--text-secondary)' }}><i className="ph ph-pencil-simple"></i></button>
                                    <button className="btn btn-outline" style={{ padding: '6px', fontSize: '16px', border: 'none', background: 'transparent', color: 'var(--error-red)' }}><i className="ph ph-trash"></i></button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div style={{ padding: '16px 24px', borderTop: '1px solid var(--border-color)' }}>
                    <div className="pagination">
                        <button className="page-btn text-btn" disabled>Previous</button>
                        <button className="page-btn active">1</button>
                        <button className="page-btn">2</button>
                        <button className="page-btn" style={{ border: 'none', pointerEvents: 'none', background: 'transparent' }}>...</button>
                        <button className="page-btn">10</button>
                        <button className="page-btn text-btn">Next</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
