import React from 'react';
import { Home, Users, Music, Trophy } from 'lucide-react';

export default function CampusLife() {
  const pillars = [
    { title: 'Residential Hostels', desc: 'Separate on-campus accommodation for boys and girls with high-speed Wi-Fi, solar heating, and modern dining halls.', tag: 'RESIDENTIAL' },
    { title: 'Clubs & Technical Societies', desc: 'Over 20 active student clubs including ACM Chapter, IEEE Student Branch, Robotics Society, and Google Developer Groups.', tag: 'STUDENT BODIES' },
    { title: 'Spandana & Pragnya Fests', desc: 'Annual cultural extravaganza Spandana and national technical symposium Pragnya welcoming thousands of participants.', tag: 'ANNUAL FESTIVALS' },
    { title: 'Sports & Gymnasium', desc: '400m running track, indoor badminton arenas, floodlit basketball courts, and full gymnasium facilities.', tag: 'ATHLETICS' },
  ];

  return (
    <div className="section-gap">
      <div className="layout-container">
        <div style={{ marginBottom: '40px' }}>
          <div className="eyebrow-pill" style={{ marginBottom: '16px' }}>STUDENT ECOSYSTEM</div>
          <h1 className="display-headline" style={{ fontSize: '48px', marginBottom: '16px' }}>
            Campus Life & Culture
          </h1>
          <p className="body-lead" style={{ maxWidth: '780px' }}>
            A rich 100-acre residential campus situated in the heart of Hyderabad's technology corridor offering vibrant extracurricular and intellectual life.
          </p>
        </div>

        <div className="grid-3-col">
          {pillars.map((p, idx) => (
            <div key={idx} className="card-paper">
              <span className="eyebrow-pill" style={{ marginBottom: '16px' }}>{p.tag}</span>
              <h3 className="heading-sm" style={{ marginBottom: '8px' }}>{p.title}</h3>
              <p className="body-standard" style={{ fontSize: '14px' }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
