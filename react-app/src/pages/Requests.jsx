import { useState, useEffect } from 'react'
import { requestApi } from '../services/api'
import { useAppContext } from '../context/AppContext'

export default function Requests() {
    const { user } = useAppContext()
    const [activeTab, setActiveTab] = useState('All')
    const [selectedRequest, setSelectedRequest] = useState(null)
    const [allRequests, setAllRequests] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (!user) return;
        const fetchRequests = async () => {
            try {
                const data = await requestApi.getByUser(user.id)
                setAllRequests(data.requests || [])
            } catch (err) {
                console.error("Failed to fetch requests", err)
            } finally {
                setIsLoading(false)
            }
        }
        fetchRequests()
    }, [user])

    const filteredRequests = activeTab === 'All'
        ? allRequests
        : allRequests.filter(req => req.status === activeTab.toUpperCase())

    const handleView = (req) => {
        setSelectedRequest(req)
    }

    const closeView = () => setSelectedRequest(null)

    return (
        <div id="page-requests" className="page-view active" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h1 className="page-title">My Borrowing Requests</h1>

            <div className="tabs-container">
                {['Pending', 'Approved', 'Borrowed', 'Returned', 'All'].map(tab => (
                    <div
                        key={tab}
                        className={`tab ${activeTab === tab ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </div>
                ))}
            </div>

            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Request #</th>
                            <th>Date Range</th>
                            <th>Items</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan="5" style={{ textAlign: 'center', padding: '32px', color: 'var(--text-secondary)' }}>
                                    Loading requests...
                                </td>
                            </tr>
                        ) : filteredRequests.length > 0 ? filteredRequests.map(req => (
                            <tr key={req.id}>
                                <td style={{ fontWeight: 600 }}>REQ-{req.id}</td>
                                <td style={{ color: 'var(--text-secondary)' }}>{req.borrowDate} - {req.returnDate}</td>
                                <td>{req.equipment?.name || 'Unknown Item'}</td>
                                <td><span className={`status-badge badge-${req.status.toLowerCase()}`}>{req.status}</span></td>
                                <td><button className="btn btn-outline" onClick={() => handleView(req)} style={{ padding: '6px 16px', fontSize: '13px' }}><i className="ph ph-eye"></i> View</button></td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="5" style={{ textAlign: 'center', padding: '32px', color: 'var(--text-secondary)' }}>
                                    No requests found in this category.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {selectedRequest && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div className="card" style={{ width: '400px', padding: '24px', position: 'relative' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                            <h3 style={{ margin: 0 }}>Request Details</h3>
                            <button onClick={closeView} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', color: 'var(--text-secondary)' }}><i className="ph ph-x"></i></button>
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <span style={{ fontWeight: 600, fontSize: '18px', marginRight: '16px' }}>REQ-{selectedRequest.id}</span>
                            <span className={`status-badge badge-${selectedRequest.status.toLowerCase()}`}>{selectedRequest.status}</span>
                        </div>
                        <p style={{ margin: '0 0 16px 0', fontSize: '14px', color: 'var(--text-secondary)' }}>Borrow Dates: {selectedRequest.borrowDate} to {selectedRequest.returnDate}</p>

                        <h4 style={{ fontSize: '14px', marginBottom: '12px', paddingBottom: '8px', borderBottom: '1px solid var(--border-color)' }}>Items Requested:</h4>
                        <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: 'var(--text-primary)' }}>
                            <li style={{ marginBottom: '8px' }}>
                                <strong>{selectedRequest.equipment?.name}</strong> (ID: {selectedRequest.equipment?.equipId})
                            </li>
                        </ul>

                        <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
                            <button className="btn btn-outline" onClick={closeView} style={{ padding: '8px 24px' }}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
