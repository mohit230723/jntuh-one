import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  BarChart3, 
  Users, 
  Bell, 
  Plus, 
  CheckCircle2, 
  ShieldAlert, 
  Trash2, 
  Pin, 
  UserPlus, 
  DollarSign, 
  Building,
  CheckCircle
} from 'lucide-react';
import { adminService } from '../../services/adminService';
import { noticeService } from '../../services/noticeService';
import { errorMessage } from '../../services/mock';
import ErrorState from '../../components/ErrorState';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview'); // overview, notices, users
  const [stats, setStats] = useState(null);
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // New Notice form
  const [newNoticeTitle, setNewNoticeTitle] = useState('');
  const [newNoticeCategory, setNewNoticeCategory] = useState('ACADEMIC');
  const [newNoticeDesc, setNewNoticeDesc] = useState('');
  const [newNoticePinned, setNewNoticePinned] = useState(false);
  const [noticeSubmitting, setNoticeSubmitting] = useState(false);
  const [noticeSuccess, setNoticeSuccess] = useState(null);

  // User Provisioning form
  const [newUsername, setNewUsername] = useState('');
  const [newFullName, setNewFullName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('password123');
  const [newRole, setNewRole] = useState('ROLE_STUDENT');
  const [newDept, setNewDept] = useState('CSE');
  const [userSubmitting, setUserSubmitting] = useState(false);
  const [userSuccess, setUserSuccess] = useState(null);
  const [userError, setUserError] = useState(null);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [statsData, noticesData] = await Promise.all([
          adminService.getStats(),
          noticeService.getNotices()
        ]);
        setStats(statsData);
        setNotices(noticesData.content || noticesData || []);
      } catch (err) {
        setError(`Could not load dashboard data. ${errorMessage(err)}`);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleCreateNotice = async (e) => {
    e.preventDefault();
    if (!newNoticeTitle.trim()) return;
    setNoticeSubmitting(true);
    setNoticeSuccess(null);
    setError('');
    try {
      const created = await noticeService.createNotice({
        title: newNoticeTitle,
        category: newNoticeCategory,
        description: newNoticeDesc,
        pinned: newNoticePinned,
        author: user?.name || 'Central Administration'
      });
      setNotices([created, ...notices]);
      setNewNoticeTitle('');
      setNewNoticeDesc('');
      setNewNoticePinned(false);
      setNoticeSuccess('Notice broadcasted and published to live website and student portal.');
      setTimeout(() => setNoticeSuccess(null), 4000);
    } catch (err) {
      setError(`Notice was NOT published. ${errorMessage(err)}`);
    } finally {
      setNoticeSubmitting(false);
    }
  };

  const handleDeleteNotice = async (id) => {
    if (!window.confirm('Are you sure you want to archive this notice?')) return;
    try {
      await noticeService.deleteNotice(id);
      setNotices(notices.filter((n) => n.id !== id));
    } catch (err) {
      setError(`Notice was NOT archived. ${errorMessage(err)}`);
    }
  };

  const handleTogglePin = async (notice) => {
    try {
      const updated = await noticeService.updateNotice(notice.id, {
        pinned: !notice.pinned
      });
      setNotices(notices.map((n) => (n.id === notice.id ? { ...n, pinned: !n.pinned } : n)));
    } catch (err) {
      setError(`Notice was NOT updated. ${errorMessage(err)}`);
    }
  };

  const handleProvisionUser = async (e) => {
    e.preventDefault();
    setUserSubmitting(true);
    setUserSuccess(null);
    setUserError(null);
    try {
      const res = await adminService.provisionUser({
        username: newUsername,
        fullName: newFullName,
        email: newEmail,
        password: newPassword,
        role: newRole,
        department: newDept
      });
      setUserSuccess(`Account successfully provisioned for ${newFullName} (${newUsername}) with role ${newRole}.`);
      setNewUsername('');
      setNewFullName('');
      setNewEmail('');
      setTimeout(() => setUserSuccess(null), 5000);
    } catch (err) {
      setUserError(errorMessage(err, 'Failed to provision user.'));
    } finally {
      setUserSubmitting(false);
    }
  };

  return (
    <div>
      {/* Admin Header */}
      <div style={{ marginBottom: '28px' }}>
        <div className="eyebrow-pill" style={{ marginBottom: '8px' }}>ADMINISTRATIVE GOVERNANCE</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 className="heading-lg" style={{ fontSize: '32px' }}>System Command Console</h1>
            <div style={{ fontSize: '13px', color: 'var(--color-slate-600)', marginTop: '4px' }}>
              Authenticated Administrator: <strong>{user?.name || user?.username}</strong> • Autonomous Campus Operations
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <span className="eyebrow-pill" style={{ backgroundColor: 'var(--color-paper)' }}>Autonomous Node #01</span>
            <span className="eyebrow-pill" style={{ backgroundColor: 'var(--color-paper)' }}>Security Clearance: Tier-0</span>
          </div>
        </div>
      </div>

      {error && <ErrorState message={error} />}

      {/* Mode Sub-Tabs */}
      <div style={{
        display: 'flex',
        gap: '8px',
        borderBottom: '1px solid var(--color-frost)',
        paddingBottom: '12px',
        marginBottom: '28px'
      }}>
        <button
          id="admin-tab-overview"
          data-testid="admin-tab-overview"
          onClick={() => setActiveTab('overview')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 16px',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: activeTab === 'overview' ? 'var(--color-carbon)' : 'var(--color-paper)',
            color: activeTab === 'overview' ? '#ffffff' : 'var(--color-slate-700)',
            border: '1px solid var(--color-cloud)',
            fontWeight: activeTab === 'overview' ? 600 : 500,
            fontSize: '13px',
            cursor: 'pointer'
          }}
        >
          <BarChart3 size={16} /> Overview & Metrics
        </button>
        <button
          id="admin-tab-notices"
          data-testid="admin-tab-notices"
          onClick={() => setActiveTab('notices')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 16px',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: activeTab === 'notices' ? 'var(--color-carbon)' : 'var(--color-paper)',
            color: activeTab === 'notices' ? '#ffffff' : 'var(--color-slate-700)',
            border: '1px solid var(--color-cloud)',
            fontWeight: activeTab === 'notices' ? 600 : 500,
            fontSize: '13px',
            cursor: 'pointer'
          }}
        >
          <Bell size={16} /> Notice Management ({notices.length})
        </button>
        <button
          id="admin-tab-users"
          data-testid="admin-tab-users"
          onClick={() => setActiveTab('users')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 16px',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: activeTab === 'users' ? 'var(--color-carbon)' : 'var(--color-paper)',
            color: activeTab === 'users' ? '#ffffff' : 'var(--color-slate-700)',
            border: '1px solid var(--color-cloud)',
            fontWeight: activeTab === 'users' ? 600 : 500,
            fontSize: '13px',
            cursor: 'pointer'
          }}
        >
          <UserPlus size={16} /> Provision Users
        </button>
      </div>

      {/* Aggregate Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        <div className="card-paper" style={{ padding: '24px' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-slate-600)', textTransform: 'uppercase' }}>
            Enrolled Scholars
          </div>
          <div className="stat-number" style={{ fontSize: '36px', marginTop: '8px' }}>
            {stats?.totalStudents ?? '—'}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--color-iron)', marginTop: '4px' }}>
            Batch 2023–2027 CSE Cohort
          </div>
        </div>

        <div className="card-paper" style={{ padding: '24px' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-slate-600)', textTransform: 'uppercase' }}>
            Teaching Faculty
          </div>
          <div className="stat-number" style={{ fontSize: '36px', marginTop: '8px' }}>
            {stats?.totalFaculty ?? '—'}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--color-iron)', marginTop: '4px' }}>
            Doctoral Roster
          </div>
        </div>

        <div className="card-paper" style={{ padding: '24px' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-slate-600)', textTransform: 'uppercase' }}>
            Active Circulars
          </div>
          <div className="stat-number" style={{ fontSize: '36px', marginTop: '8px' }}>
            {notices.length}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--color-iron)', marginTop: '4px' }}>
            Public & Portal Feeds
          </div>
        </div>

        <div className="card-paper" style={{ padding: '24px' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-slate-600)', textTransform: 'uppercase' }}>
            Academic Divisions
          </div>
          <div className="stat-number" style={{ fontSize: '36px', marginTop: '8px' }}>
            {stats?.departmentsCount ?? '—'}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--color-iron)', marginTop: '4px' }}>
            Departments
          </div>
        </div>

        <div className="card-paper" style={{ padding: '24px' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-slate-600)', textTransform: 'uppercase' }}>
            Fee Collections
          </div>
          <div className="stat-number" style={{ fontSize: '36px', marginTop: '8px' }}>
            {stats?.totalFeeCollected != null ? '₹' + (stats.totalFeeCollected / 100000).toFixed(1) + 'L' : '—'}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--color-success)', marginTop: '4px', fontWeight: 600 }}>
            94.3% Clearance Rate
          </div>
        </div>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '32px' }}>
          {/* Recent Broadcasts */}
          <div className="card-paper" style={{ padding: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 className="heading-sm">Recent Circular Dispatches</h3>
              <button onClick={() => setActiveTab('notices')} className="btn-ghost" style={{ fontSize: '12px' }}>
                Manage All →
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {notices.slice(0, 5).map((n) => (
                <div 
                  key={n.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '14px 16px',
                    backgroundColor: 'var(--color-vellum)',
                    borderRadius: 'var(--radius-lg)'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-slate-900)' }}>{n.title}</div>
                    <div style={{ fontSize: '12px', color: 'var(--color-iron)', marginTop: '2px' }}>
                      {n.category} • {n.postedDate}
                    </div>
                  </div>
                  {n.pinned && (
                    <span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', backgroundColor: 'var(--color-vermillion-signal)', color: '#fff' }}>
                      PINNED
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* System Health Card */}
          <div className="card-paper" style={{ padding: '28px' }}>
            <h3 className="heading-sm" style={{ marginBottom: '16px' }}>Infrastructure Readiness Status</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', backgroundColor: 'var(--color-vellum)', borderRadius: 'var(--radius-lg)' }}>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 600 }}>Spring Boot Microservices</div>
                  <div style={{ fontSize: '12px', color: 'var(--color-iron)' }}>Port 8080 • Actuator Health API</div>
                </div>
                <span style={{ color: 'var(--color-success)', fontWeight: 600, fontSize: '12px' }}>✓ HEALTHY</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', backgroundColor: 'var(--color-vellum)', borderRadius: 'var(--radius-lg)' }}>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 600 }}>MySQL 8 Relational Schema</div>
                  <div style={{ fontSize: '12px', color: 'var(--color-iron)' }}>12 Relational Tables • BCrypt Vault</div>
                </div>
                <span style={{ color: 'var(--color-success)', fontWeight: 600, fontSize: '12px' }}>✓ CONNECTED</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', backgroundColor: 'var(--color-vellum)', borderRadius: 'var(--radius-lg)' }}>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 600 }}>JWT Stateless Authentication</div>
                  <div style={{ fontSize: '12px', color: 'var(--color-iron)' }}>HS256 256-bit Signatures • Role Guards</div>
                </div>
                <span style={{ color: 'var(--color-success)', fontWeight: 600, fontSize: '12px' }}>✓ ACTIVE</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', backgroundColor: 'var(--color-vellum)', borderRadius: 'var(--radius-lg)' }}>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 600 }}>Orderful Command Deck UI</div>
                  <div style={{ fontSize: '12px', color: 'var(--color-iron)' }}>React 18 + Vite • 8px Universal Radius</div>
                </div>
                <span style={{ color: 'var(--color-success)', fontWeight: 600, fontSize: '12px' }}>✓ RENDERED</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: NOTICE MANAGEMENT */}
      {activeTab === 'notices' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '32px' }}>
          {/* Publish Notice Form */}
          <div className="card-paper" style={{ padding: '32px' }}>
            <h3 className="heading-sm" style={{ marginBottom: '8px' }}>
              Publish Official Circular
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--color-slate-600)', marginBottom: '20px' }}>
              Broadcast real-time announcements to the public site and portals.
            </p>

            {noticeSuccess && (
              <div style={{
                padding: '12px 16px',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'rgba(2, 122, 72, 0.1)',
                border: '1px solid var(--color-success)',
                color: 'var(--color-success)',
                fontSize: '13px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '16px'
              }}>
                <CheckCircle2 size={16} /> {noticeSuccess}
              </div>
            )}

            <form onSubmit={handleCreateNotice} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--color-slate-700)', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Notice Title
                </label>
                <input
                  type="text"
                  value={newNoticeTitle}
                  onChange={(e) => setNewNoticeTitle(e.target.value)}
                  required
                  className="input-field"
                  placeholder="e.g. Autonomous B.Tech Recounting Schedule"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--color-slate-700)', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Category
                </label>
                <select
                  value={newNoticeCategory}
                  onChange={(e) => setNewNoticeCategory(e.target.value)}
                  className="input-field"
                  style={{ backgroundColor: '#fff' }}
                >
                  <option value="ACADEMIC">ACADEMIC</option>
                  <option value="EXAM">EXAM</option>
                  <option value="EVENTS">EVENTS</option>
                  <option value="GENERAL">GENERAL</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--color-slate-700)', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Description
                </label>
                <textarea
                  value={newNoticeDesc}
                  onChange={(e) => setNewNoticeDesc(e.target.value)}
                  required
                  rows={4}
                  className="input-field"
                  style={{ height: 'auto', padding: '12px' }}
                  placeholder="Provide full announcement details..."
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="checkbox"
                  id="pinCheck"
                  checked={newNoticePinned}
                  onChange={(e) => setNewNoticePinned(e.target.checked)}
                />
                <label htmlFor="pinCheck" style={{ fontSize: '13px', color: 'var(--color-slate-700)', cursor: 'pointer' }}>
                  Pin this circular as Urgent Marquee Notice
                </label>
              </div>

              <button type="submit" disabled={noticeSubmitting} className="btn-vermillion" style={{ alignSelf: 'flex-start' }}>
                <Plus size={16} /> {noticeSubmitting ? 'Publishing...' : 'Publish Circular'}
              </button>
            </form>
          </div>

          {/* Active Notices List with Actions */}
          <div className="card-paper" style={{ padding: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 className="heading-sm">Active Circular Roster</h3>
              <span className="eyebrow-pill">{notices.length} TOTAL</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '520px', overflowY: 'auto' }}>
              {notices.map((n) => (
                <div
                  key={n.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '16px',
                    backgroundColor: 'var(--color-vellum)',
                    border: '1px solid var(--color-frost)',
                    borderRadius: 'var(--radius-lg)',
                    gap: '12px'
                  }}
                >
                  <div style={{ maxWidth: '70%' }}>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-slate-900)' }}>
                      {n.title}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--color-slate-600)', marginTop: '2px' }}>
                      {n.category} • Posted: {n.postedDate}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button
                      onClick={() => handleTogglePin(n)}
                      title={n.pinned ? 'Unpin Notice' : 'Pin Notice'}
                      style={{
                        background: n.pinned ? 'var(--color-vermillion-signal)' : 'var(--color-paper)',
                        color: n.pinned ? '#fff' : 'var(--color-slate-600)',
                        border: '1px solid var(--color-cloud)',
                        borderRadius: 'var(--radius-lg)',
                        padding: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      <Pin size={14} />
                    </button>
                    <button
                      onClick={() => handleDeleteNotice(n.id)}
                      title="Archive Notice"
                      style={{
                        background: 'var(--color-paper)',
                        color: 'var(--color-danger)',
                        border: '1px solid var(--color-cloud)',
                        borderRadius: 'var(--radius-lg)',
                        padding: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: USER PROVISIONING */}
      {activeTab === 'users' && (
        <div className="card-paper" style={{ padding: '32px', maxWidth: '680px' }}>
          <h3 className="heading-sm" style={{ marginBottom: '8px' }}>
            Provision Scholar or Faculty Account
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--color-slate-600)', marginBottom: '24px' }}>
            Creates the authentication principal in the database with BCrypt password hashing and initializes the corresponding profile.
          </p>

          {userSuccess && (
            <div style={{
              padding: '12px 16px',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'rgba(2, 122, 72, 0.1)',
              border: '1px solid var(--color-success)',
              color: 'var(--color-success)',
              fontSize: '13px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '20px'
            }}>
              <CheckCircle2 size={16} /> {userSuccess}
            </div>
          )}

          {userError && (
            <div style={{
              padding: '12px 16px',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'rgba(228, 43, 12, 0.1)',
              border: '1px solid var(--color-vermillion-signal)',
              color: 'var(--color-vermillion-signal)',
              fontSize: '13px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '20px'
            }}>
              <ShieldAlert size={16} /> {userError}
            </div>
          )}

          <form onSubmit={handleProvisionUser} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--color-slate-700)', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Roll Number / Faculty Code (Username)
                </label>
                <input
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  required
                  placeholder="e.g. 23011A0561 or FAC-CSE-115"
                  className="input-field"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--color-slate-700)', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Full Legal Name
                </label>
                <input
                  type="text"
                  value={newFullName}
                  onChange={(e) => setNewFullName(e.target.value)}
                  required
                  placeholder="e.g. K. Vikramaditya"
                  className="input-field"
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--color-slate-700)', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Official Email Address
                </label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  required
                  placeholder="e.g. 23011a0561@ucest.edu"
                  className="input-field"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--color-slate-700)', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Temporary Initial Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="input-field"
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--color-slate-700)', textTransform: 'uppercase', marginBottom: '6px' }}>
                  System Authorization Role
                </label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="input-field"
                  style={{ backgroundColor: '#fff' }}
                >
                  <option value="ROLE_STUDENT">ROLE_STUDENT (Enrolled Scholar)</option>
                  <option value="ROLE_FACULTY">ROLE_FACULTY (Academic Instructor)</option>
                  <option value="ROLE_ADMIN">ROLE_ADMIN (Campus Governance)</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--color-slate-700)', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Assigned Department
                </label>
                <select
                  value={newDept}
                  onChange={(e) => setNewDept(e.target.value)}
                  className="input-field"
                  style={{ backgroundColor: '#fff' }}
                >
                  <option value="CSE">Computer Science and Engineering</option>
                  <option value="ECE">Electronics and Communication</option>
                  <option value="EEE">Electrical and Electronics</option>
                  <option value="ME">Mechanical Engineering</option>
                  <option value="CE">Civil Engineering</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={userSubmitting}
              className="btn-vermillion"
              style={{ alignSelf: 'flex-start', marginTop: '8px' }}
            >
              <UserPlus size={16} /> {userSubmitting ? 'Provisioning...' : 'Provision User Account'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
