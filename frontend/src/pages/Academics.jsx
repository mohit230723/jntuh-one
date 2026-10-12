import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, CheckCircle2, BookOpen, Clock, Calendar, ArrowRight, Download } from 'lucide-react';

export default function Academics() {
  const programs = [
    { title: 'B.Tech (Undergraduate)', duration: '4 Years', intake: '480 Seats', branches: 'CSE, ECE, EEE, ME, CE, Chemical, Metallurgy', credits: '160 Credits' },
    { title: 'M.Tech (Postgraduate)', duration: '2 Years', intake: '150 Seats', branches: 'Computer Science, VLSI System Design, Power Electronics, Structural Engineering', credits: '68 Credits' },
    { title: 'Doctoral Programs (Ph.D.)', duration: '3–5 Years', intake: 'Research Fellows', branches: 'All 12 Disciplines in Engineering, Basic Sciences, and Humanities', credits: 'Doctoral Thesis' },
  ];

  const calendarEvents = [
    { sem: 'Odd Semester (V Sem)', period: 'July 15 – Nov 28, 2026', milestones: 'Instruction: July 15 • Mid-1: Sept 14–19 • Mid-2: Nov 16–21 • Practical Exams: Nov 23–28 • End Theory Exams: Dec 01–15' },
    { sem: 'Even Semester (VI Sem)', period: 'Dec 22, 2026 – April 30, 2027', milestones: 'Instruction: Dec 22 • Mid-1: Feb 15–20 • Mid-2: April 12–17 • Practical Exams: April 19–24 • End Theory Exams: April 27–May 12' },
  ];

  return (
    <div className="section-gap">
      <div className="layout-container">
        {/* Header Breadcrumb */}
        <div style={{ marginBottom: '40px' }}>
          <div className="eyebrow-pill" style={{ marginBottom: '16px' }}>CURRICULAR FRAMEWORK & REGULATIONS</div>
          <h1 className="display-headline" style={{ fontSize: '48px', marginBottom: '16px' }}>
            Academic Programs & R22 Regulations
          </h1>
          <p className="body-lead" style={{ maxWidth: '820px' }}>
            Operating under UGC academic autonomy, UCEST provides outcome-based engineering curricula aligned with National Education Policy (NEP 2020) and international Washington Accord standards.
          </p>
        </div>

        {/* Degree Programs Grid */}
        <div className="grid-3-col" style={{ marginBottom: '48px' }}>
          {programs.map((p, i) => (
            <div key={i} className="card-paper" style={{ padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span className="eyebrow-pill">{p.duration}</span>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-vermillion-signal)' }}>{p.credits}</span>
                </div>
                <h3 className="heading-sm" style={{ marginBottom: '8px' }}>{p.title}</h3>
                <div style={{ fontSize: '13px', color: 'var(--color-slate-600)', marginBottom: '16px' }}>
                  Annual Capacity: <strong>{p.intake}</strong>
                </div>
                <p className="body-standard" style={{ fontSize: '14px', lineHeight: '1.6' }}>
                  {p.branches}
                </p>
              </div>

              <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--color-frost)' }}>
                <span style={{ fontSize: '12px', color: 'var(--color-iron)' }}>Outcome-Based Education (OBE) Accredited</span>
              </div>
            </div>
          ))}
        </div>

        {/* Autonomous Academic Calendar */}
        <div className="card-paper" style={{ padding: '36px', marginBottom: '48px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <div className="eyebrow-pill" style={{ marginBottom: '8px' }}>ACADEMIC SCHEDULE</div>
              <h3 className="heading-sm">Master Academic Calendar (2026–2027)</h3>
            </div>
            <button
              onClick={() => alert('Academic Calendar 2026-2027 PDF download initiated.')}
              className="btn-carbon"
              style={{ padding: '8px 16px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Download size={14} /> Download Calendar PDF
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
            {calendarEvents.map((c, idx) => (
              <div key={idx} style={{ padding: '24px', backgroundColor: 'var(--color-vellum)', borderRadius: 'var(--radius-lg)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-slate-900)' }}>{c.sem}</h4>
                  <span className="eyebrow-pill" style={{ backgroundColor: '#fff', fontSize: '11px' }}>{c.period}</span>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--color-slate-700)', lineHeight: '1.7', margin: 0 }}>
                  {c.milestones}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Key Autonomous Regulations */}
        <div className="card-paper" style={{ padding: '36px' }}>
          <h3 className="heading-sm" style={{ marginBottom: '20px' }}>Key Autonomous Regulations (R22 Framework)</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: '15px', color: 'var(--color-slate-900)' }}>Continuous Internal Evaluation (CIE)</div>
              <p style={{ fontSize: '13px', color: 'var(--color-slate-600)', marginTop: '4px', lineHeight: '1.6' }}>
                40% Weightage comprising Mid-Term 1 (30M), Mid-Term 2 (30M), and Continuous Assignment / Quiz assessments throughout the semester.
              </p>
            </div>

            <div>
              <div style={{ fontWeight: 600, fontSize: '15px', color: 'var(--color-slate-900)' }}>Semester End Examinations (SEE)</div>
              <p style={{ fontSize: '13px', color: 'var(--color-slate-600)', marginTop: '4px', lineHeight: '1.6' }}>
                60% Weightage evaluated by the Autonomous Controller of Examinations with double-blind evaluation and external paper setter oversight.
              </p>
            </div>

            <div>
              <div style={{ fontWeight: 600, fontSize: '15px', color: 'var(--color-slate-900)' }}>Mandatory Attendance Rule</div>
              <p style={{ fontSize: '13px', color: 'var(--color-slate-600)', marginTop: '4px', lineHeight: '1.6' }}>
                Minimum 75% aggregate attendance is mandatory. 65%–74% permissible strictly under medical condonation approved by Principal. Under 65% results in detention.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
