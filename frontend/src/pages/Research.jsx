import React from 'react';
import { Cpu, Award, Lightbulb, FileCheck, Layers, ExternalLink, Zap } from 'lucide-react';

export default function Research() {
  const centers = [
    { title: 'Centre for Artificial Intelligence & Deep Learning', lead: 'Dr. P. Sammulal', grants: 'DST / SERB Sponsored (₹85 Lakhs)', domain: 'Large-scale transformer models, medical diagnostics image segmentation, low-resource multilingual translation.' },
    { title: 'Centre for VLSI Design & Nanotechnology', lead: 'Dr. T. Satya Savithri', grants: 'MeitY Special Manpower Program (₹1.2 Cr)', domain: 'Sub-micron CMOS circuitry, radiation-hardened memory units, neuromorphic computing chip architectures.' },
    { title: 'Advanced Metallurgy & Materials Characterization Cell', lead: 'Dr. B. Ramesh Chandra', grants: 'DRDO Collaborative Defense Grant (₹95 Lakhs)', domain: 'High-entropy alloy synthesis, ballistic impact resistance, aerospace titanium heat-treatment.' },
    { title: 'Cloud Systems & High Performance Distributed Lab', lead: 'Dr. A. Kavitha', grants: 'AICTE / Industry Collaborative (₹60 Lakhs)', domain: 'Distributed consensus algorithms, elastic cloud resource orchestration, microservice telemetry.' },
  ];

  const sponsoredProjects = [
    { agency: 'DST - Science & Engineering Research Board (SERB)', title: 'Development of Robust Graph Neural Networks for Epidemic Spread Modeling in Megacities', sanction: '₹48.5 Lakhs', status: 'Ongoing (2024–2027)' },
    { agency: 'Ministry of Electronics and Information Technology (MeitY)', title: 'Chip-to-Cloud Hardware Security Architectures for IoT Healthcare Nodes', sanction: '₹72.0 Lakhs', status: 'Ongoing (2025–2028)' },
    { agency: 'Indian Space Research Organisation (ISRO - RESPOND)', title: 'Hyperspectral Remote Sensing Image Denoising and Super-Resolution Reconstruction', sanction: '₹34.2 Lakhs', status: 'Completed (2023–2025)' },
    { agency: 'Defence Research and Development Organisation (DRDO)', title: 'Thermal Barrier Coatings for High-Temperature Gas Turbine Rotor Blades', sanction: '₹55.0 Lakhs', status: 'Ongoing (2024–2026)' },
  ];

  return (
    <div className="section-gap">
      <div className="layout-container">
        {/* Header Breadcrumb */}
        <div style={{ marginBottom: '40px' }}>
          <div className="eyebrow-pill" style={{ marginBottom: '16px' }}>INNOVATION & DISCOVERY</div>
          <h1 className="display-headline" style={{ fontSize: '48px', marginBottom: '16px' }}>
            Research, Grants & Incubation
          </h1>
          <p className="body-lead" style={{ maxWidth: '820px' }}>
            Advancing translational engineering with high-impact sponsored projects funded by Indian defense, electronics, space, and science ministries alongside global industry consortia.
          </p>
        </div>

        {/* Aggregate KPI Strip */}
        <div className="card-paper" style={{ padding: '36px', marginBottom: '48px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
            <div className="stat-block">
              <div className="stat-number">₹14.2 Cr</div>
              <div className="stat-label">Active Sponsored Research Grants</div>
            </div>
            <div className="stat-block">
              <div className="stat-number">48+</div>
              <div className="stat-label">Government & Industry Sponsored Projects</div>
            </div>
            <div className="stat-block">
              <div className="stat-number">135+</div>
              <div className="stat-label">Patents Published & Granted</div>
            </div>
            <div className="stat-block">
              <div className="stat-number">850+</div>
              <div className="stat-label">Scopus / SCI Indexed Publications</div>
            </div>
          </div>
        </div>

        {/* Specialized Research Centers */}
        <div style={{ marginBottom: '48px' }}>
          <div className="eyebrow-pill" style={{ marginBottom: '8px' }}>CENTRES OF EXCELLENCE</div>
          <h2 className="heading-lg" style={{ fontSize: '32px', marginBottom: '24px' }}>Interdisciplinary Research Centers</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {centers.map((c, idx) => (
              <div key={idx} className="card-paper" style={{ padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span className="eyebrow-pill">CENTER #{idx + 1}</span>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-vermillion-signal)' }}>{c.grants}</span>
                  </div>
                  <h3 className="heading-sm" style={{ marginBottom: '8px', fontSize: '18px' }}>{c.title}</h3>
                  <div style={{ fontSize: '13px', color: 'var(--color-slate-600)', marginBottom: '12px' }}>
                    Principal Investigator: <strong>{c.lead}</strong>
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--color-slate-700)', lineHeight: '1.6' }}>
                    {c.domain}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sponsored Projects Table */}
        <div className="card-paper" style={{ padding: '36px' }}>
          <h3 className="heading-sm" style={{ marginBottom: '20px' }}>Major Government Sponsored Research Projects</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--color-slate-900)' }}>
                  <th style={{ padding: '12px 14px' }}>Funding Agency</th>
                  <th style={{ padding: '12px 14px' }}>Project Title</th>
                  <th style={{ padding: '12px 14px' }}>Grant Outlay</th>
                  <th style={{ padding: '12px 14px' }}>Project Tenure</th>
                </tr>
              </thead>
              <tbody>
                {sponsoredProjects.map((p, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--color-frost)' }}>
                    <td style={{ padding: '14px', fontWeight: 600 }}>{p.agency}</td>
                    <td style={{ padding: '14px', color: 'var(--color-slate-800)' }}>{p.title}</td>
                    <td style={{ padding: '14px', fontWeight: 600, color: 'var(--color-slate-900)' }}>{p.sanction}</td>
                    <td style={{ padding: '14px' }}>
                      <span className="eyebrow-pill" style={{ padding: '2px 8px', fontSize: '11px' }}>{p.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
