import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

const allEquipment = [
    { id: 1, name: 'MacBook Pro 16"', tag: 'LAPTOP', status: 'AVAILABLE', equipId: 'EQ-001' },
    { id: 2, name: 'Dell XPS 15', tag: 'LAPTOP', status: 'ON LOAN', equipId: 'EQ-002' },
    { id: 3, name: 'Canon EOS R5', tag: 'CAMERAS', status: 'AVAILABLE', equipId: 'EQ-003' },
    { id: 4, name: 'Sony A7 IV', tag: 'CAMERAS', status: 'MAINTENANCE', equipId: 'EQ-004' },
    { id: 5, name: 'Epson Pro EX9220', tag: 'PROJECTORS', status: 'AVAILABLE', equipId: 'EQ-005' },
    { id: 6, name: 'Bose S1 Pro', tag: 'AUDIO', status: 'AVAILABLE', equipId: 'EQ-006' },
    { id: 7, name: 'HDMI Cable 10ft', tag: 'CABLES', status: 'AVAILABLE', equipId: 'EQ-007' },
    { id: 8, name: 'USB-C Hub', tag: 'OTHER', status: 'ON LOAN', equipId: 'EQ-008' },
]

export default function Catalog() {
    const { addToCart } = useAppContext()
    const [selectedCategories, setSelectedCategories] = useState([])
    const [selectedAvailability, setSelectedAvailability] = useState([])

    const handleAddToCart = (item) => {
        addToCart({
            id: item.equipId,
            name: item.name,
            type: item.tag.toLowerCase(),
            icon: item.tag === 'LAPTOP' ? 'ph-laptop' : item.tag === 'CAMERAS' ? 'ph-camera' : item.tag === 'PROJECTORS' ? 'ph-projector-screen' : item.tag === 'AUDIO' ? 'ph-speaker-high' : 'ph-monitor',
            quantity: 1,
            from: 'Feb 28, 2026',
            to: 'Mar 05, 2026'
        })
        alert(`${item.name} added to cart!`)
    }

    const toggleCategory = (cat) => {
        setSelectedCategories(prev =>
            prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
        )
    }

    const toggleAvailability = (avail) => {
        setSelectedAvailability(prev =>
            prev.includes(avail) ? prev.filter(a => a !== avail) : [...prev, avail]
        )
    }

    const resetFilters = () => {
        setSelectedCategories([])
        setSelectedAvailability([])
    }

    const filteredEquipment = allEquipment.filter(item => {
        const catMatch = selectedCategories.length === 0 || selectedCategories.includes(item.tag)
        const availMatch = selectedAvailability.length === 0 || selectedAvailability.includes(item.status)
        return catMatch && availMatch
    })

    return (
        <div id="page-catalog" className="page-view active" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                <div>
                    <h1 className="page-title" style={{ margin: 0, fontSize: '24px' }}>Equipment Catalog</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '4px' }}>{filteredEquipment.length} items available</p>
                </div>
                <div>
                    <select style={{ padding: '8px 16px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', background: 'var(--bg-card)', fontSize: '14px', color: 'var(--text-secondary)', outline: 'none' }}>
                        <option>Sort by: Popular</option>
                        <option>Sort by: Newest</option>
                        <option>Sort by: Name (A-Z)</option>
                    </select>
                </div>
            </div>

            <div className="catalog-layout">
                <aside className="catalog-sidebar">
                    <h3 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '24px', textTransform: 'uppercase' }}>Filters</h3>

                    <div className="filter-group">
                        <h4 className="filter-title">Category</h4>
                        {['LAPTOP', 'CAMERAS', 'PROJECTORS', 'AUDIO', 'CABLES', 'OTHER'].map(cat => (
                            <label className="checkbox-label" key={cat}>
                                <input
                                    type="checkbox"
                                    checked={selectedCategories.includes(cat)}
                                    onChange={() => toggleCategory(cat)}
                                /> {cat}
                            </label>
                        ))}
                    </div>

                    <div className="filter-group">
                        <h4 className="filter-title">Availability</h4>
                        {['AVAILABLE', 'ON LOAN', 'MAINTENANCE'].map(avail => (
                            <label className="checkbox-label" key={avail}>
                                <input
                                    type="checkbox"
                                    checked={selectedAvailability.includes(avail)}
                                    onChange={() => toggleAvailability(avail)}
                                /> {avail}
                            </label>
                        ))}
                    </div>

                    <button className="btn btn-outline" onClick={resetFilters} style={{ width: '100%', justifyContent: 'center', marginTop: '16px', fontWeight: 600 }}>RESET FILTERS</button>
                </aside>

                <div className="catalog-main">
                    <div className="catalog-grid">
                        {filteredEquipment.length > 0 ? filteredEquipment.map((item) => (
                            <div className="catalog-card" key={item.id}>
                                <div className="card-image-box">
                                    <div className="gray-square"></div>
                                </div>
                                <div className="card-content">
                                    <span className="card-tag">{item.tag}</span>
                                    <h3 className="card-title">{item.name}</h3>
                                    <div className="card-meta">
                                        <span className={`badge-${item.status === 'AVAILABLE' ? 'available' : item.status === 'ON LOAN' ? 'completed' : 'pending'}`}>{item.status}</span>
                                        <span className="card-id">ID: {item.equipId}</span>
                                    </div>
                                    <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                                        <Link to={`/item/${item.id}`} className="btn btn-outline card-btn" style={{ flex: 1, padding: '8px', fontSize: '12px', justifyContent: 'center' }}>DETAILS</Link>
                                        <button
                                            className="btn btn-primary card-btn"
                                            onClick={() => handleAddToCart(item)}
                                            disabled={item.status !== 'AVAILABLE'}
                                            style={{ flex: 1, padding: '8px', fontSize: '12px', justifyContent: 'center' }}
                                        >
                                            <i className="ph ph-shopping-cart" style={{ marginRight: '4px' }}></i> ADD
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )) : (
                            <div style={{ gridColumn: '1 / -1', padding: '48px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                                <i className="ph ph-magnifying-glass" style={{ fontSize: '48px', marginBottom: '16px' }}></i>
                                <h3>No equipment matches your filters</h3>
                                <button className="btn btn-outline" onClick={resetFilters} style={{ marginTop: '16px' }}>Clear Filters</button>
                            </div>
                        )}
                    </div>

                    {filteredEquipment.length > 0 && (
                        <div className="pagination" style={{ marginTop: '40px' }}>
                            <button className="page-btn text-btn">&lt;</button>
                            <button className="page-btn active">1</button>
                            <button className="page-btn text-btn">&gt;</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
