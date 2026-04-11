import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

export default function ItemDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { addToCart } = useAppContext()
    const [quantity, setQuantity] = useState(1)
    const [fromDate, setFromDate] = useState(new Date().toISOString().split('T')[0])
    const [toDate, setToDate] = useState(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])

    const handleAddToCart = () => {
        addToCart({
            id: `EQ-NET-0${id || '142'}`,
            name: 'Router TP-Link Archer C7',
            type: 'router',
            icon: 'ph-router',
            quantity,
            status: 'AVAILABLE',
            from: fromDate,
            to: toDate
        })
        alert("Item added to cart!")
        navigate('/cart')
    }
    return (
        <div id="page-item" className="page-view active" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ marginBottom: '24px' }}>
                <Link to="/catalog" className="text-btn"><i className="ph ph-arrow-left"></i> Back to Catalog</Link>
            </div>

            <div className="item-detail-grid">
                <div className="item-gallery">
                    <div className="item-image-main">
                        <i className="ph ph-router"></i>
                    </div>
                    <div className="item-thumbnails">
                        <div className="thumbnail active"><i className="ph ph-router"></i></div>
                        <div className="thumbnail"><i className="ph ph-plugs"></i></div>
                        <div className="thumbnail"><i className="ph ph-wifi-high"></i></div>
                        <div className="thumbnail"><i className="ph ph-cell-signal-full"></i></div>
                    </div>
                </div>

                <div className="item-info">
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                            <span className="category-tag">Router</span>
                            <span className="status-badge badge-approved" style={{ fontSize: '12px' }}>In Stock (5 Available)</span>
                        </div>
                        <h1 className="item-title">Router TP-Link Archer C7</h1>
                        <p className="item-id">Item ID: <strong>EQ-NET-0142</strong></p>
                    </div>

                    <div className="item-section">
                        <h3 className="section-title">Description</h3>
                        <p className="section-content">The Archer C7 is a fast 802.11ac router with incredible range. It's better than many routers that are twice as expensive. This advanced Wi-Fi is designed for high-traffic online activities and can help to run applications at triple the speed of the previous 802.11n standard.</p>
                    </div>

                    <div className="item-section">
                        <h3 className="section-title">Technical Specifications</h3>
                        <div style={{ background: 'var(--bg-page)', borderRadius: 'var(--radius-md)', padding: '16px', border: '1px solid var(--border-color)' }}>
                            <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px', marginBottom: '8px' }}>
                                <span style={{ width: '120px', color: 'var(--text-secondary)', fontSize: '14px' }}>Brand</span>
                                <span style={{ fontSize: '14px', fontWeight: 500 }}>TP-Link</span>
                            </div>
                            <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px', marginBottom: '8px' }}>
                                <span style={{ width: '120px', color: 'var(--text-secondary)', fontSize: '14px' }}>Model</span>
                                <span style={{ fontSize: '14px', fontWeight: 500 }}>Archer C7</span>
                            </div>
                            <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px', marginBottom: '8px' }}>
                                <span style={{ width: '120px', color: 'var(--text-secondary)', fontSize: '14px' }}>Wireless Standard</span>
                                <span style={{ fontSize: '14px', fontWeight: 500 }}>802.11ac</span>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <span style={{ width: '120px', color: 'var(--text-secondary)', fontSize: '14px' }}>Ports</span>
                                <span style={{ fontSize: '14px', fontWeight: 500 }}>4 LAN, 1 WAN, 1 USB 2.0</span>
                            </div>
                        </div>
                    </div>

                    <div className="item-section" style={{ background: 'var(--bg-page)', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
                        <h3 className="section-title" style={{ marginBottom: '16px' }}>Borrowing Details</h3>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                            <div className="form-group" style={{ marginBottom: 0 }}>
                                <label className="form-label">Borrow Date</label>
                                <div className="input-icon-wrapper">
                                    <i className="ph ph-calendar-blank"></i>
                                    <input type="date" className="form-input" style={{ paddingLeft: '38px', paddingTop: '10px' }} value={fromDate} onChange={e => setFromDate(e.target.value)} />
                                </div>
                            </div>
                            <div className="form-group" style={{ marginBottom: 0 }}>
                                <label className="form-label">Return Date</label>
                                <div className="input-icon-wrapper">
                                    <i className="ph ph-calendar-blank"></i>
                                    <input type="date" className="form-input" style={{ paddingLeft: '38px', paddingTop: '10px' }} value={toDate} onChange={e => setToDate(e.target.value)} />
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                            <span style={{ fontWeight: 500 }}>Quantity</span>
                            <div className="quantity-selector">
                                <button className="qty-btn" onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={quantity <= 1}><i className="ph ph-minus"></i></button>
                                <input type="number" className="qty-input" value={quantity} readOnly />
                                <button className="qty-btn" onClick={() => setQuantity(quantity + 1)}><i className="ph ph-plus"></i></button>
                            </div>
                        </div>

                        <button className="btn btn-primary btn-full" onClick={handleAddToCart} style={{ fontSize: '16px', padding: '14px' }}>
                            <i className="ph ph-shopping-cart" style={{ fontSize: '20px' }}></i>
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
