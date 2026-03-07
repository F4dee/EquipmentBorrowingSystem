import { Link } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

export default function Cart() {
    const { cartItems, updateQuantity, removeFromCart, clearCart } = useAppContext()

    const totalUniqueItems = cartItems.length
    const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0)
    // Mock days calculation based on presence of items
    const totalDays = cartItems.length > 0 ? 9 : 0

    const handleSubmit = () => {
        alert("Borrowing request submitted successfully!")
        clearCart()
    }

    return (
        <div id="page-cart" className="page-view active" style={{ maxWidth: '1200px', margin: '0 auto' }}>
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
                                                    <button className="qty-btn" onClick={() => updateQuantity(item.id, 1)}><i className="ph ph-plus"></i></button>
                                                </div>
                                            </td>
                                            <td>
                                                <div style={{ fontSize: '13px' }}>
                                                    <div style={{ marginBottom: '4px' }}><span style={{ color: 'var(--text-secondary)' }}>From:</span> {item.from}</div>
                                                    <div><span style={{ color: 'var(--text-secondary)' }}>To:</span> {item.to}</div>
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
                                    <span style={{ color: 'var(--success-green)' }}>All in stock <i className="ph-fill ph-check-circle"></i></span>
                                ) : (
                                    <span style={{ color: 'var(--text-secondary)' }}>N/A</span>
                                )}
                            </div>
                        </div>

                        <button className="btn btn-primary btn-full" disabled={totalUniqueItems === 0} style={{ padding: '12px', fontSize: '15px' }} onClick={handleSubmit}>Submit Request</button>
                        <Link to="/catalog" className="text-btn" style={{ width: '100%', justifyContent: 'center', marginTop: '16px' }}>Continue Shopping</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
