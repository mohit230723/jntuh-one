import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { BookOpen, Users, CheckCircle, Clock, Save, ArrowRight } from 'lucide-react';

export default function FacultyDashboard() {
  const { user } = useAuth();
  const [selectedSubject, setSelectedSubject] = useState('CS501PC');
  const [attendanceDate, setAttendanceDate] = useState('2026-10-12');
  const [markedCount, setMarkedCount] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const assignedClasses = [
    { code: 'CS501PC', name: 'Database Management Systems', semester: 'Sem V', section: 'A', students: 60, schedule: 'Mon 09:30, Tue 10:30, Wed 11:45' },
    { code: 'CS503PC', name: 'Web Technologies', semester: 'Sem V', section: 'A', students: 60, schedule: 'Mon 11:45, Thu 09:30, Fri 10:30' },
    { code: 'CS507PC', name: 'Web Technologies Laboratory', semester: 'Sem V', section: 'A', students: 60, schedule: 'Wed 01:45 - 03:45' },
  ];

  // Sample student list for attendance marking
  const [students, setStudents] = useState([
    { roll: '23011A0501', name: 'A. Rahul Sharma', present: true },
    { roll: '23011A0502', name: 'B. Sneha Reddy', present: true },
    { roll: '23011A0503', name: 'C. Sai Krishna', present: true },
    { roll: '23011A0504', name: 'D. Ananya Rao', present: true },
    { roll: '23011A0505', name: 'E. Karthik Varma', present: false },
    { roll: '23011A0506', name: 'G. Divya Sree', present: true },
    { roll: '23011A0507', name: 'H. Vikramaditya', present: true },
    { roll: '23011A0508', name: 'J. Pooja Patel', present: true },
    { roll: '23011A0509', name: 'K. Nikhil Teja', present: false },
    { roll: '23011A0510', name: 'L. Manasa Devi', present: true },
  ]);

  const toggleStatus = (index) => {
    const updated = [...students];
    updated[index].present = !updated[index].present;
    setStudents(updated);
  };

  const handleSaveAttendance = () => {
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div>
      {/* Faculty Header */}
      <div style={{ marginBottom: '32px' }}>
        <div className="eyebrow-pill" style={{ marginBottom: '8px' }}>FACULTY INSTRUCTION DESK</div>
        <h1 className="heading-lg" style={{ fontSize: '32px' }}>Welcome, {user?.name || 'Mr. P. Vijay Kumar'}</h1>
        <div style={{ fontSize: '13px', color: 'var(--color-slate-600)', marginTop: '4px' }}>
          Faculty ID: <strong>{user?.username || 'FAC-CSE-102'}</strong> • Assistant Professor • Department of Computer Science & Engineering
        </div>
      </div>

      {/* Assigned Classes Grid */}
      <div style={{ marginBottom: '36px' }}>
        <div style={{ fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', color: 'var(--color-slate-700)', marginBottom: '16px' }}>
          Assigned Course Cohorts (Semester V)
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          {assignedClasses.map((cls) => (
            <div 
              key={cls.code}
              className="card-paper"
              style={{
                cursor: 'pointer',
                borderLeft: selectedSubject === cls.code ? '4px solid var(--color-vermillion-signal)' : '1px solid var(--color-frost)'
              }}
              onClick={() => setSelectedSubject(cls.code)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="eyebrow-pill">{cls.code}</span>
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-slate-900)' }}>{cls.semester} • Sec {cls.section}</span>
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-slate-900)', marginTop: '12px' }}>
                {cls.name}
              </h3>
              <div style={{ fontSize: '13px', color: 'var(--color-slate-600)', marginTop: '8px' }}>
                • Enrolled: <strong>{cls.students} Scholars</strong><br />
                • Schedule: {cls.schedule}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Attendance Dispatch Panel */}
      <div className="card-paper">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-slate-900)' }}>
              Mark Attendance: {selectedSubject}
            </h3>
            <div style={{ fontSize: '13px', color: 'var(--color-slate-600)', marginTop: '2px' }}>
              Select date and toggle scholar attendance status.
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <input
              type="date"
              value={attendanceDate}
              onChange={(e) => setAttendanceDate(e.target.value)}
              className="input-field"
              style={{ width: 'auto' }}
            />
            <button
              onClick={handleSaveAttendance}
              className="btn-vermillion"
              style={{ padding: '12px 20px', fontSize: '13px' }}
            >
              <Save size={16} /> {submitted ? 'Recorded Successfully!' : 'Record Session'}
            </button>
          </div>
        </div>

        {/* Student Toggle Table */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
          {students.map((st, index) => (
            <div
              key={st.roll}
              onClick={() => toggleStatus(index)}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 16px',
                borderRadius: 'var(--radius-universal)',
                border: '1px solid var(--color-frost)',
                backgroundColor: st.present ? 'var(--color-paper)' : '#fef2f2',
                cursor: 'pointer',
                transition: 'background-color 0.15s ease'
              }}
            >
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-slate-900)' }}>
                  {st.name}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--color-iron)' }}>
                  {st.roll}
                </div>
              </div>

              <span style={{
                fontSize: '11px',
                fontWeight: 700,
                padding: '4px 10px',
                borderRadius: '4px',
                backgroundColor: st.present ? '#ecfdf5' : 'var(--color-vermillion-signal)',
                color: st.present ? 'var(--color-success)' : '#ffffff'
              }}>
                {st.present ? 'PRESENT' : 'ABSENT'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
