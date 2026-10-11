import React from 'react';
import { Cpu, Award, Lightbulb, FileCheck } from 'lucide-react';

export default function Research() {
  const centers = [
    { title: 'Centre for Artificial Intelligence & Deep Learning', lead: 'Dr. P. Sammulal', grants: 'DST / SERB Sponsored' },
    { title: 'Centre for VLSI and Embedded Systems', lead: 'Dr. T. Satya Savithri', grants: 'MeitY Funded' },
    { title: 'Advanced Metallurgy & Materials Characterization Cell', lead: 'Dr. B. Ramesh Chandra', grants: 'DRDO Collaborative' },
    { title: 'Cloud Systems & High Performance Distributed Lab', lead: 'Dr. A. Kavitha', grants: 'AICTE Research Grant' },
  ];

  return (
    <div className="section-gap">
      <div className="layout-container">
        <div style={{ marginBottom: '40px' }}>
          <div className="eyebrow-pill" style={{ marginBottom: '16px' }}>INNOVATION DISPATCH</div>
          <h1 className="display-headline" style={{ fontSize: '48px', marginBottom: '16px' }}>
            Research, Grants & Incubation
          </h1>
          <p className="body-lead" style={{ maxWidth: '780px' }}>
            Driving translational research with sponsored projects funded by government defense, electronics, and science ministries alongside industrial tech partners.
          </p>
        </div>

        <div className="grid-3-col" style={{ marginBottom: '48px' }}>
          {centers.map((c, idx) => (
            <div key={idx} className="card-paper">
              <span className="eyebrow-pill" style={{ marginBottom: '12px' }}>RESEARCH HUB</span>
              <h3 className="heading-sm" style={{ marginBottom: '8px', fontSize: '18px' }}>{c.title}</h3>
              <div style={{ fontSize: '13px', color: 'var(--color-slate-600)', marginBottom: '8px' }}>
                Principal Investigator: <strong>{c.lead}</strong>
              </div>
              <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-vermillion-signal)' }}>
                {c.grants}
              </div>
            </div>
          ))}
        </div>

        <div className="card-paper" style={{ padding: '36px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            <div className="stat-block">
              <div className="stat-number">45+</div>
              <div className="stat-label">Funded R&D Projects</div>
            </div>
            <div className="stat-block">
              <div className="stat-number">120+</div>
              <div className="stat-label">Patents Published & Granted</div>
            </div>
            <div className="stat-block">
              <div className="stat-number">₹8.4 Cr</div>
              <div className="stat-label">Active Research Grants</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
