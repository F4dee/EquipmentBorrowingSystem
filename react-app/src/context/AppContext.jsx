import { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
    const [user, setUser] = useState(null)
    const [cartItems, setCartItems] = useState([
        { id: 'EQ-NET-0142', name: 'Router TP-Link', type: 'router', icon: 'ph-router', quantity: 1, from: 'Feb 28, 2026', to: 'Mar 05, 2026' },
        { id: 'EQ-NET-0089', name: 'Network Switch', type: 'switch', icon: 'ph-plugs', quantity: 2, from: 'Feb 28, 2026', to: 'Mar 02, 2026' },
        { id: 'EQ-KBD-0291', name: 'Gaming Mouse', type: 'mouse', icon: 'ph-mouse', quantity: 1, from: 'Feb 28, 2026', to: 'Mar 01, 2026' }
    ])

    const login = (userData) => setUser(userData)
    const logout = () => setUser(null)
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

    const clearCart = () => setCartItems([])

    return (
        <AppContext.Provider value={{
            user, login, logout, updateUser,
            cartItems, addToCart, updateQuantity, removeFromCart, clearCart
        }}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext);
