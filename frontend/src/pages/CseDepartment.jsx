import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu, Users, Award, BookOpen, Layers, Mail, CheckCircle2 } from 'lucide-react';

export default function CseDepartment() {
  const facultyMembers = [
    { name: 'Dr. A. Kavitha', desig: 'Professor & HOD', qual: 'Ph.D. (CSE)', spec: 'Cloud Computing & Distributed Systems', email: 'kavitha.cse@jntuh.ac.in' },
    { name: 'Dr. P. Sammulal', desig: 'Professor', qual: 'Ph.D. (CSE)', spec: 'Data Mining & Artificial Intelligence', email: 'sammulal.cse@jntuh.ac.in' },
    { name: 'Dr. D. Ramesh', desig: 'Professor', qual: 'Ph.D. (CSE)', spec: 'Cryptography & Information Security', email: 'ramesh.cse@jntuh.ac.in' },
    { name: 'Dr. K. Shahu Chatrapati', desig: 'Professor', qual: 'Ph.D. (CSE)', spec: 'Machine Learning & Image Processing', email: 'shahuchatrapati@jntuh.ac.in' },
    { name: 'Dr. M. Chandra Mohan', desig: 'Professor', qual: 'Ph.D. (CSE)', spec: 'Natural Language Processing & AI', email: 'chandramohan@jntuh.ac.in' },
    { name: 'Dr. B. Sateesh Kumar', desig: 'Assoc. Professor', qual: 'Ph.D. (CSE)', spec: 'Software Engineering & Agile Systems', email: 'sateesh.cse@jntuh.ac.in' },
    { name: 'Dr. G. Venkatarami Reddy', desig: 'Assoc. Professor', qual: 'Ph.D. (CSE)', spec: 'Computer Networks & IoT Systems', email: 'gvr.cse@jntuh.ac.in' },
    { name: 'Dr. K. Neeraja', desig: 'Assoc. Professor', qual: 'Ph.D. (CSE)', spec: 'Deep Learning & Computer Vision', email: 'neeraja.cse@jntuh.ac.in' },
    { name: 'Mr. P. Vijay Kumar', desig: 'Asst. Professor', qual: 'M.Tech, (Ph.D.)', spec: 'Database Systems & Web Technologies', email: 'vijaykumar.cse@jntuh.ac.in' },
    { name: 'Mrs. S. Radhika', desig: 'Asst. Professor', qual: 'M.Tech, (Ph.D.)', spec: 'Algorithms & Theoretical Computing', email: 'radhika.cse@jntuh.ac.in' },
    { name: 'Dr. N. Suresh', desig: 'Asst. Professor', qual: 'Ph.D. (CSE)', spec: 'Cyber Security & Blockchain', email: 'suresh.cse@jntuh.ac.in' },
    { name: 'Mrs. T. Anitha', desig: 'Asst. Professor', qual: 'M.Tech', spec: 'Operating Systems & Compilers', email: 'anitha.cse@jntuh.ac.in' },
  ];

  const labs = [
    { title: 'AI & Deep Learning Lab', hw: 'NVIDIA RTX 4090 GPUs, 64GB Workstations', sw: 'PyTorch, TensorFlow, CUDA Toolkit' },
    { title: 'Cloud & Distributed Systems Lab', hw: 'Enterprise Rack Servers, 10Gbps Optical Backbone', sw: 'OpenStack, Kubernetes, Apache Spark' },
    { title: 'Database & Web Tech Lab', hw: '65 Dell OptiPlex Core i7 Workstations', sw: 'MySQL 8, PostgreSQL, Spring Boot, React' },
    { title: 'Networks & Cyber Security Lab', hw: 'Cisco Enterprise Routers, Hardware Firewalls', sw: 'Wireshark, Kali Linux, Snort IDS' },
    { title: 'Systems Programming Lab', hw: '60 High-Performance Linux Nodes', sw: 'GCC, Clang, Valgrind, OpenMP' },
  ];

  return (
    <div className="section-gap">
      <div className="layout-container">
        {/* Header Breadcrumb */}
        <div style={{ marginBottom: '32px' }}>
          <div className="eyebrow-pill" style={{ marginBottom: '16px' }}>FEATURED DEPARTMENT SPOTLIGHT</div>
          <h1 className="display-headline" style={{ fontSize: '48px', marginBottom: '16px' }}>
            Computer Science and Engineering
          </h1>
          <p className="body-lead" style={{ maxWidth: '780px' }}>
            Established in 1984. Tier-1 NBA accredited program providing deep theoretical foundations, high-velocity engineering labs, and top-tier corporate recruitment.
          </p>
        </div>

        {/* HOD Statement Card */}
        <div className="card-paper" style={{ padding: '40px', marginBottom: '48px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', alignItems: 'center' }}>
            <div>
              <div className="eyebrow-pill" style={{ marginBottom: '12px' }}>HEAD OF DEPARTMENT</div>
              <h2 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--color-slate-900)' }}>Dr. A. Kavitha</h2>
              <div style={{ fontSize: '14px', color: 'var(--color-slate-600)', marginTop: '4px' }}>
                Professor & HOD • Ph.D. (Computer Science & Systems Engineering) • 24+ Years Experience
              </div>
              <p style={{ marginTop: '16px', fontSize: '15px', color: 'var(--color-slate-700)', lineHeight: '1.6', fontStyle: 'italic' }}>
                "Our department prides itself on academic rigor, relentless curiosity, and cutting-edge laboratory infrastructure. Our students build software that scales, understand systems from the metal to the cloud, and consistently place among the top tech organizations globally."
              </p>
            </div>
            <div className="card-carbon" style={{ padding: '24px' }}>
              <div style={{ fontSize: '12px', color: 'var(--color-mist)', textTransform: 'uppercase', marginBottom: '8px' }}>
                COHORT SPECIFICATIONS
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px' }}>
                <div>• Sanctioned B.Tech Intake: <strong>60 Scholars</strong> (+10% Lateral)</div>
                <div>• Student-to-Faculty Ratio: <strong>14:1</strong></div>
                <div>• Top Placement CTC: <strong>44.0 LPA</strong> (Amazon AWS)</div>
                <div>• Average Package: <strong>11.8 LPA</strong></div>
              </div>
            </div>
          </div>
        </div>

        {/* Faculty Roster */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
            <div>
              <div className="eyebrow-pill" style={{ marginBottom: '8px' }}>ACADEMIC FACULTY</div>
              <h2 className="heading-lg" style={{ fontSize: '32px' }}>Department Faculty Roster (12 Members)</h2>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
            {facultyMembers.map((fac, idx) => (
              <div key={idx} className="card-paper" style={{ padding: '20px' }}>
                <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-slate-900)' }}>{fac.name}</div>
                <div style={{ fontSize: '12px', fontWeight: 500, color: 'var(--color-vermillion-signal)', marginTop: '2px' }}>{fac.desig}</div>
                <div style={{ fontSize: '12px', color: 'var(--color-slate-600)', marginTop: '8px' }}>{fac.qual}</div>
                <div style={{ fontSize: '12px', color: 'var(--color-iron)', marginTop: '4px' }}>{fac.spec}</div>
                <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid var(--color-frost)', fontSize: '11px', color: 'var(--color-slate-700)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Mail size={12} /> {fac.email}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Laboratory Infrastructure */}
        <div>
          <div className="eyebrow-pill" style={{ marginBottom: '8px' }}>R&D INFRASTRUCTURE</div>
          <h2 className="heading-lg" style={{ fontSize: '32px', marginBottom: '24px' }}>Advanced Engineering Laboratories</h2>

          <div className="grid-3-col">
            {labs.map((lab, idx) => (
              <div key={idx} className="card-paper">
                <Cpu size={24} color="var(--color-slate-600)" style={{ marginBottom: '16px' }} />
                <h3 className="heading-sm" style={{ fontSize: '18px', marginBottom: '8px' }}>{lab.title}</h3>
                <div style={{ fontSize: '13px', color: 'var(--color-slate-700)', marginBottom: '8px' }}>
                  <strong>Hardware:</strong> {lab.hw}
                </div>
                <div style={{ fontSize: '13px', color: 'var(--color-slate-600)' }}>
                  <strong>Software:</strong> {lab.sw}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
