import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authApi } from '../services/api'

export default function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const handleRegister = async (e) => {
        e.preventDefault()
        setError('')
        setSuccess('')

        if (password !== confirmPassword) {
            setError('Passwords do not match')
            return
        }

        setIsLoading(true)
        try {
            const data = await authApi.register(name, email, password)
            setSuccess(data.message || 'Registration successful! You can now login.')
            setTimeout(() => {
                navigate('/login')
            }, 2000)
        } catch (err) {
            setError(err.message || 'An error occurred during registration')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div id="page-register" className="page-view active" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="auth-container">
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <div className="auth-logo">
                        <i className="ph ph-desktop" style={{ fontSize: '32px', color: 'var(--primary-blue)' }}></i>
                    </div>
                    <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>Create an Account</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Join the Equipment Borrowing System</p>
                </div>

                {error && <div style={{ color: 'var(--error-red)', backgroundColor: '#ffebee', padding: '10px', borderRadius: '4px', marginBottom: '16px', fontSize: '14px', textAlign: 'center' }}>{error}</div>}
                {success && <div style={{ color: 'var(--success-green)', backgroundColor: '#e8f5e9', padding: '10px', borderRadius: '4px', marginBottom: '16px', fontSize: '14px', textAlign: 'center' }}>{success}</div>}

                <form onSubmit={handleRegister}>
                    <div className="form-group">
                        <label className="form-label">Full Name</label>
                        <div className="input-icon-wrapper">
                            <i className="ph ph-user"></i>
                            <input type="text" className="form-input" placeholder="Juan Dela Cruz" value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label">CIT-U Email</label>
                        <div className="input-icon-wrapper">
                            <i className="ph ph-envelope-simple"></i>
                            <input type="email" className="form-input" placeholder="juan.delacruz@cit.edu" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <div className="input-icon-wrapper">
                            <i className="ph ph-lock-key"></i>
                            <input type="password" className="form-input" placeholder="Create a password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
                            <i className="ph ph-eye" style={{ left: 'auto', right: '12px', cursor: 'pointer' }}></i>
                        </div>
                        <div className="password-strength">
                            <div className="strength-bar strength-weak"></div>
                            <div className="strength-bar strength-weak"></div>
                            <div className="strength-bar"></div>
                            <div className="strength-bar"></div>
                            <span className="strength-text">Weak</span>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Confirm Password</label>
                        <div className="input-icon-wrapper">
                            <i className="ph ph-lock-key"></i>
                            <input type="password" className="form-input" placeholder="Confirm your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required minLength={6} />
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
                        <input type="checkbox" id="terms" style={{ width: '16px', height: '16px', borderRadius: '4px', border: '1px solid var(--border-color)', cursor: 'pointer' }} required />
                        <label htmlFor="terms" style={{ fontSize: '14px', color: 'var(--text-secondary)', cursor: 'pointer' }}>I agree to the <a href="#" style={{ color: 'var(--primary-blue)', textDecoration: 'none' }}>Terms & Conditions</a></label>
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px', fontSize: '16px', justifyContent: 'center' }} disabled={isLoading}>
                        {isLoading ? 'Registering...' : 'Register'}
                    </button>
                </form>

                <div className="auth-divider">
                    <span>Or continue with</span>
                </div>

                <button className="btn btn-outline" style={{ width: '100%', justifyContent: 'center', padding: '12px' }}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" style={{ width: '20px', height: '20px' }} />
                    Google
                </button>

                <p style={{ textAlign: 'center', marginTop: '32px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                    Already have an account? <Link to="/login" style={{ color: 'var(--primary-blue)', fontWeight: 600, textDecoration: 'none' }}>Login here</Link>
                </p>
            </div>
        </div>
    )
}
