import { useState, useEffect } from 'react'
import { ticketApi } from '../services/api'
import { useAppContext } from '../context/AppContext'

export default function Tickets() {
    const { user } = useAppContext()
    const [activeTab, setActiveTab] = useState('All')
    const [selectedTicket, setSelectedTicket] = useState(null)
    const [allTickets, setAllTickets] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (!user) return;
        const fetchTickets = async () => {
            try {
                const data = await ticketApi.getByUser(user.id)
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

    const closeView = () => setSelectedTicket(null)

    return (
        <div id="page-tickets" className="page-view active" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h1 className="page-title">My Tickets</h1>

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
                                <td><span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600 }}><i className="ph-fill ph-warning-circle"></i> STANDARD</span></td>
                                <td>{ticket.description}</td>
                                <td style={{ color: 'var(--text-secondary)' }}>{ticket.labLocation} - {ticket.pcNumber}</td>
                                <td><span className={`status-badge badge-${ticket.status.toLowerCase()}`}>{ticket.status}</span></td>
                                <td><button className="btn btn-outline" onClick={() => handleView(ticket)} style={{ padding: '6px 16px', fontSize: '13px' }}><i className="ph ph-eye"></i> View</button></td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="6" style={{ textAlign: 'center', padding: '32px', color: 'var(--text-secondary)' }}>
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
