import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Cpu, 
  Users, 
  Award, 
  BookOpen, 
  Layers, 
  Mail, 
  CheckCircle2, 
  Building, 
  Briefcase, 
  Phone, 
  MapPin, 
  ChevronRight,
  TrendingUp,
  Server
} from 'lucide-react';

export default function CseDepartment() {
  const [activeTab, setActiveTab] = useState('overview'); // overview, faculty, labs, curriculum, placements, contact

  const facultyMembers = [
    { name: 'Dr. A. Kavitha', desig: 'Professor & HOD', qual: 'Ph.D. (CSE)', spec: 'Cloud Computing & Distributed Systems', email: 'kavitha.cse@jntuh.ac.in', office: 'CSE-101' },
    { name: 'Dr. P. Sammulal', desig: 'Professor', qual: 'Ph.D. (CSE)', spec: 'Data Mining & Artificial Intelligence', email: 'sammulal.cse@jntuh.ac.in', office: 'CSE-102' },
    { name: 'Dr. D. Ramesh', desig: 'Professor', qual: 'Ph.D. (CSE)', spec: 'Cryptography & Information Security', email: 'ramesh.cse@jntuh.ac.in', office: 'CSE-103' },
    { name: 'Dr. K. Shahu Chatrapati', desig: 'Professor', qual: 'Ph.D. (CSE)', spec: 'Machine Learning & Image Processing', email: 'shahuchatrapati@jntuh.ac.in', office: 'CSE-104' },
    { name: 'Dr. M. Chandra Mohan', desig: 'Professor', qual: 'Ph.D. (CSE)', spec: 'Natural Language Processing & AI', email: 'chandramohan@jntuh.ac.in', office: 'CSE-105' },
    { name: 'Dr. B. Sateesh Kumar', desig: 'Assoc. Professor', qual: 'Ph.D. (CSE)', spec: 'Software Engineering & Agile Systems', email: 'sateesh.cse@jntuh.ac.in', office: 'CSE-106' },
    { name: 'Dr. G. Venkatarami Reddy', desig: 'Assoc. Professor', qual: 'Ph.D. (CSE)', spec: 'Computer Networks & IoT Systems', email: 'gvr.cse@jntuh.ac.in', office: 'CSE-107' },
    { name: 'Dr. K. Neeraja', desig: 'Assoc. Professor', qual: 'Ph.D. (CSE)', spec: 'Deep Learning & Computer Vision', email: 'neeraja.cse@jntuh.ac.in', office: 'CSE-108' },
    { name: 'Mr. P. Vijay Kumar', desig: 'Asst. Professor', qual: 'M.Tech, (Ph.D.)', spec: 'Database Systems & Web Technologies', email: 'vijaykumar.cse@jntuh.ac.in', office: 'CSE-109' },
    { name: 'Mrs. S. Radhika', desig: 'Asst. Professor', qual: 'M.Tech, (Ph.D.)', spec: 'Algorithms & Theoretical Computing', email: 'radhika.cse@jntuh.ac.in', office: 'CSE-110' },
    { name: 'Dr. N. Suresh', desig: 'Asst. Professor', qual: 'Ph.D. (CSE)', spec: 'Cyber Security & Blockchain', email: 'suresh.cse@jntuh.ac.in', office: 'CSE-111' },
    { name: 'Mrs. T. Anitha', desig: 'Asst. Professor', qual: 'M.Tech', spec: 'Operating Systems & Compilers', email: 'anitha.cse@jntuh.ac.in', office: 'CSE-112' },
  ];

  const labs = [
    { 
      title: 'AI & Deep Learning Lab', 
      hw: 'High-end workstations with NVIDIA RTX 4090 GPUs, 64GB RAM', 
      sw: 'PyTorch, TensorFlow, CUDA Toolkit, OpenCV, JupyterHub',
      desc: 'Dedicated to GPU-accelerated neural networks, generative AI research, large language model fine-tuning, and medical computer vision.'
    },
    { 
      title: 'Cloud & Distributed Systems Lab', 
      hw: 'Enterprise rack servers, 10Gbps dedicated optical backbone', 
      sw: 'OpenStack, Kubernetes, Docker, Apache Spark, Hadoop clusters',
      desc: 'Focuses on microservice architectures, fault-tolerant consensus protocols, container virtualization, and high-velocity big data pipelines.'
    },
    { 
      title: 'Database & Web Tech Lab', 
      hw: '65 Dell OptiPlex Core i7 Workstations', 
      sw: 'MySQL 8, PostgreSQL, Oracle 19c, React, Node.js, Spring Boot',
      desc: 'Used for full-stack application development, distributed query optimization, transaction processing, and enterprise software engineering.'
    },
    { 
      title: 'Networks & Cyber Security Lab', 
      hw: 'Cisco Enterprise Routers, managed L3 switches, hardware firewalls', 
      sw: 'Wireshark, GNS3, Kali Linux, Snort IDS, Metasploit, Cryptool',
      desc: 'Hands-on practice in cryptographic algorithms, packet flow telemetry, intrusion prevention, and ethical vulnerability assessment.'
    },
    { 
      title: 'Systems Programming & Algorithms Lab', 
      hw: '60 high-performance Linux workstations (Ubuntu LTS)', 
      sw: 'GCC, Clang, GDB, Valgrind, Python 3, OpenMP, MPI',
      desc: 'Foundation laboratory for data structures, algorithmic complexity profiling, compiler construction, and Unix systems programming.'
    },
  ];

  const curriculumSem5 = [
    { code: 'CS501PC', name: 'Database Management Systems', credits: 4.0, type: 'Professional Core', faculty: 'Mr. P. Vijay Kumar' },
    { code: 'CS502PC', name: 'Computer Networks', credits: 4.0, type: 'Professional Core', faculty: 'Dr. G. Venkatarami Reddy' },
    { code: 'CS503PC', name: 'Web Technologies', credits: 3.0, type: 'Professional Core', faculty: 'Mr. P. Vijay Kumar' },
    { code: 'CS504PC', name: 'Design and Analysis of Algorithms', credits: 4.0, type: 'Professional Core', faculty: 'Mrs. S. Radhika' },
    { code: 'CS505PC', name: 'Software Engineering', credits: 3.0, type: 'Professional Core', faculty: 'Dr. B. Sateesh Kumar' },
    { code: 'CS506PC', name: 'Database Management Systems Laboratory', credits: 1.5, type: 'Practical Lab', faculty: 'Mr. P. Vijay Kumar' },
    { code: 'CS507PC', name: 'Web Technologies Laboratory', credits: 1.5, type: 'Practical Lab', faculty: 'Mrs. S. Radhika' },
    { code: 'MC508', name: 'Intellectual Property Rights', credits: 0.0, type: 'Audit Mandatory', faculty: 'Dean Academic Wing' },
  ];

  const tabs = [
    { id: 'overview', label: 'Department Overview', icon: BookOpen },
    { id: 'faculty', label: 'Faculty Roster (12)', icon: Users },
    { id: 'labs', label: 'Laboratories (5)', icon: Server },
    { id: 'curriculum', label: 'Curriculum & R22', icon: Layers },
    { id: 'placements', label: 'Placements & Stats', icon: TrendingUp },
    { id: 'contact', label: 'Department Contact', icon: MapPin },
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
          <p className="body-lead" style={{ maxWidth: '820px' }}>
            Established in 1984. Tier-1 NBA accredited center of excellence driving foundational computing theory, intensive software engineering labs, and world-class technology placements.
          </p>
        </div>

        {/* 6 Tabs Navigation Bar */}
        <div style={{
          display: 'flex',
          gap: '8px',
          borderBottom: '1px solid var(--color-frost)',
          paddingBottom: '12px',
          marginBottom: '36px',
          overflowX: 'auto'
        }}>
          {tabs.map((t) => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 18px',
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: isActive ? 'var(--color-carbon)' : 'var(--color-paper)',
                  color: isActive ? '#ffffff' : 'var(--color-slate-700)',
                  border: '1px solid var(--color-cloud)',
                  fontWeight: isActive ? 600 : 500,
                  fontSize: '13px',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease'
                }}
              >
                <Icon size={16} />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div>
            {/* HOD Statement Card */}
            <div className="card-paper" style={{ padding: '40px', marginBottom: '40px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '36px', alignItems: 'center' }}>
                <div>
                  <div className="eyebrow-pill" style={{ marginBottom: '12px' }}>HEAD OF DEPARTMENT</div>
                  <h2 style={{ fontSize: '26px', fontWeight: 600, color: 'var(--color-slate-900)' }}>Dr. A. Kavitha</h2>
                  <div style={{ fontSize: '14px', color: 'var(--color-slate-600)', marginTop: '4px' }}>
                    Professor & HOD • Ph.D. (Computer Science & Systems Engineering) • 24+ Years Experience
                  </div>
                  <p style={{ marginTop: '16px', fontSize: '15px', color: 'var(--color-slate-700)', lineHeight: '1.7', fontStyle: 'italic' }}>
                    "Our department prides itself on academic rigor, relentless curiosity, and cutting-edge laboratory infrastructure. Our students build software that scales, understand systems from the metal to the cloud, and consistently place among the top tech organizations globally."
                  </p>
                  <div style={{ marginTop: '16px', display: 'flex', gap: '16px', fontSize: '13px', color: 'var(--color-slate-700)' }}>
                    <span>Email: <strong>kavitha.cse@jntuh.ac.in</strong></span>
                    <span>Office: <strong>Room CSE-101</strong></span>
                  </div>
                </div>

                <div className="card-carbon" style={{ padding: '28px' }}>
                  <div style={{ fontSize: '12px', color: 'var(--color-mist)', textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '0.3px' }}>
                    DEPARTMENTAL ATTRIBUTES
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '14px' }}>
                    <div>• Established Year: <strong>1984</strong></div>
                    <div>• NBA Accreditation: <strong>Tier-1 (Valid through 2027)</strong></div>
                    <div>• Sanctioned B.Tech Intake: <strong>60 Scholars</strong> (+10% Lateral)</div>
                    <div>• Student-to-Faculty Ratio: <strong>14:1</strong></div>
                    <div>• Top Placement CTC: <strong>44.0 LPA</strong> (Amazon AWS)</div>
                    <div>• Average Package: <strong>11.8 LPA</strong></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Vision & Mission Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '40px' }}>
              <div className="card-paper" style={{ padding: '32px' }}>
                <span className="eyebrow-pill" style={{ marginBottom: '16px' }}>VISION</span>
                <h3 className="heading-sm" style={{ marginBottom: '12px' }}>Department Vision</h3>
                <p className="body-standard" style={{ fontSize: '14px', lineHeight: '1.7' }}>
                  To be a premier center of excellence in computing education and research, fostering creative, globally competitive computing professionals equipped with deep foundational rigor and committed to solving society’s grand challenges.
                </p>
              </div>

              <div className="card-paper" style={{ padding: '32px' }}>
                <span className="eyebrow-pill" style={{ marginBottom: '16px' }}>MISSION</span>
                <h3 className="heading-sm" style={{ marginBottom: '12px' }}>Department Mission</h3>
                <ul style={{ paddingLeft: '20px', fontSize: '14px', color: 'var(--color-slate-700)', lineHeight: '1.7' }}>
                  <li>Provide deep theoretical foundations paired with intensive hands-on programming and system engineering.</li>
                  <li>Advance state-of-the-art research in artificial intelligence, cloud architectures, data analytics, and cyber security.</li>
                  <li>Foster interdisciplinary innovation in partnership with premier industry leaders and global universities.</li>
                  <li>Nurture professional ethics, open-source contribution, and leadership mindsets.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: FACULTY ROSTER */}
        {activeTab === 'faculty' && (
          <div>
            <div style={{ marginBottom: '24px' }}>
              <h3 className="heading-sm">Distinguished Academic Faculty (12 Members)</h3>
              <p style={{ fontSize: '13px', color: 'var(--color-slate-600)', marginTop: '4px' }}>
                All faculty hold doctorates or advanced master degrees from premier institutions with extensive industry and research backgrounds.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
              {facultyMembers.map((fac, idx) => (
                <div key={idx} className="card-paper" style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ fontSize: '17px', fontWeight: 600, color: 'var(--color-slate-900)' }}>{fac.name}</div>
                    <span className="eyebrow-pill" style={{ padding: '2px 8px', fontSize: '10px' }}>{fac.office}</span>
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-vermillion-signal)', marginTop: '4px' }}>
                    {fac.desig}
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--color-slate-600)', marginTop: '8px' }}>
                    {fac.qual}
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--color-iron)', marginTop: '4px' }}>
                    {fac.spec}
                  </div>
                  <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--color-frost)', fontSize: '12px', color: 'var(--color-slate-700)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Mail size={14} color="var(--color-slate-600)" /> {fac.email}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: LABORATORIES */}
        {activeTab === 'labs' && (
          <div>
            <div style={{ marginBottom: '24px' }}>
              <h3 className="heading-sm">Research & Specialized Laboratories</h3>
              <p style={{ fontSize: '13px', color: 'var(--color-slate-600)', marginTop: '4px' }}>
                Five enterprise-grade computing facilities equipped with GPU workstations, high-speed optical uplinks, and modern software toolchains.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {labs.map((lab, idx) => (
                <div key={idx} className="card-paper" style={{ padding: '28px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                    <h4 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-slate-900)' }}>
                      Lab {idx + 1}: {lab.title}
                    </h4>
                    <span className="eyebrow-pill">AUTONOMOUS RESEARCH FACILITY</span>
                  </div>

                  <p style={{ fontSize: '14px', color: 'var(--color-slate-700)', lineHeight: '1.6', marginBottom: '16px' }}>
                    {lab.desc}
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', padding: '16px', backgroundColor: 'var(--color-vellum)', borderRadius: 'var(--radius-lg)', fontSize: '13px' }}>
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--color-slate-900)', marginBottom: '4px' }}>Hardware Infrastructure</div>
                      <div style={{ color: 'var(--color-slate-600)' }}>{lab.hw}</div>
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--color-slate-900)', marginBottom: '4px' }}>Software & Frameworks</div>
                      <div style={{ color: 'var(--color-slate-600)' }}>{lab.sw}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: CURRICULUM */}
        {activeTab === 'curriculum' && (
          <div>
            <div style={{ marginBottom: '24px' }}>
              <h3 className="heading-sm">Autonomous Curriculum — R22 Regulation</h3>
              <p style={{ fontSize: '13px', color: 'var(--color-slate-600)', marginTop: '4px' }}>
                Curriculum designed in consultation with industry leaders to prioritize software design, cloud scaling, and AI algorithms.
              </p>
            </div>

            <div className="card-paper" style={{ padding: '28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h4 style={{ fontSize: '18px', fontWeight: 600 }}>Semester V Course Offerings (Current Batch)</h4>
                <span className="eyebrow-pill">21 TOTAL CREDITS</span>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--color-slate-900)' }}>
                      <th style={{ padding: '12px' }}>Course Code</th>
                      <th style={{ padding: '12px' }}>Course Title</th>
                      <th style={{ padding: '12px' }}>Credits</th>
                      <th style={{ padding: '12px' }}>Category</th>
                      <th style={{ padding: '12px' }}>Faculty In-Charge</th>
                    </tr>
                  </thead>
                  <tbody>
                    {curriculumSem5.map((c) => (
                      <tr key={c.code} style={{ borderBottom: '1px solid var(--color-frost)' }}>
                        <td style={{ padding: '12px', fontWeight: 600 }}>{c.code}</td>
                        <td style={{ padding: '12px' }}>{c.name}</td>
                        <td style={{ padding: '12px', fontWeight: 600 }}>{c.credits}</td>
                        <td style={{ padding: '12px' }}>
                          <span className="eyebrow-pill" style={{ padding: '2px 8px', fontSize: '11px' }}>{c.type}</span>
                        </td>
                        <td style={{ padding: '12px', color: 'var(--color-slate-600)' }}>{c.faculty}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: PLACEMENTS */}
        {activeTab === 'placements' && (
          <div>
            <div style={{ marginBottom: '24px' }}>
              <h3 className="heading-sm">Placement Statistics & Corporate Partners</h3>
              <p style={{ fontSize: '13px', color: 'var(--color-slate-600)', marginTop: '4px' }}>
                UCEST CSE graduates consistently rank among the top recruited engineers in the country with 92% average placement rates.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '32px' }}>
              <div className="card-paper" style={{ padding: '24px' }}>
                <div style={{ fontSize: '12px', color: 'var(--color-slate-600)', textTransform: 'uppercase', fontWeight: 600 }}>Highest Compensation</div>
                <div className="stat-number" style={{ fontSize: '40px', marginTop: '8px' }}>44.0 LPA</div>
                <div style={{ fontSize: '12px', color: 'var(--color-iron)', marginTop: '4px' }}>Amazon AWS Cloud Infrastructure</div>
              </div>

              <div className="card-paper" style={{ padding: '24px' }}>
                <div style={{ fontSize: '12px', color: 'var(--color-slate-600)', textTransform: 'uppercase', fontWeight: 600 }}>Average Compensation</div>
                <div className="stat-number" style={{ fontSize: '40px', marginTop: '8px' }}>11.8 LPA</div>
                <div style={{ fontSize: '12px', color: 'var(--color-iron)', marginTop: '4px' }}>Across registered graduates</div>
              </div>

              <div className="card-paper" style={{ padding: '24px' }}>
                <div style={{ fontSize: '12px', color: 'var(--color-slate-600)', textTransform: 'uppercase', fontWeight: 600 }}>Offers per Student</div>
                <div className="stat-number" style={{ fontSize: '40px', marginTop: '8px' }}>1.7</div>
                <div style={{ fontSize: '12px', color: 'var(--color-iron)', marginTop: '4px' }}>98 total job offers</div>
              </div>
            </div>

            <div className="card-paper" style={{ padding: '32px' }}>
              <h4 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>Top Recruiting Organizations</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                {['Google', 'Microsoft', 'Amazon', 'Oracle', 'Salesforce', 'Adobe', 'Cisco', 'Qualcomm', 'Goldman Sachs', 'Morgan Stanley', 'TCS Digital', 'Infosys Turbo'].map((co) => (
                  <span 
                    key={co} 
                    style={{
                      padding: '8px 16px',
                      borderRadius: 'var(--radius-lg)',
                      backgroundColor: 'var(--color-vellum)',
                      border: '1px solid var(--color-cloud)',
                      fontWeight: 600,
                      fontSize: '13px',
                      color: 'var(--color-slate-900)'
                    }}
                  >
                    {co}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: CONTACT & LOCATION */}
        {activeTab === 'contact' && (
          <div className="card-paper" style={{ padding: '36px', maxWidth: '640px' }}>
            <h3 className="heading-sm" style={{ marginBottom: '16px' }}>Department of Computer Science & Engineering</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '14px', lineHeight: '1.7', color: 'var(--color-slate-700)' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <Building size={20} color="var(--color-vermillion-signal)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong>Location:</strong><br />
                  Academic Block III (Ground & First Floor),<br />
                  JNTUH University College of Engineering, Science & Technology,<br />
                  Kukatpally, Hyderabad - 500085, Telangana, India.
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <Mail size={18} color="var(--color-vermillion-signal)" style={{ flexShrink: 0 }} />
                <div>
                  <strong>Email:</strong> hod.cse@ucest.edu / kavitha.cse@jntuh.ac.in
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <Phone size={18} color="var(--color-vermillion-signal)" style={{ flexShrink: 0 }} />
                <div>
                  <strong>Phone:</strong> +91-40-23158661 (Ext: 201)
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
