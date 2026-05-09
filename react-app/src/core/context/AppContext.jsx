import { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
    const [user, setUser] = useState(null)
    const [toasts, setToasts] = useState([])
    const [cartItems, setCartItems] = useState([])
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem('theme') === 'dark'
    })
    const [globalSearch, setGlobalSearch] = useState('')

    const toggleTheme = () => {
        setIsDarkMode(prev => {
            const next = !prev
            localStorage.setItem('theme', next ? 'dark' : 'light')
            if (next) document.body.classList.add('dark-theme')
            else document.body.classList.remove('dark-theme')
            return next
        })
    }

    const login = (userData) => setUser(userData)
    const logout = () => {
        setUser(null)
        localStorage.removeItem('token')
    }
    const updateUser = (updates) => setUser(prev => ({ ...prev, ...updates }))

    const addToCart = (item) => {
        setCartItems(prev => {
            const existing = prev.find(i => i.id === item.id)
            if (existing) {
                return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i)
            }
            return [...prev, item]
        })
    }

    const updateQuantity = (id, delta) => {
        setCartItems(prev => prev.map(item => {
            if (item.id === id) {
                return { ...item, quantity: Math.max(1, item.quantity + delta) }
            }
            return item
        }))
    }

    const removeFromCart = (id) => {
        setCartItems(prev => prev.filter(item => item.id !== id))
    }

    const updateItemDate = (id, field, value) => {
        setCartItems(prev => prev.map(item => {
            if (item.id === id) {
                return { ...item, [field]: value }
            }
            return item
        }))
    }

    const clearCart = () => setCartItems([])

    // Toast Notification System
    const showToast = (message, type = 'success') => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 3000);
    }

    return (
        <AppContext.Provider value={{
            user, login, logout, updateUser,
            cartItems, addToCart, updateQuantity, removeFromCart, clearCart,
            updateItemDate,
            showToast, isDarkMode, toggleTheme,
            globalSearch, setGlobalSearch
        }}>
            {children}

            {/* Global Toasts Renderer */}
            <div style={{
                position: 'fixed', top: '24px', right: '24px', zIndex: 9999, display: 'flex', flexDirection: 'column', gap: '8px'
            }}>
                {toasts.map(toast => (
                    <div key={toast.id} style={{
                        background: toast.type === 'error' ? 'var(--error-red)' : 'var(--success-green)',
                        color: 'white',
                        padding: '12px 24px',
                        borderRadius: 'var(--radius-md)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '14px',
                        fontWeight: 500,
                        animation: 'slideIn 0.3s ease-out forwards'
                    }}>
                        <i className={`ph-fill ${toast.type === 'error' ? 'ph-warning-circle' : 'ph-check-circle'}`} style={{ fontSize: '18px' }}></i>
                        {toast.message}
                    </div>
                ))}
            </div>
            <style>{`
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `}</style>
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext);
