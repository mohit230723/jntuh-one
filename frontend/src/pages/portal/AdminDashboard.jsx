import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { BarChart3, Users, Bell, Plus, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [newNoticeTitle, setNewNoticeTitle] = useState('');
  const [newNoticeCategory, setNewNoticeCategory] = useState('ACADEMIC');
  const [newNoticeDesc, setNewNoticeDesc] = useState('');
  const [published, setPublished] = useState(false);

  const [notices, setNotices] = useState([
    { id: 1, title: 'Semester End Examination Schedule Notification', category: 'EXAM', date: '2026-10-10', pinned: true },
    { id: 2, title: 'Condonation of Attendance Notification (65% - 75%)', category: 'ACADEMIC', date: '2026-10-08', pinned: true },
    { id: 3, title: 'Campus Placement Drive — Oracle & Salesforce', category: 'GENERAL', date: '2026-10-05', pinned: false },
    { id: 4, title: 'Pragnya 2026 Annual Technical Fest', category: 'EVENTS', date: '2026-10-02', pinned: false },
  ]);

  const handlePublish = (e) => {
    e.preventDefault();
    if (!newNoticeTitle) return;
    const newNotice = {
      id: Date.now(),
      title: newNoticeTitle,
      category: newNoticeCategory,
      date: new Date().toISOString().split('T')[0],
      pinned: false
    };
    setNotices([newNotice, ...notices]);
    setNewNoticeTitle('');
    setNewNoticeDesc('');
    setPublished(true);
    setTimeout(() => setPublished(false), 3000);
  };

  return (
    <div>
      {/* Admin Header */}
      <div style={{ marginBottom: '32px' }}>
        <div className="eyebrow-pill" style={{ marginBottom: '8px' }}>ADMINISTRATIVE GOVERNANCE</div>
        <h1 className="heading-lg" style={{ fontSize: '32px' }}>System Command Console</h1>
        <div style={{ fontSize: '13px', color: 'var(--color-slate-600)', marginTop: '4px' }}>
          Authenticated Administrator: <strong>{user?.name || 'Dr. S. K. Sharma (Registrar)'}</strong>
        </div>
      </div>

      {/* Aggregate Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '36px' }}>
        <div className="card-paper" style={{ padding: '24px' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-slate-600)', textTransform: 'uppercase' }}>
            Enrolled Students
          </div>
          <div className="stat-number" style={{ fontSize: '36px', marginTop: '8px' }}>60</div>
          <div style={{ fontSize: '12px', color: 'var(--color-iron)', marginTop: '4px' }}>
            Batch 2023–2027 CSE Cohort
          </div>
        </div>

        <div className="card-paper" style={{ padding: '24px' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-slate-600)', textTransform: 'uppercase' }}>
            Teaching Faculty
          </div>
          <div className="stat-number" style={{ fontSize: '36px', marginTop: '8px' }}>12</div>
          <div style={{ fontSize: '12px', color: 'var(--color-iron)', marginTop: '4px' }}>
            100% Doctoral / Masters
          </div>
        </div>

        <div className="card-paper" style={{ padding: '24px' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-slate-600)', textTransform: 'uppercase' }}>
            Active Circulars
          </div>
          <div className="stat-number" style={{ fontSize: '36px', marginTop: '8px' }}>{notices.length}</div>
          <div style={{ fontSize: '12px', color: 'var(--color-iron)', marginTop: '4px' }}>
            2 Pinned Urgent
          </div>
        </div>

        <div className="card-paper" style={{ padding: '24px' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-slate-600)', textTransform: 'uppercase' }}>
            Fee Collections
          </div>
          <div className="stat-number" style={{ fontSize: '36px', marginTop: '8px' }}>₹19.8L</div>
          <div style={{ fontSize: '12px', color: 'var(--color-success)', marginTop: '4px', fontWeight: 600 }}>
            94.3% Clearance Rate
          </div>
        </div>
      </div>

      {/* Grid: Publish Notice + Notice Management */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '32px' }}>
        {/* Publish Notice Form */}
        <div className="card-paper">
          <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-slate-900)', marginBottom: '8px' }}>
            Publish Official Circular
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--color-slate-600)', marginBottom: '20px' }}>
            Broadcast real-time announcements to the public site and portals.
          </p>

          <form onSubmit={handlePublish} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--color-slate-700)', textTransform: 'uppercase', marginBottom: '6px' }}>
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
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--color-slate-700)', textTransform: 'uppercase', marginBottom: '6px' }}>
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
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--color-slate-700)', textTransform: 'uppercase', marginBottom: '6px' }}>
                Description
              </label>
              <textarea
                value={newNoticeDesc}
                onChange={(e) => setNewNoticeDesc(e.target.value)}
                rows={3}
                className="input-field"
                style={{ height: 'auto', padding: '12px' }}
                placeholder="Provide full announcement details..."
              />
            </div>

            <button type="submit" className="btn-vermillion" style={{ alignSelf: 'flex-start' }}>
              <Plus size={16} /> {published ? 'Published to Platform!' : 'Publish Notice'}
            </button>
          </form>
        </div>

        {/* Notice Management List */}
        <div className="card-paper">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-slate-900)' }}>
              Active Announcements
            </h3>
            <span className="eyebrow-pill">{notices.length} TOTAL</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {notices.map((n) => (
              <div
                key={n.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '14px 16px',
                  backgroundColor: 'var(--color-vellum)',
                  border: '1px solid var(--color-frost)',
                  borderRadius: 'var(--radius-universal)'
                }}
              >
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--color-slate-900)' }}>
                    {n.title}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--color-slate-600)', marginTop: '2px' }}>
                    {n.category} • Posted: {n.date}
                  </div>
                </div>

                {n.pinned && (
                  <span style={{
                    fontSize: '10px',
                    fontWeight: 700,
                    padding: '2px 6px',
                    backgroundColor: 'var(--color-vermillion-signal)',
                    color: '#fff',
                    borderRadius: '4px'
                  }}>
                    PINNED
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
