import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { noticeService } from '../services/noticeService';

export default function CampusLife() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    noticeService.getEvents().then((data) => {
      setEvents(Array.isArray(data) ? data : []);
    });
  }, []);

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

        <div className="grid-3-col" style={{ marginBottom: '56px' }}>
          {pillars.map((p, idx) => (
            <div key={idx} className="card-paper" style={{ padding: '28px' }}>
              <span className="eyebrow-pill" style={{ marginBottom: '16px' }}>{p.tag}</span>
              <h3 className="heading-sm" style={{ marginBottom: '8px' }}>{p.title}</h3>
              <p className="body-standard" style={{ fontSize: '14px', lineHeight: '1.6' }}>{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Live Upcoming Events Strip */}
        <div style={{ marginTop: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div>
              <div className="eyebrow-pill" style={{ marginBottom: '8px' }}>COMMUNITY CALENDAR</div>
              <h2 className="heading-sm">Upcoming Campus Events & Symposiums</h2>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
            {events.map((ev) => (
              <div 
                key={ev.id} 
                className="card-paper" 
                style={{
                  borderLeft: '4px solid var(--color-vermillion-signal)',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', fontSize: '12px', color: 'var(--color-slate-600)' }}>
                    <Calendar size={14} color="var(--color-vermillion-signal)" />
                    <span>{ev.postedDate}</span>
                    <span className="eyebrow-pill" style={{ padding: '2px 8px', fontSize: '10px' }}>{ev.category}</span>
                  </div>
                  <h4 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-slate-900)', marginBottom: '8px' }}>
                    {ev.title}
                  </h4>
                  <p style={{ fontSize: '13px', color: 'var(--color-slate-600)', lineHeight: '1.5' }}>
                    {ev.description}
                  </p>
                </div>
                <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--color-frost)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', color: 'var(--color-iron)' }}>{ev.author}</span>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-vermillion-signal)' }}>Registered →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
