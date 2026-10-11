import React, { useState } from 'react';
import { ArrowDown, FileText, CheckCircle2 } from 'lucide-react';

export default function Examinations() {
  const [filter, setFilter] = useState('ALL');

  const notifications = [
    { title: 'B.Tech V Semester Regular & Supplementary Time Table — Nov 2026', cat: 'EXAM', date: '2026-10-10' },
    { title: 'Guidelines for Recounting and Re-evaluation of IV Semester Answer Scripts', cat: 'EXAM', date: '2026-10-06' },
    { title: 'M.Tech II Semester Autonomous End Examination Results Declared', cat: 'RESULTS', date: '2026-09-30' },
    { title: 'Schedule for Issue of Consolidated Marks Memos and Provisional Certificates', cat: 'GENERAL', date: '2026-09-22' },
  ];

  return (
    <div className="section-gap">
      <div className="layout-container">
        <div style={{ marginBottom: '40px' }}>
          <div className="eyebrow-pill" style={{ marginBottom: '16px' }}>EXAMINATION BRANCH</div>
          <h1 className="display-headline" style={{ fontSize: '48px', marginBottom: '16px' }}>
            Autonomous Examinations & Grading
          </h1>
          <p className="body-lead" style={{ maxWidth: '780px' }}>
            Governed by the autonomous controller of examinations with automated grading, digital marks memos, and continuous internal evaluations.
          </p>
        </div>

        {/* Grading Scale Table */}
        <div className="card-paper" style={{ padding: '32px', marginBottom: '48px' }}>
          <h3 className="heading-sm" style={{ marginBottom: '16px' }}>10-Point Absolute Letter Grading Scale</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--color-slate-900)' }}>
                  <th style={{ padding: '12px 16px' }}>Marks Percentage Range</th>
                  <th style={{ padding: '12px 16px' }}>Letter Grade</th>
                  <th style={{ padding: '12px 16px' }}>Grade Points</th>
                  <th style={{ padding: '12px 16px' }}>Performance Qualitative</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--color-frost)' }}>
                  <td style={{ padding: '12px 16px' }}>&gt;= 90%</td>
                  <td style={{ padding: '12px 16px', fontWeight: 600 }}>O</td>
                  <td style={{ padding: '12px 16px' }}>10</td>
                  <td style={{ padding: '12px 16px', color: 'var(--color-success)', fontWeight: 600 }}>Outstanding</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-frost)' }}>
                  <td style={{ padding: '12px 16px' }}>80% to 89%</td>
                  <td style={{ padding: '12px 16px', fontWeight: 600 }}>A+</td>
                  <td style={{ padding: '12px 16px' }}>9</td>
                  <td style={{ padding: '12px 16px' }}>Excellent</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-frost)' }}>
                  <td style={{ padding: '12px 16px' }}>70% to 79%</td>
                  <td style={{ padding: '12px 16px', fontWeight: 600 }}>A</td>
                  <td style={{ padding: '12px 16px' }}>8</td>
                  <td style={{ padding: '12px 16px' }}>Very Good</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-frost)' }}>
                  <td style={{ padding: '12px 16px' }}>60% to 69%</td>
                  <td style={{ padding: '12px 16px', fontWeight: 600 }}>B+</td>
                  <td style={{ padding: '12px 16px' }}>7</td>
                  <td style={{ padding: '12px 16px' }}>Good</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-frost)' }}>
                  <td style={{ padding: '12px 16px' }}>50% to 59%</td>
                  <td style={{ padding: '12px 16px', fontWeight: 600 }}>B</td>
                  <td style={{ padding: '12px 16px' }}>6</td>
                  <td style={{ padding: '12px 16px' }}>Above Average</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-frost)' }}>
                  <td style={{ padding: '12px 16px' }}>40% to 49%</td>
                  <td style={{ padding: '12px 16px', fontWeight: 600 }}>C</td>
                  <td style={{ padding: '12px 16px' }}>5</td>
                  <td style={{ padding: '12px 16px' }}>Pass</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px 16px' }}>&lt; 40%</td>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--color-danger)' }}>F</td>
                  <td style={{ padding: '12px 16px' }}>0</td>
                  <td style={{ padding: '12px 16px', color: 'var(--color-danger)' }}>Fail</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Circulars List */}
        <div>
          <h3 className="heading-sm" style={{ marginBottom: '20px' }}>Examination Circulars Archive</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {notifications.map((n, idx) => (
              <div 
                key={idx}
                className="card-paper"
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '16px 24px'
                }}
              >
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 500, color: 'var(--color-slate-900)' }}>
                    {n.title}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--color-slate-600)', marginTop: '2px' }}>
                    Category: {n.cat} • Released on {n.date}
                  </div>
                </div>

                <button className="btn-ghost" style={{ padding: '6px 12px', fontSize: '12px' }}>
                  Download PDF
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
