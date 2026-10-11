import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, FileText, Download } from 'lucide-react';

export default function Admissions() {
  const intakeRoster = [
    { code: 'CSE', name: 'Computer Science and Engineering', intake: 60, lateral: 6, codeConv: 'JNTH-CSE' },
    { code: 'ECE', name: 'Electronics and Communication Engineering', intake: 60, lateral: 6, codeConv: 'JNTH-ECE' },
    { code: 'EEE', name: 'Electrical and Electronics Engineering', intake: 60, lateral: 6, codeConv: 'JNTH-EEE' },
    { code: 'ME', name: 'Mechanical Engineering', intake: 60, lateral: 6, codeConv: 'JNTH-MEC' },
    { code: 'CE', name: 'Civil Engineering', intake: 60, lateral: 6, codeConv: 'JNTH-CIV' },
    { code: 'CHE', name: 'Chemical Engineering', intake: 60, lateral: 6, codeConv: 'JNTH-CHE' },
    { code: 'MTE', name: 'Metallurgical Engineering', intake: 60, lateral: 6, codeConv: 'JNTH-MET' },
  ];

  return (
    <div className="section-gap">
      <div className="layout-container">
        {/* Header Breadcrumb */}
        <div style={{ marginBottom: '40px' }}>
          <div className="eyebrow-pill" style={{ marginBottom: '16px' }}>ENROLLMENT PATHWAYS & ELIGIBILITY</div>
          <h1 className="display-headline" style={{ fontSize: '48px', marginBottom: '16px' }}>
            Admissions & Criteria
          </h1>
          <p className="body-lead" style={{ maxWidth: '820px' }}>
            Admission to undergraduate and postgraduate programs is conducted through rigorous state and national entrance merit counseling administered by TGCHE and AICTE.
          </p>
        </div>

        {/* 3 Pathway Cards */}
        <div className="grid-3-col" style={{ marginBottom: '48px' }}>
          <div className="card-paper" style={{ padding: '32px' }}>
            <span className="eyebrow-pill" style={{ marginBottom: '12px' }}>CONVENOR QUOTA</span>
            <h3 className="heading-sm" style={{ marginBottom: '8px' }}>B.Tech 1st Year (TG-EAPCET)</h3>
            <p className="body-standard" style={{ fontSize: '14px', marginBottom: '16px', lineHeight: '1.6' }}>
              Candidates must qualify in TG-EAPCET conducted by the Telangana State Council of Higher Education (TGCHE) with 10+2 Mathematics, Physics & Chemistry.
            </p>
            <div style={{ fontSize: '13px', color: 'var(--color-slate-600)', lineHeight: '1.7' }}>
              • CSE General Closing Rank: ~850<br />
              • ECE General Closing Rank: ~2,400<br />
              • Counseling College Code: <strong>JNTH</strong>
            </div>
          </div>

          <div className="card-paper" style={{ padding: '32px' }}>
            <span className="eyebrow-pill" style={{ marginBottom: '12px' }}>LATERAL ENTRY</span>
            <h3 className="heading-sm" style={{ marginBottom: '8px' }}>B.Tech 2nd Year (TG-ECET)</h3>
            <p className="body-standard" style={{ fontSize: '14px', marginBottom: '16px', lineHeight: '1.6' }}>
              State diploma engineers and B.Sc. mathematics graduates qualify for 10% supernumerary seats admitted directly into 3rd semester.
            </p>
            <div style={{ fontSize: '13px', color: 'var(--color-slate-600)', lineHeight: '1.7' }}>
              • Central Counseling via TG-ECET<br />
              • Sanctioned Quota: 6 Seats per discipline<br />
              • Eligibility: Min 45% in State Diploma
            </div>
          </div>

          <div className="card-paper" style={{ padding: '32px' }}>
            <span className="eyebrow-pill" style={{ marginBottom: '12px' }}>POSTGRADUATE & RESEARCH</span>
            <h3 className="heading-sm" style={{ marginBottom: '8px' }}>M.Tech & Ph.D. (GATE / PGECET)</h3>
            <p className="body-standard" style={{ fontSize: '14px', marginBottom: '16px', lineHeight: '1.6' }}>
              Admission to M.Tech prioritizes GATE qualified candidates with AICTE monthly scholarship. Remaining seats filled via TG-PGECET.
            </p>
            <div style={{ fontSize: '13px', color: 'var(--color-slate-600)', lineHeight: '1.7' }}>
              • 150 Total M.Tech Seats across 8 specializations<br />
              • Ph.D. selection through JNTUH Research Common Entrance Test (RCET) & Interview
            </div>
          </div>
        </div>

        {/* Intake Matrix Table */}
        <div className="card-paper" style={{ padding: '36px', marginBottom: '48px' }}>
          <h3 className="heading-sm" style={{ marginBottom: '16px' }}>Sanctioned B.Tech Intake Matrix (Session 2026–2027)</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--color-slate-900)' }}>
                  <th style={{ padding: '12px' }}>Discipline Code</th>
                  <th style={{ padding: '12px' }}>Degree Program Name</th>
                  <th style={{ padding: '12px' }}>Convenor Code</th>
                  <th style={{ padding: '12px' }}>Regular Seats (1st Year)</th>
                  <th style={{ padding: '12px' }}>Lateral Seats (2nd Year)</th>
                </tr>
              </thead>
              <tbody>
                {intakeRoster.map((r) => (
                  <tr key={r.code} style={{ borderBottom: '1px solid var(--color-frost)' }}>
                    <td style={{ padding: '12px', fontWeight: 600 }}>{r.code}</td>
                    <td style={{ padding: '12px' }}>{r.name}</td>
                    <td style={{ padding: '12px', fontWeight: 600 }}>{r.codeConv}</td>
                    <td style={{ padding: '12px', fontWeight: 600 }}>{r.intake}</td>
                    <td style={{ padding: '12px' }}>{r.lateral}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Fee Structure */}
        <div className="card-paper" style={{ padding: '36px' }}>
          <h3 className="heading-sm" style={{ marginBottom: '20px' }}>Prescribed Institutional Fee Schedule</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', fontSize: '14px' }}>
            <div style={{ padding: '20px', backgroundColor: 'var(--color-vellum)', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ fontWeight: 600, color: 'var(--color-slate-900)' }}>Tuition Fee (Regular Convenor)</div>
              <div style={{ fontSize: '26px', fontWeight: 300, color: 'var(--color-slate-900)', marginTop: '4px' }}>₹35,000 / Year</div>
              <div style={{ fontSize: '12px', color: 'var(--color-iron)', marginTop: '4px' }}>Government subsidized merit fee</div>
            </div>
            <div style={{ padding: '20px', backgroundColor: 'var(--color-vellum)', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ fontWeight: 600, color: 'var(--color-slate-900)' }}>Examination & Evaluation Fee</div>
              <div style={{ fontSize: '26px', fontWeight: 300, color: 'var(--color-slate-900)', marginTop: '4px' }}>₹2,500 / Sem</div>
              <div style={{ fontSize: '12px', color: 'var(--color-iron)', marginTop: '4px' }}>Autonomous exam branch operations</div>
            </div>
            <div style={{ padding: '20px', backgroundColor: 'var(--color-vellum)', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ fontWeight: 600, color: 'var(--color-slate-900)' }}>Special Laboratory & Library Fee</div>
              <div style={{ fontSize: '26px', fontWeight: 300, color: 'var(--color-slate-900)', marginTop: '4px' }}>₹5,500 / Year</div>
              <div style={{ fontSize: '12px', color: 'var(--color-iron)', marginTop: '4px' }}>Computing facilities & digital journals</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
