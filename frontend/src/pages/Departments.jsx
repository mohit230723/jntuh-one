import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Cpu, Layers, ShieldCheck } from 'lucide-react';

export default function Departments() {
  const depts = [
    { code: 'CSE', name: 'Computer Science and Engineering', est: 1984, hod: 'Dr. A. Kavitha', intake: 60, featured: true },
    { code: 'ECE', name: 'Electronics and Communication Engineering', est: 1972, hod: 'Dr. T. Satya Savithri', intake: 60 },
    { code: 'EEE', name: 'Electrical and Electronics Engineering', est: 1965, hod: 'Dr. M. Sushama', intake: 60 },
    { code: 'ME', name: 'Mechanical Engineering', est: 1965, hod: 'Dr. A. Chennakesava Reddy', intake: 60 },
    { code: 'CE', name: 'Civil Engineering', est: 1965, hod: 'Dr. K. Manjula Vani', intake: 60 },
    { code: 'CHE', name: 'Chemical Engineering', est: 1989, hod: 'Dr. S. Sharada', intake: 60 },
    { code: 'MTE', name: 'Metallurgical Engineering', est: 1978, hod: 'Dr. B. Ramesh Chandra', intake: 60 },
    { code: 'MATH', name: 'Department of Mathematics', est: 1965, hod: 'Dr. M. A. Srinivas', intake: 0 },
    { code: 'PHY', name: 'Department of Physics', est: 1965, hod: 'Dr. S. Venkateswara Rao', intake: 0 },
    { code: 'CHEM', name: 'Department of Chemistry', est: 1965, hod: 'Dr. B. Rama Devi', intake: 0 },
    { code: 'HSS', name: 'Humanities and Social Sciences', est: 1965, hod: 'Dr. N. V. S. N. Sarma', intake: 0 },
    { code: 'PED', name: 'Physical Education & Sports', est: 1965, hod: 'Dr. G. Shyam Kumar', intake: 0 },
  ];

  return (
    <div className="section-gap">
      <div className="layout-container">
        <div style={{ marginBottom: '40px' }}>
          <div className="eyebrow-pill" style={{ marginBottom: '16px' }}>ACADEMIC DIVISIONS</div>
          <h1 className="display-headline" style={{ fontSize: '48px', marginBottom: '16px' }}>
            Academic Departments Directory
          </h1>
          <p className="body-lead" style={{ maxWidth: '780px' }}>
            Twelve foundational engineering, science, and humanities departments driving teaching, innovation, and industry research.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
          {depts.map((d) => (
            <div 
              key={d.code}
              className="card-paper"
              style={{
                borderTop: d.featured ? '3px solid var(--color-vermillion-signal)' : '1px solid var(--color-frost)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span className="eyebrow-pill">{d.code}</span>
                  {d.featured && (
                    <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-vermillion-signal)', letterSpacing: '0.3px' }}>
                      FEATURED
                    </span>
                  )}
                </div>

                <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-slate-900)', marginBottom: '8px' }}>
                  {d.name}
                </h3>
                <div style={{ fontSize: '13px', color: 'var(--color-slate-600)', lineHeight: '1.6' }}>
                  • Established: {d.est}<br />
                  • Head of Dept: {d.hod}<br />
                  {d.intake > 0 && <span>• B.Tech Annual Intake: {d.intake}</span>}
                </div>
              </div>

              <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--color-frost)' }}>
                {d.featured ? (
                  <Link to="/departments/cse" className="btn-vermillion" style={{ width: '100%', padding: '10px 16px', fontSize: '12px' }}>
                    View Complete Profile <ArrowRight size={14} />
                  </Link>
                ) : (
                  <span style={{ fontSize: '12px', color: 'var(--color-iron)' }}>Standard Department Profile</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
