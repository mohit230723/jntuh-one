import React from 'react';
import { Layers, CheckCircle2, BookOpen, Clock } from 'lucide-react';

export default function Academics() {
  const programs = [
    { title: 'B.Tech (Undergraduate)', duration: '4 Years', intake: '480 Total Seats', branches: 'CSE, ECE, EEE, ME, CE, Chemical, Metallurgy' },
    { title: 'M.Tech (Postgraduate)', duration: '2 Years', intake: '150 Seats', branches: 'Advanced Computing, VLSI Design, Power Electronics, Structural Eng' },
    { title: 'Doctoral Programs (Ph.D.)', duration: '3–5 Years', intake: 'Research Scholars', branches: 'All Engineering & Applied Science Disciplines' },
  ];

  return (
    <div className="section-gap">
      <div className="layout-container">
        <div style={{ marginBottom: '40px' }}>
          <div className="eyebrow-pill" style={{ marginBottom: '16px' }}>CURRICULAR FRAMEWORK</div>
          <h1 className="display-headline" style={{ fontSize: '48px', marginBottom: '16px' }}>
            Academic Programs & R22 Regulations
          </h1>
          <p className="body-lead" style={{ maxWidth: '780px' }}>
            Operating under autonomous governance, UCEST One provides curricula designed in alignment with National Education Policy (NEP 2020) and international Washington Accord standards.
          </p>
        </div>

        <div className="grid-3-col" style={{ marginBottom: '48px' }}>
          {programs.map((p, i) => (
            <div key={i} className="card-paper">
              <span className="eyebrow-pill" style={{ marginBottom: '12px' }}>{p.duration}</span>
              <h3 className="heading-sm" style={{ marginBottom: '8px' }}>{p.title}</h3>
              <div style={{ fontSize: '13px', color: 'var(--color-slate-600)', marginBottom: '16px' }}>
                Annual Capacity: <strong>{p.intake}</strong>
              </div>
              <p className="body-standard" style={{ fontSize: '14px' }}>
                {p.branches}
              </p>
            </div>
          ))}
        </div>

        <div className="card-paper" style={{ padding: '36px' }}>
          <h3 className="heading-sm" style={{ marginBottom: '16px' }}>Key Academic Regulations (R22 Autonomous)</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: '15px', color: 'var(--color-slate-900)' }}>Continuous Internal Evaluation (CIE)</div>
              <p style={{ fontSize: '13px', color: 'var(--color-slate-600)', marginTop: '4px' }}>
                40% Weightage comprising Mid-Term 1 (30M), Mid-Term 2 (30M), and Continuous Assignment Assessments.
              </p>
            </div>

            <div>
              <div style={{ fontWeight: 600, fontSize: '15px', color: 'var(--color-slate-900)' }}>Semester End Examinations (SEE)</div>
              <p style={{ fontSize: '13px', color: 'var(--color-slate-600)', marginTop: '4px' }}>
                60% Weightage evaluated by the Autonomous Examination Branch with external paper setter oversight.
              </p>
            </div>

            <div>
              <div style={{ fontWeight: 600, fontSize: '15px', color: 'var(--color-slate-900)' }}>Mandatory Attendance Rule</div>
              <p style={{ fontSize: '13px', color: 'var(--color-slate-600)', marginTop: '4px' }}>
                Minimum 75% aggregate attendance required. 65%–74% permissible under medical condonation. Under 65% results in detention.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
