import React from 'react';
import { Award, BookOpen, Clock, ShieldCheck } from 'lucide-react';

export default function About() {
  return (
    <div className="section-gap">
      <div className="layout-container">
        <div style={{ marginBottom: '40px' }}>
          <div className="eyebrow-pill" style={{ marginBottom: '16px' }}>INSTITUTIONAL HERITAGE</div>
          <h1 className="display-headline" style={{ fontSize: '48px', marginBottom: '16px' }}>
            Sixty Years of Engineering Eminence.
          </h1>
          <p className="body-lead" style={{ maxWidth: '780px' }}>
            Established in 1965 as Nagarjuna Sagar Engineering College and transitioned to the Hyderabad campus in 1970, JNTUH UCEST stands as Telangana's premier autonomous technical institution.
          </p>
        </div>

        {/* Vision & Mission Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '48px' }}>
          <div className="card-paper">
            <ShieldCheck size={28} color="var(--color-vermillion-signal)" style={{ marginBottom: '16px' }} />
            <h3 className="heading-sm" style={{ marginBottom: '12px' }}>Institutional Vision</h3>
            <p className="body-standard">
              To be recognized globally as a center of technical learning and cutting-edge research, nurturing ethical, socially conscious engineering leaders capable of solving complex societal challenges.
            </p>
          </div>

          <div className="card-paper">
            <BookOpen size={28} color="var(--color-slate-900)" style={{ marginBottom: '16px' }} />
            <h3 className="heading-sm" style={{ marginBottom: '12px' }}>Institutional Mission</h3>
            <p className="body-standard">
              Deliver rigorous, outcome-based curricula, cultivate interdisciplinary innovation, forge deep industrial partnerships, and establish high-performance laboratory environments.
            </p>
          </div>
        </div>

        {/* Leadership & Accreditations */}
        <div className="card-paper" style={{ padding: '40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
            <div>
              <div className="eyebrow-pill" style={{ marginBottom: '12px' }}>PRINCIPAL & HEAD OF INSTITUTION</div>
              <h2 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--color-slate-900)' }}>Dr. G. K. Viswanadh</h2>
              <div style={{ fontSize: '14px', color: 'var(--color-slate-600)', marginTop: '4px' }}>
                Professor of Civil Engineering & Principal
              </div>
              <p style={{ marginTop: '16px', fontSize: '14px', color: 'var(--color-slate-700)', lineHeight: '1.6' }}>
                "UCEST continues to pioneer academic autonomy, equipping our scholars with analytical mastery and an unyielding commitment to technological leadership."
              </p>
            </div>

            <div className="card-carbon" style={{ padding: '24px' }}>
              <div style={{ fontSize: '12px', color: 'var(--color-mist)', textTransform: 'uppercase', marginBottom: '12px' }}>
                ACCREDITATION RECORD
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
                <div>• <strong>NBA Tier-1</strong>: All Undergraduate B.Tech Programs</div>
                <div>• <strong>NAAC 'A+' Grade</strong>: Institutional Accreditation</div>
                <div>• <strong>Autonomy Status</strong>: Conferred by UGC since 2010</div>
                <div>• <strong>NIRF Ranking</strong>: Consistently ranked in Top 100 Engineering Institutions</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
