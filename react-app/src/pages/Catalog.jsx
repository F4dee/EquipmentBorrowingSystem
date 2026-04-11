import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { equipmentApi } from '../services/api'

const getImageUrl = (name) => {
    if (!name) return '/Image/dellxps15.jpg';
    const n = name.toLowerCase();
    if (n.includes('macbook')) return '/Image/465-4656388_macbook-pro-16-hd-png-download.png';
    if (n.includes('bose') || n.includes('audio')) return '/Image/bose s1 pro.jpeg';
    if (n.includes('canon') || n.includes('r5')) return '/Image/canon_6536c012_eos_r5_mark_ii_1841173.jpg';
    if (n.includes('hdmi') || n.includes('cable')) return '/Image/hmi cable 10ft.jpg';
    if (n.includes('sony') || n.includes('a7')) return '/Image/sony a7 iv.jpg';
    if (n.includes('usb') || n.includes('hub')) return '/Image/usb c hub.jpg';
    if (n.includes('projector') || n.includes('epson')) return '/Image/esponpro.jpg';
    if (n.includes('dell xps') || n.includes('laptop')) return '/Image/dellxps15.jpg';
    return '/Image/dellxps15.jpg'; // default placeholder
};

export default function Catalog() {
    const { addToCart, showToast, globalSearch, setGlobalSearch } = useAppContext()
    const [equipment, setEquipment] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [selectedCategories, setSelectedCategories] = useState([])
    const [selectedAvailability, setSelectedAvailability] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [sortBy, setSortBy] = useState('Popular')

    useEffect(() => {
        const fetchEquipment = async () => {
            try {
                const data = await equipmentApi.getAll()
                setEquipment(data.items || [])
                setIsLoading(false)
            } catch (err) {
                setError(err.message)
                setIsLoading(false)
            }
        }
        fetchEquipment()
    }, [])

    const handleAddToCart = (item) => {
        addToCart({
            id: item.equipId,
            dbId: item.id,
            name: item.name,
            type: item.tag.toLowerCase(),
            icon: item.tag === 'LAPTOP' ? 'ph-laptop' : item.tag === 'CAMERAS' ? 'ph-camera' : item.tag === 'PROJECTORS' ? 'ph-projector-screen' : item.tag === 'AUDIO' ? 'ph-speaker-high' : 'ph-monitor',
            quantity: 1,
            status: item.status,
            from: new Date().toISOString().split('T')[0],
            to: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
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
        setSearchQuery('')
        setGlobalSearch('') // Also reset global search
    }

    // Apply filters and sorting
    let filteredEquipment = [...equipment]

    // 1. Search Filter (prefer global if set, else local)
    const searchToUse = globalSearch || searchQuery
    if (searchToUse) {
        const query = searchToUse.toLowerCase()
        filteredEquipment = filteredEquipment.filter(item =>
            item.name.toLowerCase().includes(query) ||
            item.tag.toLowerCase().includes(query) ||
            (item.equipId && item.equipId.toLowerCase().includes(query))
        )
    }

    // 2. Category Filter
    if (selectedCategories.length > 0) {
        filteredEquipment = filteredEquipment.filter(item =>
            selectedCategories.includes(item.tag)
        )
    }

    // 3. Availability Filter
    if (selectedAvailability.length > 0) {
        filteredEquipment = filteredEquipment.filter(item =>
            selectedAvailability.includes(item.status)
        )
    }

    // 4. Sort
    filteredEquipment.sort((a, b) => {
        if (sortBy === 'Name (A-Z)') return a.name.localeCompare(b.name)
        if (sortBy === 'Newest') return b.id - a.id // Assuming higher ID is newer
        return 0 // Popular/Default
    })

    return (
        <div id="page-catalog" className="page-view active" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            {error && <div style={{ color: 'var(--error-red)', backgroundColor: '#ffebee', padding: '10px', borderRadius: '4px', marginBottom: '16px', textAlign: 'center' }}>{error}</div>}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                    <h1 className="page-title" style={{ margin: 0, fontSize: '24px' }}>Equipment Catalog</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '4px' }}>
                        {isLoading ? 'Loading equipment...' : `${filteredEquipment.length} items available`}
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '12px', flex: 1, maxWidth: '500px', justifyContent: 'flex-end' }}>
                    <div className="search-wrapper">
                        <i className="ph ph-magnifying-glass"></i>
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search by name, category, or ID..."
                            value={globalSearch || searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value)
                                setGlobalSearch(e.target.value)
                            }}
                        />
                    </div>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        style={{ padding: '8px 16px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', background: 'var(--bg-card)', fontSize: '14px', color: 'var(--text-primary)', outline: 'none' }}>
                        <option value="Popular">Sort by: Popular</option>
                        <option value="Newest">Sort by: Newest</option>
                        <option value="Name (A-Z)">Sort by: Name (A-Z)</option>
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
                        {['AVAILABLE', 'MAINTENANCE'].map(avail => (
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
                    {isLoading ? (
                        <div style={{ textAlign: 'center', padding: '48px', color: 'var(--text-secondary)' }}>
                            <i className="ph ph-spinner-gap" style={{ fontSize: '48px', marginBottom: '16px', display: 'inline-block', animation: 'spin 1s linear infinite' }}></i>
                            <h3>Loading Catalog...</h3>
                        </div>
                    ) : (
                        <div className="catalog-grid">
                            {filteredEquipment.length > 0 ? filteredEquipment.map((item) => (
                                <div className="catalog-card" key={item.id}>
                                    <div className="card-image-box" style={{ background: '#fff', padding: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <img src={getImageUrl(item.name)} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
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
                    )}

                    {(!isLoading && filteredEquipment.length > 0) && (
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
