import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authApi } from '../services/api'

export default function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [passwordStrength, setPasswordStrength] = useState(0)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const checkPasswordStrength = (pass) => {
        let strength = 0;
        if (pass.length === 0) return 0;
        if (pass.length >= 6) strength += 1;
        if (pass.length >= 8) strength += 1;
        if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) strength += 1;
        if (/[0-9]/.test(pass) || /[^A-Za-z0-9]/.test(pass)) strength += 1;
        return Math.min(4, strength); // Max 4 points
    }

    const handlePasswordChange = (e) => {
        const val = e.target.value;
        setPassword(val);
        setPasswordStrength(checkPasswordStrength(val));
    }

    const getStrengthLabel = () => {
        switch (passwordStrength) {
            case 0: return '';
            case 1: return 'Weak';
            case 2: return 'Fair';
            case 3: return 'Good';
            case 4: return 'Strong';
            default: return '';
        }
    }

    const getStrengthClass = (level) => {
        if (passwordStrength === 0) return 'strength-bar';
        if (passwordStrength >= level) {
            if (passwordStrength <= 1) return 'strength-bar strength-weak'; // Red
            if (passwordStrength === 2) return 'strength-bar strength-fair'; // Orange/Yellow
            return 'strength-bar strength-strong'; // Green
        }
        return 'strength-bar';
    }

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
                            <input type={showPassword ? "text" : "password"} className="form-input" placeholder="Create a password" value={password} onChange={handlePasswordChange} required minLength={6} />
                            <i className={showPassword ? "ph ph-eye-slash" : "ph ph-eye"} style={{ left: 'auto', right: '12px', cursor: 'pointer' }} onClick={() => setShowPassword(!showPassword)}></i>
                        </div>
                        {password.length > 0 && (
                            <div className="password-strength">
                                <div className={getStrengthClass(1)}></div>
                                <div className={getStrengthClass(2)}></div>
                                <div className={getStrengthClass(3)}></div>
                                <div className={getStrengthClass(4)}></div>
                                <span className="strength-text" style={{
                                    color: passwordStrength <= 2 ? (passwordStrength === 1 ? 'var(--error-red)' : '#f59e0b') : 'var(--success-green)'
                                }}>
                                    {getStrengthLabel()}
                                </span>
                            </div>
                        )}
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
                        <label htmlFor="terms" style={{ fontSize: '14px', color: 'var(--text-secondary)', cursor: 'pointer' }}>I agree to the <a href="#" onClick={(e) => { e.preventDefault(); alert('Terms and Conditions:\n\n1. Use equipment responsibly.\n2. Return items on time.\n3. Report any damages immediately.'); }} style={{ color: 'var(--primary-blue)', textDecoration: 'none' }}>Terms & Conditions</a></label>
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px', fontSize: '16px', justifyContent: 'center' }} disabled={isLoading}>
                        {isLoading ? 'Registering...' : 'Register'}
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '32px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                    Already have an account? <Link to="/login" style={{ color: 'var(--primary-blue)', fontWeight: 600, textDecoration: 'none' }}>Login here</Link>
                </p>
            </div>
        </div>
    )
}
