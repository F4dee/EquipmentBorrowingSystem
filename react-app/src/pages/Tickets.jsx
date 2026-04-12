import { useState, useEffect } from 'react'
import { ticketApi } from '../services/api'
import { useAppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

export default function Tickets() {
    const { user, showToast } = useAppContext()
    const [activeTab, setActiveTab] = useState('All')
    const [selectedTicket, setSelectedTicket] = useState(null)
    const [allTickets, setAllTickets] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (!user) return;
        const fetchTickets = async () => {
            try {
                // If admin, fetch all tickets from /admin/tickets endpoint
                // Otherwise, fetch user-specific tickets
                const data = user.role === 'admin' 
                    ? await ticketApi.getAll() 
                    : await ticketApi.getByUser(user.id)
                
                setAllTickets(data.tickets || data || [])
            } catch (err) {
                console.error("Failed to fetch tickets", err)
            } finally {
                setIsLoading(false)
            }
        }
        fetchTickets()
    }, [user])

    const filteredTickets = activeTab === 'All'
        ? allTickets
        : allTickets.filter(ticket => ticket.status === activeTab.toUpperCase())

    const handleView = (ticket) => {
        setSelectedTicket(ticket)
    }

    const handleResolve = async (id) => {
        try {
            await ticketApi.updateStatus(id, 'RESOLVED')
            showToast(`Ticket TKT-${id} marked as Resolved`)
            const data = user.role === 'admin' 
                ? await ticketApi.getAll() 
                : await ticketApi.getByUser(user.id)
            setAllTickets(data.tickets || data || [])
        } catch (err) {
            console.error("Failed to resolve ticket", err)
            showToast("Failed to resolve ticket: " + err.message, "error")
        }
    }

    const handleClose = async (id) => {
        try {
            await ticketApi.updateStatus(id, 'CLOSED')
            showToast(`Ticket TKT-${id} marked as Closed`)
            const data = user.role === 'admin' 
                ? await ticketApi.getAll() 
                : await ticketApi.getByUser(user.id)
            setAllTickets(data.tickets || data || [])
        } catch (err) {
            console.error("Failed to close ticket", err)
            showToast("Failed to close ticket: " + err.message, "error")
        }
    }

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to permanently delete this ticket?")) return
        try {
            await ticketApi.deleteTicket(id)
            showToast(`Ticket TKT-${id} deleted successfully`)
            const data = user.role === 'admin' 
                ? await ticketApi.getAll() 
                : await ticketApi.getByUser(user.id)
            setAllTickets(data.tickets || data || [])
        } catch (err) {
            console.error("Failed to delete ticket", err)
            showToast("Failed to delete ticket: " + err.message, "error")
        }
    }

    const closeView = () => setSelectedTicket(null)

    return (
        <div id="page-tickets" className="page-view active" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h1 className="page-title">{user?.role === 'admin' ? 'All Maintenance Tickets' : 'My Tickets'}</h1>

            <div className="tabs-container">
                {['Open', 'In Progress', 'Resolved', 'Closed', 'All'].map(tab => (
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
                            <th>Ticket #</th>
                            {user?.role === 'admin' && <th>Reporter</th>}
                            <th>Priority</th>
                            <th>Description</th>
                            <th>Location</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan="6" style={{ textAlign: 'center', padding: '32px', color: 'var(--text-secondary)' }}>
                                    Loading tickets...
                                </td>
                            </tr>
                        ) : filteredTickets.length > 0 ? filteredTickets.map(ticket => (
                            <tr key={ticket.id}>
                                <td style={{ fontWeight: 600 }}>TKT-{ticket.id}</td>
                                {user?.role === 'admin' && <td>{ticket.user?.name || 'Unknown'}</td>}
                                <td><span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600 }}><i className="ph-fill ph-warning-circle"></i> STANDARD</span></td>
                                <td>{ticket.description}</td>
                                <td style={{ color: 'var(--text-secondary)' }}>{ticket.labLocation} - {ticket.pcNumber}</td>
                                <td><span className={`status-badge badge-${ticket.status.toLowerCase()}`}>{ticket.status}</span></td>
                                <td>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <button className="btn btn-outline" onClick={() => handleView(ticket)} style={{ padding: '6px 12px', fontSize: '13px' }}><i className="ph ph-eye"></i> View</button>
                                        {user?.role === 'admin' && (
                                            <>
                                                {ticket.status !== 'RESOLVED' && ticket.status !== 'CLOSED' && (
                                                    <>
                                                        <button className="btn btn-outline" onClick={() => handleResolve(ticket.id)} style={{ padding: '6px 12px', fontSize: '13px', color: 'var(--success-green)', borderColor: 'var(--success-green)' }}><i className="ph ph-check"></i> Resolve</button>
                                                        <button className="btn btn-outline" onClick={() => handleClose(ticket.id)} style={{ padding: '6px 12px', fontSize: '13px', color: 'var(--text-secondary)', borderColor: 'var(--border-color)' }}><i className="ph ph-x"></i> Close</button>
                                                    </>
                                                )}
                                                <button className="btn btn-outline" onClick={() => handleDelete(ticket.id)} style={{ padding: '6px 12px', fontSize: '13px', color: 'var(--error-red)', borderColor: 'var(--error-red)' }}><i className="ph ph-trash"></i> Delete</button>
                                            </>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={user?.role === 'admin' ? "7" : "6"} style={{ textAlign: 'center', padding: '32px', color: 'var(--text-secondary)' }}>
                                    No tickets found in this category.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {selectedTicket && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div className="card" style={{ width: '400px', padding: '24px', position: 'relative' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                            <h3 style={{ margin: 0 }}>Ticket Details</h3>
                            <button onClick={closeView} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', color: 'var(--text-secondary)' }}><i className="ph ph-x"></i></button>
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <span style={{ fontWeight: 600, fontSize: '18px', marginRight: '16px' }}>TKT-{selectedTicket.id}</span>
                            <span className={`status-badge badge-${selectedTicket.status.toLowerCase()}`}>{selectedTicket.status}</span>
                        </div>
                        <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: 'var(--text-secondary)' }}><strong>Location:</strong> {selectedTicket.labLocation} - {selectedTicket.pcNumber}</p>
                        
                        <h4 style={{ fontSize: '14px', marginBottom: '12px', paddingBottom: '8px', borderBottom: '1px solid var(--border-color)' }}>Description:</h4>
                        <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-primary)' }}>{selectedTicket.description}</p>

                        <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
                            <button className="btn btn-outline" onClick={closeView} style={{ padding: '8px 24px' }}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
