import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authApi } from '../services/api'

export default function Login({ onLogin }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)

        try {
            const data = await authApi.login(email, password)
            onLogin(data.user)

            // Navigate based on role
            if (data.user.role === 'admin') {
                navigate('/admin')
            } else {
                navigate('/')
            }
        } catch (err) {
            setError(err.message || 'Invalid email or password')
        } finally {
            setIsLoading(false)
        }
    }

    const handleDemoStudent = () => {
        setEmail('john.smith@university.edu')
        setPassword('password')
    }

    const handleDemoAdmin = () => {
        setEmail('admin@cit.edu')
        setPassword('admin')
    }

    return (
        <div id="page-login" className="page-view active" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div className="auth-box">
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <div className="logo-placeholder" style={{ width: '48px', height: '48px', backgroundColor: 'var(--border-color)', margin: '0 auto 16px' }}></div>
                    <h1 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>Equipment Borrowing</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Login to your account</p>
                </div>

                {error && <div style={{ color: 'var(--error-red)', backgroundColor: '#ffebee', padding: '10px', borderRadius: '4px', marginBottom: '16px', fontSize: '14px', textAlign: 'center' }}>{error}</div>}

                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label className="form-label" style={{ textTransform: 'uppercase', fontSize: '12px', letterSpacing: '0.5px' }}>Email</label>
                        <input
                            type="email"
                            className="form-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group" style={{ marginBottom: '8px' }}>
                        <label className="form-label" style={{ textTransform: 'uppercase', fontSize: '12px', letterSpacing: '0.5px' }}>Password</label>
                        <input
                            type="password"
                            className="form-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '24px' }}>
                        <a href="#" style={{ color: 'var(--text-secondary)', fontSize: '13px', textDecoration: 'underline' }}>Forgot Password?</a>
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px', fontSize: '14px', fontWeight: 700, justifyContent: 'center', letterSpacing: '1px' }} disabled={isLoading}>
                        {isLoading ? 'LOGGING IN...' : 'LOGIN'}
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '32px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                    Don't have an account? <Link to="/register" style={{ color: 'var(--text-primary)', fontWeight: 600, textDecoration: 'underline' }}>Sign Up</Link>
                </p>

            </div>
        </div>
    )
}
