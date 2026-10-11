import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Cpu, 
  Layers, 
  ShieldCheck, 
  FileText, 
  Award, 
  GraduationCap, 
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import api from '../services/api';

export default function Home() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Attempt fetching notices, with graceful fallback to seed notices
    api.get('/public/notices')
      .then((res) => {
        setNotices(res.data?.content || []);
      })
      .catch(() => {
        // Mock fallback if backend is not yet started
        setNotices([
          { id: 1, title: 'Semester End Examination Schedule Notification', category: 'EXAM', postedDate: '2026-10-10', pinned: true },
          { id: 2, title: 'Condonation of Attendance Notification (65% - 75%)', category: 'ACADEMIC', postedDate: '2026-10-08', pinned: true },
          { id: 3, title: 'Campus Placement Drive — Oracle & Salesforce', category: 'GENERAL', postedDate: '2026-10-05', pinned: false },
        ]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* HERO SECTION — Split Layout on #f5f5f5 Canvas */}
      <section style={{ paddingTop: '56px', paddingBottom: '64px' }}>
        <div className="layout-container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
            gap: '48px',
            alignItems: 'center'
          }}>
            {/* Left Column: 72px Headline + Vermillion Action */}
            <div>
              <div className="eyebrow-pill" style={{ marginBottom: '24px' }}>
                JNTUH UCEST HYDERABAD • EST. 1965
              </div>
              <h1 className="display-headline" style={{ marginBottom: '24px' }}>
                Empowering Innovators, Engineering the Future.
              </h1>
              <p className="body-lead" style={{ marginBottom: '32px', maxWidth: '480px' }}>
                Telangana's premier autonomous constituent college. Delivering rigorous engineering curricula, 45+ specialized R&D labs, and high-velocity career placements.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                <Link to="/academics" className="btn-vermillion">
                  Explore Academics <ArrowRight size={16} />
                </Link>
                <Link to="/login" className="btn-carbon">
                  Sign In to Portal
                </Link>
              </div>
            </div>

            {/* Right Column: Hero Product Visual Tile */}
            <div className="card-paper" style={{ padding: '24px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: '16px',
                borderBottom: '1px solid var(--color-frost)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--color-vermillion-signal)' }} />
                  <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-slate-900)' }}>CENTRAL ACADEMIC DISPATCH</span>
                </div>
                <span className="eyebrow-pill">AUTONOMOUS R22</span>
              </div>

              {/* Inverted Carbon Panel */}
              <div className="card-carbon" style={{ marginTop: '16px', padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{ fontSize: '12px', color: 'var(--color-mist)', textTransform: 'uppercase', letterSpacing: '0.3px' }}>
                    FEATURED COHORT
                  </div>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    backgroundColor: 'var(--color-vermillion-signal)',
                    color: '#fff',
                    padding: '2px 8px',
                    borderRadius: '4px'
                  }}>LIVE</span>
                </div>
                <div style={{ fontSize: '20px', fontWeight: 400, color: '#ffffff', marginBottom: '8px' }}>
                  B.Tech Computer Science & Engineering
                </div>
                <div style={{ fontSize: '13px', color: 'var(--color-cloud)', lineHeight: '1.6' }}>
                  Batch 2023–2027 • Semester V Core • 60 Enrolled Scholars
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #333' }}>
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--color-mist)', textTransform: 'uppercase' }}>Highest Package</div>
                    <div style={{ fontSize: '24px', fontWeight: 300, color: '#ffffff' }}>44.0 LPA</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--color-mist)', textTransform: 'uppercase' }}>Accreditation</div>
                    <div style={{ fontSize: '24px', fontWeight: 300, color: '#ffffff' }}>NBA Tier-1</div>
                  </div>
                </div>
              </div>

              {/* Quick Status Bar */}
              <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: 'var(--color-slate-600)' }}>
                <span>Autonomous Exam Cell • Status: Open</span>
                <Link to="/examinations" style={{ color: 'var(--color-slate-900)', fontWeight: 600 }}>
                  View Notifications →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FULL-BLEED LOGO STRIP / TRUST BAR */}
      <section style={{
        backgroundColor: 'var(--color-paper)',
        borderTop: '1px solid var(--color-frost)',
        borderBottom: '1px solid var(--color-frost)',
        padding: '36px 0'
      }}>
        <div className="layout-container">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '32px'
          }}>
            <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-slate-700)', textTransform: 'uppercase', letterSpacing: '0.3px' }}>
              RECOGNITIONS & ACCREDITATION:
            </div>
            <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', alignItems: 'center' }}>
              <span className="eyebrow-pill">NBA TIER-1 ACCREDITED</span>
              <span className="eyebrow-pill">NAAC 'A+' GRADE</span>
              <span className="eyebrow-pill">UGC 12(B) RECOGNIZED</span>
              <span className="eyebrow-pill">NIRF TELANGANA TOP RANK</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3-COLUMN FEATURE GRID */}
      <section className="section-gap">
        <div className="layout-container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div className="eyebrow-pill" style={{ marginBottom: '16px' }}>ACADEMIC EXCELLENCE</div>
            <h2 className="heading-lg" style={{ marginBottom: '16px' }}>
              Built for Technical Command.
            </h2>
            <p className="body-lead" style={{ maxWidth: '640px', margin: '0 auto' }}>
              Every program and facility is optimized to train foundational engineering minds capable of leading complex global technology architectures.
            </p>
          </div>

          <div className="grid-3-col">
            {/* Feature 1 */}
            <div className="card-paper">
              <Cpu size={24} color="var(--color-slate-600)" style={{ marginBottom: '16px' }} />
              <h3 className="heading-sm" style={{ marginBottom: '12px' }}>
                Featured Department: CSE
              </h3>
              <p className="body-standard" style={{ marginBottom: '24px' }}>
                Home to cutting-edge AI, Cloud Virtualization, and High-Performance Systems labs. Taught by 12 doctoral faculty members.
              </p>
              <Link to="/departments/cse" style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-slate-900)' }}>
                Explore CSE Department →
              </Link>
            </div>

            {/* Feature 2 */}
            <div className="card-paper">
              <Layers size={24} color="var(--color-slate-600)" style={{ marginBottom: '16px' }} />
              <h3 className="heading-sm" style={{ marginBottom: '12px' }}>
                Autonomous R22 Curriculum
              </h3>
              <p className="body-standard" style={{ marginBottom: '24px' }}>
                NEP 2020-aligned Choice-Based Credit System (CBCS) offering multidisciplinary electives, minor degrees, and industry internships.
              </p>
              <Link to="/academics" style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-slate-900)' }}>
                View Regulations →
              </Link>
            </div>

            {/* Feature 3 */}
            <div className="card-paper">
              <Award size={24} color="var(--color-slate-600)" style={{ marginBottom: '16px' }} />
              <h3 className="heading-sm" style={{ marginBottom: '12px' }}>
                Integrated Portals
              </h3>
              <p className="body-standard" style={{ marginBottom: '24px' }}>
                Real-time tracking of attendance percentages, semester marks memos, class timetables, and fee payment receipts in one unified portal.
              </p>
              <Link to="/login" style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-slate-900)' }}>
                Access Portal Login →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* NOTICES TICKER SECTION */}
      <section style={{ backgroundColor: 'var(--color-paper)', borderTop: '1px solid var(--color-frost)', borderBottom: '1px solid var(--color-frost)', padding: '64px 0' }}>
        <div className="layout-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
            <div>
              <div className="eyebrow-pill" style={{ marginBottom: '8px' }}>INSTITUTIONAL DISPATCH</div>
              <h2 className="heading-lg">Latest Official Circulars</h2>
            </div>
            <Link to="/examinations" className="btn-ghost" style={{ fontSize: '13px' }}>
              All Notices Archive →
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {notices.map((notice) => (
              <div 
                key={notice.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '20px 24px',
                  backgroundColor: 'var(--color-vellum)',
                  border: '1px solid var(--color-frost)',
                  borderRadius: 'var(--radius-universal)',
                  gap: '16px',
                  flexWrap: 'wrap'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.3px',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    backgroundColor: notice.category === 'EXAM' ? 'var(--color-slate-900)' : 'var(--color-carbon)',
                    color: '#fff'
                  }}>
                    {notice.category}
                  </span>
                  <div>
                    <div style={{ fontWeight: 500, fontSize: '15px', color: 'var(--color-slate-900)' }}>
                      {notice.title}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--color-iron)', marginTop: '2px' }}>
                      Issued: {notice.postedDate}
                    </div>
                  </div>
                </div>

                <Link to="/examinations" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-vermillion-signal)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  Read Notice <ChevronRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STAT BLOCK ROW */}
      <section className="section-gap">
        <div className="layout-container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '32px'
          }}>
            <div className="stat-block">
              <div className="stat-number">1965</div>
              <div className="stat-label">Year of Establishment</div>
            </div>
            <div className="stat-block">
              <div className="stat-number">12</div>
              <div className="stat-label">Engineering & Science Depts</div>
            </div>
            <div className="stat-block">
              <div className="stat-number">44 LPA</div>
              <div className="stat-label">Highest Campus Placement</div>
            </div>
            <div className="stat-block">
              <div className="stat-number">92%</div>
              <div className="stat-label">CSE Career Placement Rate</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
