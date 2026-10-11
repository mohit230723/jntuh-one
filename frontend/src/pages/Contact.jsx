import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('ADMISSIONS');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setEmail('');
      setMessage('');
    }, 3000);
  };

  return (
    <div className="section-gap">
      <div className="layout-container">
        <div style={{ marginBottom: '40px' }}>
          <div className="eyebrow-pill" style={{ marginBottom: '16px' }}>CAMPUS DIRECTORY</div>
          <h1 className="display-headline" style={{ fontSize: '48px', marginBottom: '16px' }}>
            Contact & Location Details
          </h1>
          <p className="body-lead" style={{ maxWidth: '780px' }}>
            Connect with academic departments, examination administration, or the admissions cell.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '32px' }}>
          {/* Contact Details Card */}
          <div className="card-paper" style={{ padding: '36px' }}>
            <h3 className="heading-sm" style={{ marginBottom: '24px' }}>Campus Address & Administrative Offices</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontSize: '14px' }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <MapPin size={20} color="var(--color-vermillion-signal)" style={{ flexShrink: 0 }} />
                <div>
                  <strong>JNTUH UCEST Campus</strong><br />
                  Kukatpally, Hyderabad, Telangana — 500085, India.<br />
                  <span style={{ fontSize: '12px', color: 'var(--color-iron)' }}>Nearest Metro: JNTU College Station (Red Line)</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <Phone size={20} color="var(--color-slate-900)" style={{ flexShrink: 0 }} />
                <div>
                  <strong>Principal Office:</strong> +91-40-23158661<br />
                  <strong>Examination Branch:</strong> +91-40-23158662<br />
                  <strong>Training & Placement:</strong> +91-40-23158663
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <Mail size={20} color="var(--color-slate-900)" style={{ flexShrink: 0 }} />
                <div>
                  <strong>Inquiries:</strong> info.ceh@jntuh.ac.in<br />
                  <strong>Examinations:</strong> examcell.ceh@jntuh.ac.in<br />
                  <strong>CSE Dept:</strong> kavitha.cse@jntuh.ac.in
                </div>
              </div>
            </div>
          </div>

          {/* Inquiry Form */}
          <div className="card-paper" style={{ padding: '36px' }}>
            <h3 className="heading-sm" style={{ marginBottom: '8px' }}>Send Direct Inquiry</h3>
            <p style={{ fontSize: '13px', color: 'var(--color-slate-600)', marginBottom: '20px' }}>
              Submit an electronic inquiry directly to administrative officers.
            </p>

            {submitted && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#ecfdf5',
                color: 'var(--color-success)',
                padding: '12px 16px',
                borderRadius: 'var(--radius-universal)',
                fontSize: '13px',
                marginBottom: '16px'
              }}>
                <CheckCircle2 size={16} /> Inquiry recorded. Our office will respond within 48 hours.
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--color-slate-700)', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="input-field"
                  placeholder="e.g. Rahul Sharma"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--color-slate-700)', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input-field"
                  placeholder="name@example.com"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--color-slate-700)', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Inquiry Department
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="input-field"
                  style={{ backgroundColor: '#fff' }}
                >
                  <option value="ADMISSIONS">Admissions & Counseling</option>
                  <option value="ACADEMIC">Academic Regulations</option>
                  <option value="EXAMINATIONS">Autonomous Examination Branch</option>
                  <option value="HOSTELS">Hostel Accommodation</option>
                  <option value="GENERAL">General Administration</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--color-slate-700)', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  required
                  className="input-field"
                  style={{ height: 'auto', padding: '12px' }}
                  placeholder="Explain your inquiry in detail..."
                />
              </div>

              <button type="submit" className="btn-vermillion" style={{ alignSelf: 'flex-start' }}>
                <Send size={14} /> Submit Inquiry
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
