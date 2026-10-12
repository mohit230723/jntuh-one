import React, { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowUpRight, Terminal, Menu, X } from 'lucide-react';
import BrandLogo from '../components/BrandLogo';

export default function PublicLayout() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'About', path: '/about' },
    { name: 'Academics', path: '/academics' },
    { name: 'Departments', path: '/departments' },
    { name: 'Admissions', path: '/admissions' },
    { name: 'Examinations', path: '/examinations' },
    { name: 'Campus Life', path: '/campus-life' },
    { name: 'Research', path: '/research' },
    { name: 'Contact', path: '/contact' },
  ];

  const getPortalRoute = () => {
    if (!user) return '/login';
    if (user.role === 'ROLE_STUDENT') return '/portal/student';
    if (user.role === 'ROLE_FACULTY') return '/portal/faculty';
    if (user.role === 'ROLE_ADMIN') return '/portal/admin';
    return '/portal';
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--color-vellum)' }}>
      {/* Top Urgent Notice Marquee Banner */}
      <div style={{
        backgroundColor: 'var(--color-slate-900)',
        color: '#ffffff',
        padding: '6px 24px',
        fontSize: '12px',
        fontWeight: '500',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid var(--color-ink-black)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            backgroundColor: 'var(--color-vermillion-signal)',
            color: '#fff',
            fontSize: '10px',
            padding: '2px 6px',
            borderRadius: '4px',
            textTransform: 'uppercase',
            fontWeight: '600'
          }}>CIRCULAR</span>
          <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            B.Tech Autonomous Semester End Examination Schedule Released — R22 Regulation
          </span>
        </div>
        <Link to="/examinations" style={{ color: 'var(--color-cloud)', display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap', marginLeft: '12px' }}>
          View Schedule <ArrowUpRight size={12} />
        </Link>
      </div>

      {/* Sticky Main Navigation */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: 'var(--color-paper)',
        borderBottom: '1px solid var(--color-frost)',
      }}>
        <div className="layout-container" style={{
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {/* Brand Wordmark with Asterisk Device */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              fontWeight: 700,
              fontSize: '20px',
              letterSpacing: '-0.5px',
              color: 'var(--color-ink-black)'
            }}>
              <BrandLogo size={40} subtitle={false} />
            </div>
          </Link>

          {/* Desktop Navigation Items */}
          <nav className="nav-desktop">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                style={({ isActive }) => ({
                  fontSize: '13px',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.3px',
                  color: isActive ? 'var(--color-ink-black)' : 'var(--color-slate-700)',
                  borderBottom: isActive ? '2px solid var(--color-slate-900)' : '2px solid transparent',
                  paddingBottom: '2px',
                  transition: 'color 0.15s ease'
                })}
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => navigate(getPortalRoute())}
                  className="btn-vermillion"
                  style={{ padding: '8px 16px', fontSize: '12px' }}
                >
                  <Terminal size={14} /> My Portal
                </button>
                <button
                  onClick={logout}
                  className="btn-ghost"
                  style={{ padding: '8px 12px', fontSize: '12px' }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-ghost" style={{ padding: '8px 14px', fontSize: '12px' }}>
                  Login
                </Link>
                <Link to="/login" className="btn-sunset" style={{ padding: '8px 16px', fontSize: '12px' }}>
                  Portal Access →
                </Link>
              </>
            )}

            {/* Mobile Menu Hamburger Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="nav-mobile-toggle"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation Drawer */}
        {mobileMenuOpen && (
          <div style={{
            backgroundColor: 'var(--color-paper)',
            borderBottom: '1px solid var(--color-frost)',
            padding: '16px 24px 24px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                style={({ isActive }) => ({
                  fontSize: '14px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  padding: '8px 0',
                  color: isActive ? 'var(--color-vermillion-signal)' : 'var(--color-slate-900)',
                  borderBottom: '1px solid var(--color-vellum)'
                })}
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        )}
      </header>

      {/* Main Page Body */}
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>

      {/* Industrial Printed Footer */}
      <footer style={{
        backgroundColor: 'var(--color-paper)',
        borderTop: '1px solid var(--color-frost)',
        paddingTop: '48px',
        paddingBottom: '48px',
        marginTop: '64px'
      }}>
        <div className="layout-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '40px' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '18px', color: 'var(--color-ink-black)', marginBottom: '8px' }}>
                <BrandLogo size={48} />
              </div>
              <p style={{ fontSize: '14px', color: 'var(--color-slate-600)', lineHeight: '1.6' }}>
                JNTUH University College of Engineering, Science & Technology. Autonomous Constituent College, Hyderabad 500085.
              </p>
              <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
                <span className="eyebrow-pill">NBA TIER-1</span>
                <span className="eyebrow-pill">NAAC A+</span>
              </div>
            </div>

            <div>
              <div style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.3px', color: 'var(--color-slate-900)', marginBottom: '16px' }}>
                Quick Links
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', color: 'var(--color-slate-600)' }}>
                <li><Link to="/about">About Institutional Legacy</Link></li>
                <li><Link to="/academics">R22 Autonomous Regulations</Link></li>
                <li><Link to="/departments/cse">CSE Featured Department</Link></li>
                <li><Link to="/examinations">Autonomous Exam Branch</Link></li>
              </ul>
            </div>

            <div>
              <div style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.3px', color: 'var(--color-slate-900)', marginBottom: '16px' }}>
                Portals & Auth
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', color: 'var(--color-slate-600)' }}>
                <li><Link to="/login">Student Portal Sign In</Link></li>
                <li><Link to="/login">Faculty Desk Access</Link></li>
                <li><Link to="/login">Administrative Controls</Link></li>
                <li><Link to="/contact">Technical Support</Link></li>
              </ul>
            </div>

            <div>
              <div style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.3px', color: 'var(--color-slate-900)', marginBottom: '16px' }}>
                System Verification
              </div>
              <div style={{ fontSize: '13px', color: 'var(--color-slate-600)', lineHeight: '1.6' }}>
                <div>Core Engine: Spring Boot 3</div>
                <div>Frontend: React 18 / Vite</div>
                <div>Status: <span style={{ color: 'var(--color-success)', fontWeight: 600 }}>OPERATIONAL</span></div>
              </div>
            </div>
          </div>

          <div style={{
            marginTop: '48px',
            paddingTop: '24px',
            borderTop: '1px solid var(--color-frost)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '12px',
            color: 'var(--color-iron)',
            flexWrap: 'wrap',
            gap: '8px'
          }}>
            <div>© 2026 JNTUH UCEST. All rights reserved.</div>
            <div>Built for Engineering Excellence</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
