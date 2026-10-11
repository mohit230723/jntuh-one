import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Admissions() {
  return (
    <div className="section-gap">
      <div className="layout-container">
        <div style={{ marginBottom: '40px' }}>
          <div className="eyebrow-pill" style={{ marginBottom: '16px' }}>ENROLLMENT PATHWAYS</div>
          <h1 className="display-headline" style={{ fontSize: '48px', marginBottom: '16px' }}>
            Admissions & Criteria
          </h1>
          <p className="body-lead" style={{ maxWidth: '780px' }}>
            Admission to undergraduate and postgraduate programs is conducted strictly based on state and national merit entrance rankings.
          </p>
        </div>

        <div className="grid-3-col" style={{ marginBottom: '48px' }}>
          <div className="card-paper">
            <span className="eyebrow-pill" style={{ marginBottom: '12px' }}>CONVENOR QUOTA</span>
            <h3 className="heading-sm" style={{ marginBottom: '8px' }}>B.Tech 1st Year (TG-EAPCET)</h3>
            <p className="body-standard" style={{ fontSize: '14px', marginBottom: '16px' }}>
              Candidates must qualify in TG-EAPCET conducted by the Telangana State Council of Higher Education (TSCHE).
            </p>
            <div style={{ fontSize: '13px', color: 'var(--color-slate-600)' }}>
              • CSE Closing Rank: ~850 (OC Boys)<br />
              • ECE Closing Rank: ~2,400<br />
              • Eligibility: 10+2 with Physics, Chem, Math
            </div>
          </div>

          <div className="card-paper">
            <span className="eyebrow-pill" style={{ marginBottom: '12px' }}>LATERAL ENTRY</span>
            <h3 className="heading-sm" style={{ marginBottom: '8px' }}>B.Tech 2nd Year (TG-ECET)</h3>
            <p className="body-standard" style={{ fontSize: '14px', marginBottom: '16px' }}>
              Diploma and B.Sc. mathematics graduates qualify for 10% supernumerary seats in the second year.
            </p>
            <div style={{ fontSize: '13px', color: 'var(--color-slate-600)' }}>
              • Counseling via TG-ECET<br />
              • CSE Lateral Quota: 6 Seats
            </div>
          </div>

          <div className="card-paper">
            <span className="eyebrow-pill" style={{ marginBottom: '12px' }}>POSTGRADUATE</span>
            <h3 className="heading-sm" style={{ marginBottom: '8px' }}>M.Tech (GATE / TG-PGECET)</h3>
            <p className="body-standard" style={{ fontSize: '14px', marginBottom: '16px' }}>
              First preference given to GATE qualified candidates with AICTE monthly stipend support.
            </p>
            <div style={{ fontSize: '13px', color: 'var(--color-slate-600)' }}>
              • Remaining seats via TG-PGECET<br />
              • Full-time regular programs
            </div>
          </div>
        </div>

        {/* Fee Structure */}
        <div className="card-paper" style={{ padding: '36px' }}>
          <h3 className="heading-sm" style={{ marginBottom: '16px' }}>Annual Institutional Fee Structure</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', fontSize: '14px' }}>
            <div>
              <div style={{ fontWeight: 600, color: 'var(--color-slate-900)' }}>Tuition Fee (Regular)</div>
              <div style={{ fontSize: '20px', fontWeight: 300, color: 'var(--color-slate-900)', marginTop: '4px' }}>₹35,000 / Year</div>
              <div style={{ fontSize: '12px', color: 'var(--color-iron)' }}>Govt. subsidized merit fee</div>
            </div>
            <div>
              <div style={{ fontWeight: 600, color: 'var(--color-slate-900)' }}>Examination Fee</div>
              <div style={{ fontSize: '20px', fontWeight: 300, color: 'var(--color-slate-900)', marginTop: '4px' }}>₹2,500 / Sem</div>
              <div style={{ fontSize: '12px', color: 'var(--color-iron)' }}>Autonomous exam branch</div>
            </div>
            <div>
              <div style={{ fontWeight: 600, color: 'var(--color-slate-900)' }}>Library & Lab Caution</div>
              <div style={{ fontSize: '20px', fontWeight: 300, color: 'var(--color-slate-900)', marginTop: '4px' }}>₹3,000 (One-time)</div>
              <div style={{ fontSize: '12px', color: 'var(--color-iron)' }}>Refundable upon completion</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
