import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ticketApi } from '../services/api'
import { useAppContext } from '../context/AppContext'

export default function Report() {
    const navigate = useNavigate()
    const { user, showToast } = useAppContext()
    const [labLocation, setLabLocation] = useState('')
    const [pcNumber, setPcNumber] = useState('')
    const [description, setDescription] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState(null)
    const [files, setFiles] = useState([])
    const [dragging, setDragging] = useState(false)

    const handleDragOver = (e) => {
        e.preventDefault()
        setDragging(true)
    }

    const handleDragLeave = (e) => {
        e.preventDefault()
        setDragging(false)
    }

    const handleDrop = (e) => {
        e.preventDefault()
        setDragging(false)
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            setFiles(prev => [...prev, ...Array.from(e.dataTransfer.files)])
        }
    }

    const handleFileSelect = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setFiles(prev => [...prev, ...Array.from(e.target.files)])
        }
    }

    const removeFile = (index) => {
        setFiles(prev => prev.filter((_, i) => i !== index))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            showToast("Please log in to submit a ticket.", "error")
            navigate('/login')
            return
        }

        if (!labLocation || !pcNumber || !description) {
            setError('Please fill out all required fields.')
            return
        }

        setIsSubmitting(true)
        setError(null)

        try {
            await ticketApi.create({ userId: user.id, labLocation, pcNumber, description })
            showToast('Issue reported successfully!')
            navigate('/')
        } catch (err) {
            setError(err.message || 'Failed to submit ticket')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div id="page-report" className="page-view active" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h1 className="page-title">Report Lab Issue</h1>
            {error && <div style={{ color: 'var(--error-red)', backgroundColor: '#ffebee', padding: '10px', borderRadius: '4px', marginBottom: '16px', textAlign: 'center' }}>{error}</div>}
            <div className="card" style={{ maxWidth: 800 }}>
                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                        <div className="form-group">
                            <label className="form-label">Lab Location</label>
                            <div className="input-icon-wrapper">
                                <i className="ph ph-map-pin"></i>
                                <select
                                    className="form-input"
                                    style={{ paddingLeft: '38px', appearance: 'none', background: 'transparent' }}
                                    value={labLocation}
                                    onChange={(e) => setLabLocation(e.target.value)}
                                >
                                    <option value="" disabled>Select a location...</option>
                                    <option value="GLE Lab 101">GLE Lab 101</option>
                                    <option value="GLE Lab 102">GLE Lab 102</option>
                                    <option value="Building A">Building A</option>
                                </select>
                                <i className="ph ph-caret-down" style={{ left: 'auto', right: '12px' }}></i>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label">PC / Equipment Number</label>
                            <div className="input-icon-wrapper">
                                <i className="ph ph-desktop"></i>
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="e.g. PC-042"
                                    value={pcNumber}
                                    onChange={(e) => setPcNumber(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Problem Description</label>
                        <textarea
                            className="form-input"
                            rows="6"
                            placeholder="Please describe the issue in detail..."
                            style={{ resize: 'vertical', padding: '16px' }}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Attachments (Optional)</label>
                        <div
                            className={`upload-area ${dragging ? 'dragging' : ''}`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={() => document.getElementById('fileUpload').click()}
                            style={{
                                cursor: 'pointer',
                                border: dragging ? '2px dashed var(--primary-blue)' : '2px dashed var(--border-color)',
                                backgroundColor: dragging ? 'rgba(59, 130, 246, 0.05)' : 'transparent',
                                transition: 'all 0.2s ease',
                                padding: '32px',
                                textAlign: 'center',
                                borderRadius: 'var(--radius-md)'
                            }}
                        >
                            <input
                                type="file"
                                id="fileUpload"
                                multiple
                                style={{ display: 'none' }}
                                onChange={handleFileSelect}
                                accept="image/png, image/jpeg, application/pdf"
                            />
                            <i className="ph ph-upload-simple upload-icon" style={{ fontSize: '32px', color: 'var(--primary-blue)', marginBottom: '16px', display: 'block' }}></i>
                            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>Click or drag file to this area to upload</h3>
                            <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Support for a single or bulk upload. Accepts JPG, PNG, PDF formats.</p>
                        </div>

                        {/* Image Previews */}
                        {files.length > 0 && (
                            <div style={{ display: 'flex', gap: '16px', marginTop: '16px', flexWrap: 'wrap' }}>
                                {files.map((file, idx) => {
                                    const isImage = file.type.startsWith('image/')
                                    const previewUrl = isImage ? URL.createObjectURL(file) : null

                                    return (
                                        <div key={idx} style={{ position: 'relative', width: '80px', height: '80px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', backgroundColor: 'var(--bg-page)' }}>
                                            {isImage ? (
                                                <img src={previewUrl} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            ) : (
                                                <div style={{ padding: '8px', textAlign: 'center' }}>
                                                    <i className="ph ph-file-text" style={{ fontSize: '24px', color: 'var(--text-secondary)' }}></i>
                                                    <div style={{ fontSize: '10px', marginTop: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '60px' }}>{file.name}</div>
                                                </div>
                                            )}
                                            <div
                                                onClick={(e) => { e.stopPropagation(); removeFile(idx); }}
                                                style={{ position: 'absolute', top: '-6px', right: '-6px', background: 'white', borderRadius: '50%', boxShadow: 'var(--shadow-sm)', cursor: 'pointer', zIndex: 10 }}
                                            >
                                                <i className="ph-fill ph-x-circle" style={{ color: 'var(--error-red)', fontSize: '20px' }}></i>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </div>

                    <div style={{ display: 'flex', gap: '16px', marginTop: '32px', borderTop: '1px solid var(--border-color)', paddingTop: '24px' }}>
                        <button type="submit" className="btn btn-primary" disabled={isSubmitting} style={{ padding: '12px 32px' }}>
                            <i className="ph ph-paper-plane-right"></i> {isSubmitting ? 'Submitting...' : 'Submit Ticket'}
                        </button>
                        <button type="button" onClick={() => navigate('/')} className="btn btn-outline" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
