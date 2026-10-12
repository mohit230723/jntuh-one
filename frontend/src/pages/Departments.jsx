import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { departmentService } from '../services/departmentService';

export default function Departments() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDepts() {
      setLoading(true);
      try {
        const data = await departmentService.getDepartments();
        setDepartments(data);
      } catch (err) {
        console.error('Failed to load departments', err);
      } finally {
        setLoading(false);
      }
    }
    loadDepts();
  }, []);

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

        {loading ? (
          <div className="card-paper" style={{ padding: '32px', textAlign: 'center', color: 'var(--color-slate-600)' }}>
            Loading department roster...
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
            {departments.map((d) => (
              <div 
                key={d.code}
                className="card-paper"
                style={{
                  borderTop: d.featured ? '3px solid var(--color-vermillion-signal)' : '1px solid var(--color-frost)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '24px'
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
                    • Established: {d.establishedYear || d.est}<br />
                    • Head of Dept: {d.hodName || d.hod}<br />
                    {(d.intake > 0) && <span>• B.Tech Annual Intake: {d.intake}</span>}
                  </div>
                  {d.description && (
                    <p style={{ fontSize: '13px', color: 'var(--color-slate-600)', marginTop: '8px', lineHeight: '1.5' }}>
                      {d.description}
                    </p>
                  )}
                </div>

                <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--color-frost)' }}>
                  {d.code === 'CSE' ? (
                    <Link to="/departments/cse" className="btn-vermillion" style={{ width: '100%', padding: '10px 16px', fontSize: '12px', textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
                      View Complete Profile <ArrowRight size={14} style={{ marginLeft: '6px' }} />
                    </Link>
                  ) : (
                    <span style={{ fontSize: '12px', color: 'var(--color-iron)' }}>Standard Department Profile</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
