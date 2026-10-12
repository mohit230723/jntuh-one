import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { USE_MOCKS } from '../services/mock';
import { Lock, User, ArrowRight, AlertCircle, Shield } from 'lucide-react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleQuickFill = (u, p) => {
    setUsername(u);
    setPassword(p);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const res = await login(username, password);
      if (res.success) {
        if (res.user.role === 'ROLE_STUDENT') navigate('/portal/student');
        else if (res.user.role === 'ROLE_FACULTY') navigate('/portal/faculty');
        else if (res.user.role === 'ROLE_ADMIN') navigate('/portal/admin');
        else navigate('/portal');
      } else if (USE_MOCKS) {
        handleMockLogin(username);
      } else {
        setError(res.error);
      }
    } finally {
      setSubmitting(false);
    }
  };

  // Local UI development only (VITE_USE_MOCKS=true with `npm run dev`); never in Docker/K8s builds.
  const handleMockLogin = (u) => {
    if (u.startsWith('23011')) {
      const mockStudent = { id: 1, username: u, name: 'A. Rahul Sharma', role: 'ROLE_STUDENT', department: 'CSE' };
      localStorage.setItem('ucest_token', 'mock_jwt_token_student');
      localStorage.setItem('ucest_user', JSON.stringify(mockStudent));
      window.location.href = '/portal/student';
    } else if (u.startsWith('FAC')) {
      const mockFaculty = { id: 2, username: u, name: 'Mr. P. Vijay Kumar', role: 'ROLE_FACULTY', department: 'CSE' };
      localStorage.setItem('ucest_token', 'mock_jwt_token_faculty');
      localStorage.setItem('ucest_user', JSON.stringify(mockFaculty));
      window.location.href = '/portal/faculty';
    } else if (u === 'admin') {
      const mockAdmin = { id: 1, username: 'admin', name: 'Dr. S. K. Sharma (Registrar)', role: 'ROLE_ADMIN', department: 'Administration' };
      localStorage.setItem('ucest_token', 'mock_jwt_token_admin');
      localStorage.setItem('ucest_user', JSON.stringify(mockAdmin));
      window.location.href = '/portal/admin';
    } else {
      setError('Invalid credentials. Please select one of the demo accounts below.');
    }
  };

  return (
    <div style={{
      minHeight: 'calc(100vh - 120px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 24px'
    }}>
      <div style={{ width: '100%', maxWidth: '440px' }}>
        {/* Card Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div className="eyebrow-pill" style={{ marginBottom: '12px' }}>
            AUTHENTICATED ACCESS CONTROL
          </div>
          <h1 className="heading-lg" style={{ fontSize: '32px', marginBottom: '8px' }}>
            Portal Sign In
          </h1>
          <p className="body-standard" style={{ fontSize: '14px' }}>
            Access academic dashboards, marks, attendance, and administrative services.
          </p>
        </div>

        {error && (
          <div role="alert" data-testid="login-error" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#fef2f2',
            border: '1px solid #fee2e2',
            color: 'var(--color-danger)',
            fontSize: '13px',
            padding: '12px 16px',
            borderRadius: 'var(--radius-universal)',
            marginBottom: '20px'
          }}>
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        {/* Login Form Card */}
        <div className="card-paper" style={{ padding: '32px' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.3px', color: 'var(--color-slate-700)', marginBottom: '8px' }}>
                Username / Roll Number / Faculty ID
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  id="username-input"
                  data-testid="username-input"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="input-field"
                  placeholder="e.g. 23011A0501"
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.3px', color: 'var(--color-slate-700)', marginBottom: '8px' }}>
                Account Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  id="password-input"
                  data-testid="password-input"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="input-field"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              id="login-submit-btn"
              data-testid="login-submit-btn"
              type="submit"
              disabled={submitting}
              className="btn-vermillion"
              style={{ width: '100%', marginTop: '8px' }}
            >
              {submitting ? 'Verifying Session...' : 'Authenticate Session'} <ArrowRight size={16} />
            </button>
          </form>

          {/* Quick Demo Credentials */}
          <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid var(--color-frost)' }}>
            <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.3px', color: 'var(--color-iron)', marginBottom: '12px' }}>
              Quick Fill Demo Accounts:
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button
                id="quick-fill-student"
                data-testid="quick-fill-student"
                type="button"
                onClick={() => handleQuickFill('23011A0501', 'student123')}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '8px 12px',
                  backgroundColor: 'var(--color-vellum)',
                  border: '1px solid var(--color-frost)',
                  borderRadius: 'var(--radius-universal)',
                  fontSize: '12px',
                  color: 'var(--color-slate-700)'
                }}
              >
                <span>Student: <strong>23011A0501</strong></span>
                <span style={{ color: 'var(--color-slate-600)' }}>Pass: student123</span>
              </button>

              <button
                id="quick-fill-faculty"
                data-testid="quick-fill-faculty"
                type="button"
                onClick={() => handleQuickFill('FAC-CSE-102', 'faculty123')}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '8px 12px',
                  backgroundColor: 'var(--color-vellum)',
                  border: '1px solid var(--color-frost)',
                  borderRadius: 'var(--radius-universal)',
                  fontSize: '12px',
                  color: 'var(--color-slate-700)'
                }}
              >
                <span>Faculty: <strong>FAC-CSE-102</strong></span>
                <span style={{ color: 'var(--color-slate-600)' }}>Pass: faculty123</span>
              </button>

              <button
                id="quick-fill-admin"
                data-testid="quick-fill-admin"
                type="button"
                onClick={() => handleQuickFill('admin', 'admin123')}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '8px 12px',
                  backgroundColor: 'var(--color-vellum)',
                  border: '1px solid var(--color-frost)',
                  borderRadius: 'var(--radius-universal)',
                  fontSize: '12px',
                  color: 'var(--color-slate-700)'
                }}
              >
                <span>Admin: <strong>admin</strong></span>
                <span style={{ color: 'var(--color-slate-600)' }}>Pass: admin123</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
