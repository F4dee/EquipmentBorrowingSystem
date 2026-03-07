import { useNavigate } from 'react-router-dom'

export default function Report() {
    const navigate = useNavigate()

    return (
        <div id="page-report" className="page-view active" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h1 className="page-title">Report Lab Issue</h1>
            <div className="card" style={{ maxWidth: 800 }}>
                <form>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                        <div className="form-group">
                            <label className="form-label">Lab Location</label>
                            <div className="input-icon-wrapper">
                                <i className="ph ph-map-pin"></i>
                                <select className="form-input" style={{ paddingLeft: '38px', appearance: 'none', background: 'transparent' }} defaultValue="">
                                    <option value="" disabled>Select a location...</option>
                                    <option value="gle101">GLE Lab 101</option>
                                    <option value="gle102">GLE Lab 102</option>
                                    <option value="bldg_a">Building A</option>
                                </select>
                                <i className="ph ph-caret-down" style={{ left: 'auto', right: '12px' }}></i>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label">PC / Equipment Number</label>
                            <div className="input-icon-wrapper">
                                <i className="ph ph-desktop"></i>
                                <input type="text" className="form-input" placeholder="e.g. PC-042" />
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Problem Description</label>
                        <textarea className="form-input" rows="6" placeholder="Please describe the issue in detail..." style={{ resize: 'vertical', padding: '16px' }}></textarea>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Attachments (Optional)</label>
                        <div className="upload-area">
                            <i className="ph ph-upload-simple upload-icon"></i>
                            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>Click or drag file to this area to upload</h3>
                            <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files.<br />Accepts JPG, PNG, PDF formats.</p>
                        </div>
                        {/* Image Previews */}
                        <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
                            <div style={{ width: '80px', height: '80px', background: 'var(--bg-page)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                                <i className="ph ph-image" style={{ fontSize: '24px', color: 'var(--text-secondary)' }}></i>
                                <div style={{ position: 'absolute', top: '-6px', right: '-6px', background: 'white', borderRadius: '50%', boxShadow: 'var(--shadow-sm)', cursor: 'pointer' }}>
                                    <i className="ph-fill ph-x-circle" style={{ color: 'var(--error-red)', fontSize: '20px' }}></i>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '16px', marginTop: '32px', borderTop: '1px solid var(--border-color)', paddingTop: '24px' }}>
                        <button type="button" className="btn btn-primary" onClick={() => { alert('Issue reported! (Simulated)'); navigate('/') }} style={{ padding: '12px 32px' }}><i className="ph ph-paper-plane-right"></i> Submit Ticket</button>
                        <button type="button" onClick={() => navigate('/')} className="btn btn-outline" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
