import React, { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Home, 
  BookOpen, 
  Calendar, 
  CheckSquare, 
  Award, 
  CreditCard, 
  Bell, 
  LogOut, 
  Users, 
  BarChart3, 
  ShieldCheck,
  Menu,
  X
} from 'lucide-react';

export default function PortalLayout() {
  const { user, logout, isStudent, isFaculty, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--color-vellum)' }}>
      {/* Left Command Deck Rail */}
      <aside style={{
        width: '260px',
        backgroundColor: 'var(--color-paper)',
        borderRight: '1px solid var(--color-frost)',
        display: 'flex',
        flexDirection: 'column',
        position: window.innerWidth < 768 ? 'fixed' : 'relative',
        zIndex: 100,
        height: '100vh',
        left: (window.innerWidth < 768 && !mobileSidebarOpen) ? '-260px' : 0,
        transition: 'left 0.25s ease'
      }}>
        {/* Brand Header */}
        <div style={{
          height: '64px',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--color-frost)'
        }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', fontWeight: 700, fontSize: '18px', color: 'var(--color-ink-black)' }}>
            UCEST ONE<span style={{ color: 'var(--color-vermillion-signal)' }}>*</span>
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              fontSize: '10px',
              fontWeight: 700,
              textTransform: 'uppercase',
              backgroundColor: 'var(--color-slate-900)',
              color: '#fff',
              padding: '2px 6px',
              borderRadius: '4px'
            }}>
              {isStudent ? 'STUDENT' : isFaculty ? 'FACULTY' : 'ADMIN'}
            </span>
            {window.innerWidth < 768 && (
              <button onClick={() => setMobileSidebarOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            )}
          </div>
        </div>

        {/* User Card */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--color-frost)', backgroundColor: 'var(--color-vellum)' }}>
          <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-slate-900)' }}>{user?.name || 'Authorized User'}</div>
          <div style={{ fontSize: '12px', color: 'var(--color-slate-600)', marginTop: '2px' }}>{user?.username}</div>
          <div style={{ fontSize: '11px', color: 'var(--color-iron)', marginTop: '4px' }}>{user?.department || 'UCEST Academic Cell'}</div>
        </div>

        {/* Navigation Deck Items */}
        <nav style={{ flex: 1, padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: '4px', overflowY: 'auto' }}>
          {isStudent && (
            <>
              <PortalNavItem to="/portal/student" onClick={() => setMobileSidebarOpen(false)} icon={<Home size={18} />} label="Student Dashboard" />
            </>
          )}

          {isFaculty && (
            <>
              <PortalNavItem to="/portal/faculty" onClick={() => setMobileSidebarOpen(false)} icon={<Home size={18} />} label="Faculty Dashboard" />
            </>
          )}

          {isAdmin && (
            <>
              <PortalNavItem to="/portal/admin" onClick={() => setMobileSidebarOpen(false)} icon={<BarChart3 size={18} />} label="Admin Console" />
            </>
          )}

          <div style={{ height: '1px', backgroundColor: 'var(--color-frost)', margin: '16px 0' }} />
          <PortalNavItem to="/" onClick={() => setMobileSidebarOpen(false)} icon={<ShieldCheck size={18} />} label="Public Website" />
        </nav>

        {/* Logout Control */}
        <div style={{ padding: '16px 20px', borderTop: '1px solid var(--color-frost)' }}>
          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 14px',
              fontSize: '13px',
              color: 'var(--color-slate-700)',
              borderRadius: 'var(--radius-universal)',
              transition: 'background-color 0.15s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-vellum)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <LogOut size={16} /> Disconnect Session
          </button>
        </div>
      </aside>

      {/* Main Command Workspace */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Top Header Rail */}
        <header style={{
          height: '64px',
          backgroundColor: 'var(--color-paper)',
          borderBottom: '1px solid var(--color-frost)',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="nav-mobile-toggle"
              aria-label="Toggle portal menu"
            >
              <Menu size={20} />
            </button>
            <div style={{ fontSize: '13px', color: 'var(--color-slate-600)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-success)' }} />
              <span>SESSION ACTIVE</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span className="eyebrow-pill" style={{ color: 'var(--color-slate-900)' }}>
              ACADEMIC YEAR 2026-2027
            </span>
          </div>
        </header>

        {/* Content Viewport */}
        <main style={{ flex: 1, padding: '24px' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function PortalNavItem({ to, icon, label, onClick }) {
  return (
    <NavLink
      to={to}
      end
      onClick={onClick}
      style={({ isActive }) => ({
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '10px 14px',
        fontSize: '13px',
        fontWeight: isActive ? 600 : 500,
        color: isActive ? 'var(--color-ink-black)' : 'var(--color-slate-600)',
        backgroundColor: isActive ? 'var(--color-vellum)' : 'transparent',
        borderRadius: 'var(--radius-universal)',
        borderLeft: isActive ? '3px solid var(--color-vermillion-signal)' : '3px solid transparent',
        transition: 'all 0.15s ease'
      })}
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
}
