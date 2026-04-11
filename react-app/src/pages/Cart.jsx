import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { requestApi } from '../services/api'

export default function Cart() {
    const { cartItems, updateQuantity, removeFromCart, clearCart, updateItemDate, user, showToast } = useAppContext()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const totalUniqueItems = cartItems.length
    const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0)
    // Mock days calculation based on presence of items
    const totalDays = cartItems.length > 0 ? 9 : 0

    // Check if any item in the cart is no longer available
    const allItemsAvailable = cartItems.every(item => item.status && item.status !== 'MAINTENANCE' && item.status !== 'OUT OF STOCK' && item.status !== 'ON LOAN')

    const handleSubmit = async () => {
        if (!user) {
            showToast("Please log in to submit a request.", "error")
            navigate('/login')
            return
        }

        setIsSubmitting(true)
        setError(null)

        try {
            // Need to submit each unique item request 
            // In a more complex system, this might be a bulk endpoint or a CartEntity
            for (const item of cartItems) {
                // Formatting dates correctly might be needed depending on your exact backend expected format
                // For now, we will use a basic "yyyy-MM-dd" structure in a real app, 
                // but since our mock from/to strings are "Feb 28, 2026", let's map them simple:
                const fromDate = new Date(item.from).toISOString().split('T')[0]
                const toDate = new Date(item.to).toISOString().split('T')[0]

                await requestApi.create({
                    userId: user.id,
                    equipmentId: item.dbId || parseInt(item.id.replace(/[^\d]/g, '') || 1),
                    quantity: item.quantity,
                    borrowDate: fromDate,
                    returnDate: toDate
                })
            }
            showToast("Borrowing request submitted successfully!")
            clearCart()
            navigate('/requests')
        } catch (err) {
            setError(err.message || 'Failed to submit request')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div id="page-cart" className="page-view active" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            {error && <div style={{ color: 'var(--error-red)', backgroundColor: '#ffebee', padding: '10px', borderRadius: '4px', marginBottom: '16px', textAlign: 'center' }}>{error}</div>}
            <h1 className="page-title">Borrowing Cart</h1>

            <div className="cart-grid">
                <div className="cart-items">
                    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                        {cartItems.length > 0 ? (
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Item</th>
                                        <th style={{ textAlign: 'center' }}>Quantity</th>
                                        <th>Borrow Dates</th>
                                        <th style={{ textAlign: 'right' }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map(item => (
                                        <tr key={item.id}>
                                            <td>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                                    <div className="cart-item-img">
                                                        <i className={`ph ${item.icon}`}></i>
                                                    </div>
                                                    <div>
                                                        <h4 style={{ fontWeight: 600, fontSize: '14px', marginBottom: '2px' }}>{item.name}</h4>
                                                        <p style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>ID: {item.id}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td style={{ textAlign: 'center' }}>
                                                <div className="quantity-selector" style={{ margin: '0 auto' }}>
                                                    <button className="qty-btn" onClick={() => updateQuantity(item.id, -1)} disabled={item.quantity <= 1}><i className="ph ph-minus"></i></button>
                                                    <input type="number" className="qty-input" value={item.quantity} readOnly />
                                                    <button className="qty-btn" onClick={() => updateQuantity(item.id, 1)} disabled={true} title="Maximum stock reached"><i className="ph ph-plus"></i></button>
                                                </div>
                                            </td>
                                            <td>
                                                <div style={{ fontSize: '13px' }}>
                                                    <div style={{ marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                        <span style={{ color: 'var(--text-secondary)', width: '36px' }}>From:</span> 
                                                        <input type="date" className="form-input" style={{padding: '4px', height: '28px', flex: 1}} value={item.from} onChange={(e) => updateItemDate(item.id, 'from', e.target.value)} />
                                                    </div>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                        <span style={{ color: 'var(--text-secondary)', width: '36px' }}>To:</span> 
                                                        <input type="date" className="form-input" style={{padding: '4px', height: '28px', flex: 1}} value={item.to} onChange={(e) => updateItemDate(item.id, 'to', e.target.value)} />
                                                    </div>
                                                </div>
                                            </td>
                                            <td style={{ textAlign: 'right' }}>
                                                <button className="btn btn-outline" onClick={() => removeFromCart(item.id)} style={{ padding: '8px', border: 'none', color: 'var(--error-red)' }}>
                                                    <i className="ph ph-trash" style={{ fontSize: '18px' }}></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div style={{ padding: '48px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                                <i className="ph ph-shopping-cart" style={{ fontSize: '48px', marginBottom: '16px' }}></i>
                                <h3>Your cart is empty</h3>
                                <Link to="/catalog" className="btn btn-outline" style={{ marginTop: '16px' }}>Browse Catalog</Link>
                            </div>
                        )}
                    </div>
                </div>

                <div className="cart-summary">
                    <div className="card" style={{ position: 'sticky', top: '24px' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid var(--border-color)' }}>Order Summary</h3>

                        <div className="form-group">
                            <label className="form-label" style={{ fontSize: '13px' }}>Purpose / Reason for Borrowing</label>
                            <textarea className="form-input" rows="3" placeholder="Explain what these items will be used for..." style={{ resize: 'vertical' }}></textarea>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                            <div className="summary-row">
                                <span>Total Unique Items</span>
                                <span style={{ fontWeight: 500 }}>{totalUniqueItems}</span>
                            </div>
                            <div className="summary-row">
                                <span>Total Quantity</span>
                                <span style={{ fontWeight: 500 }}>{totalQuantity}</span>
                            </div>
                            <div className="summary-row">
                                <span>Total Borrowing Days</span>
                                <span style={{ fontWeight: 500 }}>{totalDays} days</span>
                            </div>
                            <div className="summary-row total">
                                <span>Items available:</span>
                                {totalUniqueItems > 0 ? (
                                    allItemsAvailable ? (
                                        <span style={{ color: 'var(--success-green)' }}>All in stock <i className="ph-fill ph-check-circle"></i></span>
                                    ) : (
                                        <span style={{ color: 'var(--error-red)' }}>Insufficient stock <i className="ph-fill ph-warning-circle"></i></span>
                                    )
                                ) : (
                                    <span style={{ color: 'var(--text-secondary)' }}>N/A</span>
                                )}
                            </div>
                        </div>

                        <button className="btn btn-primary btn-full" disabled={totalUniqueItems === 0 || isSubmitting} style={{ padding: '12px', fontSize: '15px' }} onClick={handleSubmit}>
                            {isSubmitting ? 'Submitting...' : 'Submit Request'}
                        </button>
                        <Link to="/catalog" className="text-btn" style={{ width: '100%', justifyContent: 'center', marginTop: '16px' }}>Continue Shopping</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
