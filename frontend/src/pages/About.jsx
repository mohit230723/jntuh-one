import React from 'react';
import { Award, BookOpen, Clock, ShieldCheck, CheckCircle2, Building, Compass, Landmark } from 'lucide-react';

export default function About() {
  const milestones = [
    { year: '1965', title: 'Foundation & Genesis', desc: 'Established as Nagarjuna Sagar Engineering College under the Government of Andhra Pradesh.' },
    { year: '1970', title: 'Kukatpally Campus Relocation', desc: 'Shifted to the sprawling 100-acre permanent green campus in Kukatpally, Hyderabad.' },
    { year: '1972', title: 'JNTU University Incorporation', desc: 'Became the premier constituent engineering college of Jawaharlal Nehru Technological University.' },
    { year: '1984', title: 'Computer Science Department Inception', desc: 'Established the Department of CSE, pioneering undergraduate computing in the region.' },
    { year: '2010', title: 'Conferment of Academic Autonomy', desc: 'UGC and state government grant full academic autonomy to innovate curricula and conduct independent evaluations.' },
    { year: '2024', title: 'Autonomous Tier-1 Eminence', desc: 'Ranked in the top NIRF engineering band with continuous NBA Tier-1 and NAAC A+ accreditation.' },
  ];

  const governance = [
    { name: 'Governing Body', role: 'Highest executive council steering statutory policy, fiscal management, and long-term academic expansion.' },
    { name: 'Academic Council', role: 'Autonomous body approving curricula, examination regulations, grading systems, and syllabi.' },
    { name: 'Boards of Studies', role: 'Department-specific councils of university professors and industry architects defining course outcomes.' },
    { name: 'Finance Committee', role: 'Oversees college funds, TEQIP grants, laboratory allocations, and scholarship endowments.' },
  ];

  return (
    <div className="section-gap">
      <div className="layout-container">
        {/* Header Breadcrumb */}
        <div style={{ marginBottom: '40px' }}>
          <div className="eyebrow-pill" style={{ marginBottom: '16px' }}>INSTITUTIONAL HERITAGE & VISION</div>
          <h1 className="display-headline" style={{ fontSize: '48px', marginBottom: '16px' }}>
            Sixty Years of Engineering Eminence.
          </h1>
          <p className="body-lead" style={{ maxWidth: '820px' }}>
            Established in 1965, JNTUH UCEST stands as Telangana's premier autonomous constituent engineering college, renowned for academic autonomy, foundational rigor, and global research impact.
          </p>
        </div>

        {/* Vision & Mission Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '48px' }}>
          <div className="card-paper" style={{ padding: '36px' }}>
            <ShieldCheck size={32} color="var(--color-vermillion-signal)" style={{ marginBottom: '16px' }} />
            <h3 className="heading-sm" style={{ marginBottom: '12px' }}>Institutional Vision</h3>
            <p className="body-standard" style={{ fontSize: '15px', lineHeight: '1.7' }}>
              To be recognized globally as a center of technical learning and cutting-edge research, nurturing ethical, socially conscious engineering leaders capable of solving complex societal challenges through technological innovation.
            </p>
          </div>

          <div className="card-paper" style={{ padding: '36px' }}>
            <BookOpen size={32} color="var(--color-slate-900)" style={{ marginBottom: '16px' }} />
            <h3 className="heading-sm" style={{ marginBottom: '12px' }}>Institutional Mission</h3>
            <p className="body-standard" style={{ fontSize: '15px', lineHeight: '1.7' }}>
              Deliver rigorous, outcome-based engineering curricula; cultivate interdisciplinary innovation; forge deep industrial and global university partnerships; and establish high-performance laboratory environments that accelerate discovery.
            </p>
          </div>
        </div>

        {/* Leadership & Accreditations */}
        <div className="card-paper" style={{ padding: '40px', marginBottom: '48px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '36px' }}>
            <div>
              <div className="eyebrow-pill" style={{ marginBottom: '12px' }}>PRINCIPAL & HEAD OF INSTITUTION</div>
              <h2 style={{ fontSize: '26px', fontWeight: 600, color: 'var(--color-slate-900)' }}>Dr. G. K. Viswanadh</h2>
              <div style={{ fontSize: '14px', color: 'var(--color-slate-600)', marginTop: '4px' }}>
                Professor of Civil Engineering & Principal • JNTUH UCEST
              </div>
              <p style={{ marginTop: '16px', fontSize: '14px', color: 'var(--color-slate-700)', lineHeight: '1.7' }}>
                "As an autonomous college, UCEST continues to pioneer academic autonomy, equipping our scholars with analytical mastery, research depth, and an unyielding commitment to technological leadership across the globe."
              </p>
              <div style={{ marginTop: '20px', display: 'flex', gap: '16px', fontSize: '13px', color: 'var(--color-slate-700)' }}>
                <span>Email: <strong>principal.engg@jntuh.ac.in</strong></span>
                <span>Phone: <strong>+91-40-23158661</strong></span>
              </div>
            </div>

            <div className="card-carbon" style={{ padding: '28px' }}>
              <div style={{ fontSize: '12px', color: 'var(--color-mist)', textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '0.3px' }}>
                ACCREDITATION RECORD & RATINGS
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px' }}>
                <div>• <strong>NBA Tier-1</strong>: All Undergraduate B.Tech Programs (Valid through 2027)</div>
                <div>• <strong>NAAC 'A+' Grade</strong>: Institutional Evaluation with 3.42 CGPA</div>
                <div>• <strong>Autonomy Status</strong>: Conferred by UGC continuously since 2010</div>
                <div>• <strong>NIRF Ranking</strong>: Consistently ranked in Top 100 Engineering Institutions in India</div>
                <div>• <strong>ISO 9001:2015</strong>: Certified Quality Management in Higher Technical Education</div>
              </div>
            </div>
          </div>
        </div>

        {/* Historical Milestones Timeline */}
        <div style={{ marginBottom: '48px' }}>
          <div className="eyebrow-pill" style={{ marginBottom: '8px' }}>CHRONOLOGICAL EVOLUTION</div>
          <h2 className="heading-lg" style={{ fontSize: '32px', marginBottom: '24px' }}>Milestones in Institutional History</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {milestones.map((m) => (
              <div key={m.year} className="card-paper" style={{ padding: '24px' }}>
                <span className="eyebrow-pill" style={{ backgroundColor: 'var(--color-vellum)', color: 'var(--color-vermillion-signal)', fontWeight: 700, marginBottom: '12px' }}>
                  {m.year}
                </span>
                <h4 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-slate-900)', marginBottom: '8px' }}>
                  {m.title}
                </h4>
                <p style={{ fontSize: '13px', color: 'var(--color-slate-600)', lineHeight: '1.6' }}>
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Statutory Governance Bodies */}
        <div>
          <div className="eyebrow-pill" style={{ marginBottom: '8px' }}>STATUTORY GOVERNANCE</div>
          <h2 className="heading-lg" style={{ fontSize: '32px', marginBottom: '24px' }}>Autonomous Governance Councils</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            {governance.map((g) => (
              <div key={g.name} className="card-paper" style={{ padding: '24px' }}>
                <h4 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-slate-900)', marginBottom: '8px' }}>
                  {g.name}
                </h4>
                <p style={{ fontSize: '13px', color: 'var(--color-slate-600)', lineHeight: '1.6' }}>
                  {g.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
