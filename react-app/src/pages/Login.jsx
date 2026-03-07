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

                <div className="auth-divider" style={{ display: 'flex', alignItems: 'center', textAlign: 'center', color: 'var(--text-muted)', margin: '24px 0', fontSize: '12px', textTransform: 'uppercase' }}>
                    <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }}></div>
                    <span style={{ padding: '0 16px' }}>OR</span>
                    <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }}></div>
                </div>

                <button className="btn btn-outline" style={{ width: '100%', justifyContent: 'center', padding: '12px', border: '1px solid var(--text-primary)', color: 'var(--text-primary)', fontWeight: 600 }}>
                    <div style={{ width: '16px', height: '16px', backgroundColor: 'var(--border-color)', marginRight: '8px' }}></div>
                    Sign in with Google
                </button>

                <p style={{ textAlign: 'center', marginTop: '32px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                    Don't have an account? <Link to="/register" style={{ color: 'var(--text-primary)', fontWeight: 600, textDecoration: 'underline' }}>Sign Up</Link>
                </p>

                {/* Demo buttons */}
                <div style={{ marginTop: '24px', display: 'flex', gap: '8px', justifyContent: 'center' }}>
                    <button type="button" onClick={handleDemoStudent} className="btn btn-outline" style={{ fontSize: '11px', padding: '4px 8px' }}>Demo Student</button>
                    <button type="button" onClick={handleDemoAdmin} className="btn btn-outline" style={{ fontSize: '11px', padding: '4px 8px' }}>Demo Admin</button>
                </div>
            </div>

            <div className="quick-nav-box">
                <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>Quick Navigation:</p>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <Link to="/catalog" style={{ fontSize: '13px', color: 'var(--text-primary)', textDecoration: 'underline' }}>Catalog</Link>
                    <Link to="/admin" style={{ fontSize: '13px', color: 'var(--text-primary)', textDecoration: 'underline' }}>Admin</Link>
                    <Link to="/profile" style={{ fontSize: '13px', color: 'var(--text-primary)', textDecoration: 'underline' }}>Profile</Link>
                </div>
            </div>
        </div>
    )
}
