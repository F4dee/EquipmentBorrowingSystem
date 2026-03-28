import { useState, useEffect } from 'react'
import { equipmentApi } from '../services/api'
import { useAppContext } from '../context/AppContext'

export default function AdminInventory() {
    const { showToast } = useAppContext()
    const [inventory, setInventory] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    // Form State
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingItem, setEditingItem] = useState(null)
    const [formData, setFormData] = useState({ name: '', tag: 'LAPTOP', equipId: '', status: 'AVAILABLE' })

    // Filters
    const [searchQuery, setSearchQuery] = useState('')
    const [categoryFilter, setCategoryFilter] = useState('All Categories')
    const [statusFilter, setStatusFilter] = useState('All Statuses')

    useEffect(() => {
        loadInventory()
    }, [])

    const loadInventory = async () => {
        setIsLoading(true)
        try {
            const data = await equipmentApi.getAll()
            setInventory(data.items || [])
        } catch (err) {
            showToast("Failed to load inventory: " + err.message, "error")
        } finally {
            setIsLoading(false)
        }
    }

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this equipment?")) {
            try {
                await equipmentApi.delete(id)
                showToast("Equipment deleted successfully")
                setInventory(prev => prev.filter(i => i.id !== id))
            } catch (err) {
                showToast("Failed to delete: " + err.message, "error")
            }
        }
    }

    const handleEdit = (item) => {
        setEditingItem(item)
        setFormData({ name: item.name, tag: item.tag, equipId: item.equipId, status: item.status || 'AVAILABLE' })
        setIsModalOpen(true)
    }

    const handleAdd = () => {
        setEditingItem(null)
        setFormData({ name: '', tag: 'LAPTOP', equipId: '', status: 'AVAILABLE' })
        setIsModalOpen(true)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (editingItem) {
                await equipmentApi.update(editingItem.id, formData)
                showToast("Equipment updated successfully")
            } else {
                await equipmentApi.create(formData)
                showToast("Equipment added successfully")
            }
            setIsModalOpen(false)
            loadInventory() // Refresh the list from backend
        } catch (err) {
            showToast(err.message || "Failed to save equipment", "error")
        }
    }

    // Apply filtering mapped from user inputs directly to fetched data
    let filteredInventory = [...inventory]

    if (searchQuery) {
        const query = searchQuery.toLowerCase()
        filteredInventory = filteredInventory.filter(item =>
            item.name.toLowerCase().includes(query) ||
            (item.equipId && item.equipId.toLowerCase().includes(query))
        )
    }

    if (categoryFilter !== 'All Categories') {
        filteredInventory = filteredInventory.filter(item => item.tag === categoryFilter)
    }

    if (statusFilter !== 'All Statuses') {
        const mappedStatus = statusFilter === 'Available' ? 'AVAILABLE' :
            statusFilter === 'Out of Stock' ? 'OUT OF STOCK' :
                statusFilter === 'On Loan' ? 'ON LOAN' :
                    statusFilter === 'Maintenance' ? 'MAINTENANCE' : statusFilter
        filteredInventory = filteredInventory.filter(item => item.status === mappedStatus)
    }

    return (
        <div id="page-admin-inventory" className="page-view active" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h1 className="page-title">Inventory Management</h1>
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ padding: '24px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
                    <button className="btn btn-primary" onClick={handleAdd}><i className="ph ph-plus"></i> Add New Item</button>
                    <div style={{ display: 'flex', gap: '12px', flex: 1, maxWidth: 600 }}>
                        <div className="search-wrapper" style={{ flex: 1 }}>
                            <i className="ph ph-magnifying-glass"></i>
                            <input
                                type="text"
                                className="search-input"
                                placeholder="Search inventory..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <select className="form-input" style={{ width: 160 }} value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                            <option>All Categories</option>
                            <option value="LAPTOP">Laptop</option>
                            <option value="CAMERAS">Cameras</option>
                            <option value="PROJECTORS">Projectors</option>
                            <option value="AUDIO">Audio</option>
                            <option value="CABLES">Cables</option>
                            <option value="OTHER">Other</option>
                        </select>
                        <select className="form-input" style={{ width: 160 }} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                            <option>All Statuses</option>
                            <option>Available</option>
                            <option>On Loan</option>
                            <option>Out of Stock</option>
                            <option>Maintenance</option>
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
                        {isLoading ? (
                            <tr>
                                <td colSpan="7" style={{ textAlign: 'center', padding: '24px' }}>Loading inventory...</td>
                            </tr>
                        ) : filteredInventory.length > 0 ? filteredInventory.map(item => (
                            <tr key={item.id}>
                                <td>
                                    <div style={{ width: '40px', height: '40px', background: 'var(--bg-page)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', fontSize: '24px' }}>
                                        <i className={`ph ${item.tag === 'LAPTOP' ? 'ph-laptop' : item.tag === 'CAMERAS' ? 'ph-camera' : item.tag === 'PROJECTORS' ? 'ph-projector-screen' : 'ph-monitor'}`}></i>
                                    </div>
                                </td>
                                <td style={{ fontWeight: 600 }}>{item.name}</td>
                                <td style={{ color: 'var(--text-secondary)' }}>{item.tag}</td>
                                <td style={{ textAlign: 'center' }}>1</td>
                                <td style={{ textAlign: 'center' }}>{item.status === 'AVAILABLE' ? 1 : 0}</td>
                                <td>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: item.status === 'AVAILABLE' ? 'var(--success-green)' : item.status === 'OUT OF STOCK' || item.status === 'MAINTENANCE' ? 'var(--error-red)' : 'var(--warning-orange)', fontSize: '13px', fontWeight: 500 }}>
                                        <i className="ph-fill ph-circle"></i> {item.status}
                                    </span>
                                </td>
                                <td style={{ textAlign: 'right' }}>
                                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                        <button onClick={() => handleEdit(item)} className="btn btn-outline" style={{ padding: '6px', fontSize: '16px', border: 'none', background: 'transparent', color: 'var(--text-secondary)' }}><i className="ph ph-pencil-simple"></i></button>
                                        <button onClick={() => handleDelete(item.id)} className="btn btn-outline" style={{ padding: '6px', fontSize: '16px', border: 'none', background: 'transparent', color: 'var(--error-red)' }}><i className="ph ph-trash"></i></button>
                                    </div>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="7" style={{ textAlign: 'center', padding: '24px' }}>No inventory found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div style={{ padding: '16px 24px', borderTop: '1px solid var(--border-color)' }}>
                    <div className="pagination">
                        <button className="page-btn text-btn" disabled>Previous</button>
                        <button className="page-btn active">1</button>
                        <button className="page-btn text-btn">Next</button>
                    </div>
                </div>
            </div>

            {/* Inventory Form Modal */}
            {isModalOpen && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div className="card" style={{ width: '100%', maxWidth: '500px', padding: '32px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                            <h2 style={{ fontSize: '20px', fontWeight: 600 }}>{editingItem ? 'Edit Equipment' : 'Add New Equipment'}</h2>
                            <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: 'var(--text-secondary)' }}><i className="ph ph-x"></i></button>
                        </div>

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div>
                                <label className="form-label">Equipment Name</label>
                                <input required type="text" className="form-input" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="e.g. MacBook Pro M3" />
                            </div>

                            <div style={{ display: 'flex', gap: '16px' }}>
                                <div style={{ flex: 1 }}>
                                    <label className="form-label">Category (Tag)</label>
                                    <select className="form-input" value={formData.tag} onChange={e => setFormData({ ...formData, tag: e.target.value })}>
                                        <option value="LAPTOP">Laptop</option>
                                        <option value="CAMERAS">Camera</option>
                                        <option value="PROJECTORS">Projector</option>
                                        <option value="AUDIO">Audio</option>
                                        <option value="CABLES">Cables</option>
                                        <option value="OTHER">Other</option>
                                    </select>
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label className="form-label">Internal ID</label>
                                    <input required type="text" className="form-input" value={formData.equipId} onChange={e => setFormData({ ...formData, equipId: e.target.value })} placeholder="e.g. LP-001" />
                                </div>
                            </div>

                            {editingItem && (
                                <div>
                                    <label className="form-label">Current Status</label>
                                    <select className="form-input" value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                                        <option value="AVAILABLE">Available</option>
                                        <option value="ON LOAN">On Loan</option>
                                        <option value="OUT OF STOCK">Out of Stock</option>
                                        <option value="MAINTENANCE">Maintenance</option>
                                    </select>
                                </div>
                            )}

                            <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
                                <button type="button" className="btn btn-outline" onClick={() => setIsModalOpen(false)} style={{ flex: 1, justifyContent: 'center' }}>Cancel</button>
                                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>{editingItem ? 'Save Changes' : 'Add Equipment'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    )
}
