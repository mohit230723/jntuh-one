import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  CheckCircle, 
  AlertTriangle, 
  Award, 
  Clock, 
  CreditCard, 
  Calendar,
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import api from '../../services/api';

export default function StudentDashboard() {
  const { user } = useAuth();
  const [data, setData] = useState({
    rollNumber: user?.username || '23011A0501',
    name: user?.name || 'A. Rahul Sharma',
    branch: 'CSE',
    semester: 5,
    overallAttendancePercentage: 88.5,
    cgpa: 8.92,
    pendingFeeAmount: 0.0,
  });

  const subjects = [
    { code: 'CS501PC', name: 'Database Management Systems', conducted: 48, attended: 44, pct: 91.6, faculty: 'Mr. P. Vijay Kumar' },
    { code: 'CS502PC', name: 'Computer Networks', conducted: 46, attended: 41, pct: 89.1, faculty: 'Dr. G. Venkatarami Reddy' },
    { code: 'CS503PC', name: 'Web Technologies', conducted: 44, attended: 40, pct: 90.9, faculty: 'Mr. P. Vijay Kumar' },
    { code: 'CS504PC', name: 'Design and Analysis of Algorithms', conducted: 50, attended: 36, pct: 72.0, faculty: 'Mrs. S. Radhika', warning: true },
    { code: 'CS505PC', name: 'Software Engineering', conducted: 42, attended: 38, pct: 90.4, faculty: 'Dr. B. Sateesh Kumar' },
  ];

  const midMarks = [
    { code: 'CS501PC', name: 'DBMS', max: 30, score: 28.5 },
    { code: 'CS502PC', name: 'Computer Networks', max: 30, score: 27.0 },
    { code: 'CS503PC', name: 'Web Technologies', max: 30, score: 29.0 },
    { code: 'CS504PC', name: 'Algorithms', max: 30, score: 26.5 },
    { code: 'CS505PC', name: 'Software Engineering', max: 30, score: 28.0 },
  ];

  return (
    <div>
      {/* Top Banner Overview */}
      <div style={{ marginBottom: '32px' }}>
        <div className="eyebrow-pill" style={{ marginBottom: '8px' }}>STUDENT COMMAND DESK</div>
        <h1 className="heading-lg" style={{ fontSize: '32px' }}>Welcome, {data.name}</h1>
        <div style={{ fontSize: '13px', color: 'var(--color-slate-600)', marginTop: '4px' }}>
          Roll Number: <strong>{data.rollNumber}</strong> • Semester V • Department of Computer Science & Engineering
        </div>
      </div>

      {/* Metric Cards Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        {/* Attendance Metric */}
        <div className="card-paper" style={{ padding: '24px' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-slate-600)', textTransform: 'uppercase' }}>
            Cumulative Attendance
          </div>
          <div style={{ fontSize: '36px', fontWeight: 300, color: 'var(--color-slate-900)', marginTop: '8px', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            {data.overallAttendancePercentage}%
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-success)' }}>ELIGIBLE</span>
          </div>
          <div style={{ fontSize: '12px', color: 'var(--color-iron)', marginTop: '4px' }}>
            Threshold: 75% for regular exam promotion
          </div>
        </div>

        {/* CGPA Metric */}
        <div className="card-paper" style={{ padding: '24px' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-slate-600)', textTransform: 'uppercase' }}>
            Academic CGPA
          </div>
          <div style={{ fontSize: '36px', fontWeight: 300, color: 'var(--color-slate-900)', marginTop: '8px', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            {data.cgpa}
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-slate-700)' }}>OUT OF 10.0</span>
          </div>
          <div style={{ fontSize: '12px', color: 'var(--color-iron)', marginTop: '4px' }}>
            Previous Sem IV SGPA: 8.85
          </div>
        </div>

        {/* Fee Status Metric */}
        <div className="card-paper" style={{ padding: '24px' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-slate-600)', textTransform: 'uppercase' }}>
            Semester Fee Account
          </div>
          <div style={{ fontSize: '36px', fontWeight: 300, color: 'var(--color-slate-900)', marginTop: '8px', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            ₹0.00
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-success)' }}>PAID</span>
          </div>
          <div style={{ fontSize: '12px', color: 'var(--color-iron)', marginTop: '4px' }}>
            Receipt No: UCEST-2026-FEE-8891
          </div>
        </div>
      </div>

      {/* Grid: Subject Attendance + Mid Marks */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '32px' }}>
        {/* Attendance Breakdown Table */}
        <div className="card-paper">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-slate-900)' }}>
              Subject-Wise Attendance Breakdown
            </h3>
            <span className="eyebrow-pill">SEM V</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {subjects.map((sub) => (
              <div 
                key={sub.code}
                style={{
                  padding: '14px 16px',
                  backgroundColor: sub.warning ? '#fffbeb' : 'var(--color-vellum)',
                  border: sub.warning ? '1px solid #fef3c7' : '1px solid var(--color-frost)',
                  borderRadius: 'var(--radius-universal)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--color-slate-900)' }}>
                    {sub.code}: {sub.name}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--color-slate-600)', marginTop: '2px' }}>
                    {sub.faculty} • {sub.attended}/{sub.conducted} sessions
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: sub.warning ? 'var(--color-warning)' : 'var(--color-slate-900)'
                  }}>
                    {sub.pct}%
                  </div>
                  {sub.warning && (
                    <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--color-warning)' }}>
                      BELOW 75%
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mid-1 Assessments */}
        <div className="card-paper">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-slate-900)' }}>
              Mid-Term 1 Internal Assessments
            </h3>
            <span className="eyebrow-pill">CONFIRMED</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {midMarks.map((m) => (
              <div
                key={m.code}
                style={{
                  padding: '14px 16px',
                  backgroundColor: 'var(--color-vellum)',
                  border: '1px solid var(--color-frost)',
                  borderRadius: 'var(--radius-universal)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--color-slate-900)' }}>
                    {m.code}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--color-slate-600)' }}>
                    {m.name}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-slate-900)' }}>
                    {m.score} / {m.max}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--color-success)', fontWeight: 600 }}>
                    {((m.score / m.max) * 100).toFixed(0)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
