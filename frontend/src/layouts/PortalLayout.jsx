import React from 'react';
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
  ShieldCheck 
} from 'lucide-react';

export default function PortalLayout() {
  const { user, logout, isStudent, isFaculty, isAdmin } = useAuth();
  const navigate = useNavigate();

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
        </div>

        {/* User Card */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--color-frost)', backgroundColor: 'var(--color-vellum)' }}>
          <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-slate-900)' }}>{user?.name || 'Authorized User'}</div>
          <div style={{ fontSize: '12px', color: 'var(--color-slate-600)', marginTop: '2px' }}>{user?.username}</div>
          <div style={{ fontSize: '11px', color: 'var(--color-iron)', marginTop: '4px' }}>{user?.department || 'UCEST Academic Cell'}</div>
        </div>

        {/* Navigation Deck Items */}
        <nav style={{ flex: 1, padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {isStudent && (
            <>
              <PortalNavItem to="/portal/student" icon={<Home size={18} />} label="Overview" />
              <PortalNavItem to="/portal/student/attendance" icon={<CheckSquare size={18} />} label="Attendance" />
              <PortalNavItem to="/portal/student/results" icon={<Award size={18} />} label="Semester Results" />
              <PortalNavItem to="/portal/student/timetable" icon={<Calendar size={18} />} label="Class Timetable" />
              <PortalNavItem to="/portal/student/fees" icon={<CreditCard size={18} />} label="Fee Records" />
            </>
          )}

          {isFaculty && (
            <>
              <PortalNavItem to="/portal/faculty" icon={<Home size={18} />} label="Assigned Classes" />
              <PortalNavItem to="/portal/faculty/attendance" icon={<CheckSquare size={18} />} label="Mark Attendance" />
              <PortalNavItem to="/portal/faculty/marks" icon={<Award size={18} />} label="Internal Marks" />
              <PortalNavItem to="/portal/faculty/notices" icon={<Bell size={18} />} label="Post Notice" />
            </>
          )}

          {isAdmin && (
            <>
              <PortalNavItem to="/portal/admin" icon={<BarChart3 size={18} />} label="System Metrics" />
              <PortalNavItem to="/portal/admin/notices" icon={<Bell size={18} />} label="Manage Notices" />
              <PortalNavItem to="/portal/admin/users" icon={<Users size={18} />} label="Provision Users" />
            </>
          )}

          <div style={{ height: '1px', backgroundColor: 'var(--color-frost)', margin: '16px 0' }} />
          <PortalNavItem to="/" icon={<ShieldCheck size={18} />} label="Public Website" />
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
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Top Header Rail */}
        <header style={{
          height: '64px',
          backgroundColor: 'var(--color-paper)',
          borderBottom: '1px solid var(--color-frost)',
          padding: '0 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ fontSize: '13px', color: 'var(--color-slate-600)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-success)' }} />
            SESSION ACTIVE — {user?.role}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span className="eyebrow-pill" style={{ color: 'var(--color-slate-900)' }}>
              ACADEMIC YEAR 2026-2027
            </span>
          </div>
        </header>

        {/* Content Viewport */}
        <main style={{ flex: 1, padding: '32px' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function PortalNavItem({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      end={to === '/portal/student' || to === '/portal/faculty' || to === '/portal/admin'}
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
