import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { BookOpen, Users, CheckCircle, Clock, Save, ArrowRight, Award, CheckCircle2, AlertCircle } from 'lucide-react';
import { facultyService } from '../../services/facultyService';
import { errorMessage } from '../../services/mock';
import ErrorState from '../../components/ErrorState';

export default function FacultyDashboard() {
  const { user } = useAuth();
  const [classes, setClasses] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('CS501PC');
  const [activeTab, setActiveTab] = useState('attendance'); // 'attendance' or 'marks'
  
  // Attendance State
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split('T')[0]);
  const [timeSlot, setTimeSlot] = useState('09:30 - 10:30');
  const [topicCovered, setTopicCovered] = useState('Relational Algebra & Normalization Forms');
  const [students, setStudents] = useState([]);
  const [attStatus, setAttStatus] = useState({}); // rollNumber -> boolean
  const [submittingAtt, setSubmittingAtt] = useState(false);
  const [attSuccessMsg, setAttSuccessMsg] = useState(null);

  // Marks State
  const [examType, setExamType] = useState('MID_1'); // MID_1, MID_2, ASSIGNMENT
  const [maxMarks, setMaxMarks] = useState(30);
  const [marksData, setMarksData] = useState({}); // rollNumber -> score
  const [submittingMarks, setSubmittingMarks] = useState(false);
  const [marksSuccessMsg, setMarksSuccessMsg] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadClasses() {
      try {
        const cls = await facultyService.getClasses();
        setClasses(cls);
        if (cls.length > 0) {
          setSelectedSubject(cls[0].courseCode);
        }
      } catch (err) {
        setError(`Could not load your classes. ${errorMessage(err)}`);
      }
    }
    loadClasses();
  }, []);

  useEffect(() => {
    async function loadStudents() {
      if (!selectedSubject) return;
      try {
        const studentList = await facultyService.getEnrolledStudents(selectedSubject);
        setStudents(studentList);
        
        // Initialize default attendance (all present by default)
        const initAtt = {};
        const initMarks = {};
        studentList.forEach((s) => {
          initAtt[s.rollNumber] = true;
          initMarks[s.rollNumber] = 27; // realistic baseline default
        });
        setAttStatus(initAtt);
        setMarksData(initMarks);
      } catch (err) {
        setStudents([]);
        setError(`Could not load the student list. ${errorMessage(err)}`);
      }
    }
    loadStudents();
  }, [selectedSubject]);

  const toggleStudentAttendance = (roll) => {
    setAttStatus((prev) => ({ ...prev, [roll]: !prev[roll] }));
  };

  const markAll = (present) => {
    const updated = {};
    students.forEach((s) => {
      updated[s.rollNumber] = present;
    });
    setAttStatus(updated);
  };

  const handleAttendanceSubmit = async (e) => {
    e.preventDefault();
    setSubmittingAtt(true);
    setAttSuccessMsg(null);
    setError('');
    try {
      const payload = {
        subjectCode: selectedSubject,
        date: attendanceDate,
        timeSlot: timeSlot,
        topicCovered: topicCovered,
        attendanceList: students.map((s) => ({
          rollNumber: s.rollNumber,
          present: attStatus[s.rollNumber] ?? true
        }))
      };
      const res = await facultyService.submitAttendance(payload);
      setAttSuccessMsg(`Attendance saved: ${res.presentCount} Present, ${res.absentCount} Absent out of ${res.recordedCount} scholars.`);
      setTimeout(() => setAttSuccessMsg(null), 5000);
    } catch (err) {
      setError(`Attendance was NOT saved. ${errorMessage(err)}`);
    } finally {
      setSubmittingAtt(false);
    }
  };

  const handleMarksSubmit = async (e) => {
    e.preventDefault();
    setSubmittingMarks(true);
    setMarksSuccessMsg(null);
    setError('');
    try {
      const payload = {
        subjectCode: selectedSubject,
        examType: examType,
        maxMarks: maxMarks,
        marksList: students.map((s) => ({
          rollNumber: s.rollNumber,
          marksObtained: parseFloat(marksData[s.rollNumber] || 0)
        }))
      };
      const res = await facultyService.submitMarks(payload);
      setMarksSuccessMsg(`Successfully recorded ${examType} marks for ${res.updatedCount || students.length} scholars.`);
      setTimeout(() => setMarksSuccessMsg(null), 5000);
    } catch (err) {
      setError(`Marks were NOT saved. ${errorMessage(err)}`);
    } finally {
      setSubmittingMarks(false);
    }
  };

  const presentCount = Object.values(attStatus).filter(Boolean).length;
  const absentCount = students.length - presentCount;

  return (
    <div>
      {/* Faculty Header */}
      <div style={{ marginBottom: '28px' }}>
        <div className="eyebrow-pill" style={{ marginBottom: '8px' }}>FACULTY INSTRUCTION DESK</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 className="heading-lg" style={{ fontSize: '32px' }}>Welcome, {user?.name || user?.username}</h1>
            <div style={{ fontSize: '13px', color: 'var(--color-slate-600)', marginTop: '4px' }}>
              Faculty ID: <strong>{user?.username}</strong> • Department of Computer Science & Engineering
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <span className="eyebrow-pill" style={{ backgroundColor: 'var(--color-paper)' }}>Autonomous Academic Board</span>
            <span className="eyebrow-pill" style={{ backgroundColor: 'var(--color-paper)' }}>Academic Year 2026–2027</span>
          </div>
        </div>
      </div>

      {error && <ErrorState message={error} />}

      {/* Assigned Classes Grid */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', color: 'var(--color-slate-700)', marginBottom: '14px' }}>
          Assigned Course Cohorts
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
          {classes.map((cls) => {
            const isSelected = selectedSubject === cls.courseCode;
            return (
              <div 
                key={cls.courseCode}
                className="card-paper"
                style={{
                  cursor: 'pointer',
                  borderLeft: isSelected ? '4px solid var(--color-vermillion-signal)' : '1px solid var(--color-frost)',
                  backgroundColor: isSelected ? 'rgba(255, 255, 255, 0.95)' : 'var(--color-paper)',
                  padding: '20px'
                }}
                onClick={() => setSelectedSubject(cls.courseCode)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="eyebrow-pill">{cls.courseCode}</span>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-slate-900)' }}>
                    Sem {cls.semester} • Sec {cls.section}
                  </span>
                </div>
                <h3 style={{ fontSize: '17px', fontWeight: 600, color: 'var(--color-slate-900)', marginTop: '10px' }}>
                  {cls.courseName}
                </h3>
                <div style={{ fontSize: '13px', color: 'var(--color-slate-600)', marginTop: '8px' }}>
                  • Enrolled: <strong>{cls.totalStudents ?? '—'} Scholars</strong>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mode Sub-Tabs: Attendance vs Marks Entry */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        <button
          id="faculty-tab-attendance"
          data-testid="faculty-tab-attendance"
          onClick={() => setActiveTab('attendance')}
          style={{
            padding: '10px 18px',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-cloud)',
            background: activeTab === 'attendance' ? 'var(--color-carbon)' : 'var(--color-paper)',
            color: activeTab === 'attendance' ? '#fff' : 'var(--color-slate-700)',
            fontWeight: 600,
            fontSize: '13px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <CheckCircle size={16} /> Mark Class Attendance
        </button>
        <button
          id="faculty-tab-marks"
          data-testid="faculty-tab-marks"
          onClick={() => setActiveTab('marks')}
          style={{
            padding: '10px 18px',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-cloud)',
            background: activeTab === 'marks' ? 'var(--color-carbon)' : 'var(--color-paper)',
            color: activeTab === 'marks' ? '#fff' : 'var(--color-slate-700)',
            fontWeight: 600,
            fontSize: '13px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Award size={16} /> Enter Internal Marks
        </button>
      </div>

      {/* TAB 1: ATTENDANCE DISPATCH PANEL */}
      {activeTab === 'attendance' && (
        <div className="card-paper" style={{ padding: '32px' }}>
          <form onSubmit={handleAttendanceSubmit}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
              <div>
                <h3 className="heading-sm">
                  Attendance Register: {selectedSubject}
                </h3>
                <div style={{ fontSize: '13px', color: 'var(--color-slate-600)', marginTop: '4px' }}>
                  Batch: 2023–2027 • Section A • Active Roster: {students.length} Students
                </div>
              </div>

              {/* Attendance Quick Controls */}
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <button
                  type="button"
                  onClick={() => markAll(true)}
                  style={{
                    background: 'var(--color-paper)',
                    border: '1px solid var(--color-cloud)',
                    padding: '6px 12px',
                    borderRadius: 'var(--radius-lg)',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Mark All Present
                </button>
                <button
                  type="button"
                  onClick={() => markAll(false)}
                  style={{
                    background: 'var(--color-paper)',
                    border: '1px solid var(--color-cloud)',
                    padding: '6px 12px',
                    borderRadius: 'var(--radius-lg)',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Mark All Absent
                </button>
                <div style={{
                  padding: '6px 14px',
                  background: 'var(--color-vellum)',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: '12px',
                  fontWeight: 600
                }}>
                  Present: <span style={{ color: 'var(--color-success)' }}>{presentCount}</span> | Absent: <span style={{ color: 'var(--color-danger)' }}>{absentCount}</span>
                </div>
              </div>
            </div>

            {/* Session Parameters */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
              padding: '20px',
              backgroundColor: 'var(--color-vellum)',
              borderRadius: 'var(--radius-lg)',
              marginBottom: '24px'
            }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', marginBottom: '6px' }}>Date</label>
                <input
                  type="date"
                  value={attendanceDate}
                  onChange={(e) => setAttendanceDate(e.target.value)}
                  className="input-field"
                  style={{ background: '#fff' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', marginBottom: '6px' }}>Time Slot</label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="input-field"
                  style={{ background: '#fff' }}
                >
                  <option value="09:30 - 10:30">09:30 - 10:30 AM</option>
                  <option value="10:30 - 11:30">10:30 - 11:30 AM</option>
                  <option value="11:45 - 12:45">11:45 - 12:45 PM</option>
                  <option value="01:30 - 04:30">01:30 - 04:30 PM (Lab)</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', marginBottom: '6px' }}>Topic Covered</label>
                <input
                  type="text"
                  value={topicCovered}
                  onChange={(e) => setTopicCovered(e.target.value)}
                  placeholder="Lecture topic..."
                  className="input-field"
                  style={{ background: '#fff' }}
                />
              </div>
            </div>

            {/* Success message banner */}
            {attSuccessMsg && (
              <div style={{
                padding: '14px 18px',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'rgba(2, 122, 72, 0.1)',
                border: '1px solid var(--color-success)',
                color: 'var(--color-success)',
                fontSize: '14px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '20px'
              }}>
                <CheckCircle2 size={18} /> {attSuccessMsg}
              </div>
            )}

            {/* Interactive Student Roster Table */}
            <div style={{ overflowX: 'auto', maxHeight: '420px', marginBottom: '24px', border: '1px solid var(--color-frost)', borderRadius: 'var(--radius-lg)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                <thead style={{ position: 'sticky', top: 0, backgroundColor: '#ffffff', zIndex: 1, borderBottom: '2px solid var(--color-slate-900)' }}>
                  <tr>
                    <th style={{ padding: '12px 16px' }}>Roll Number</th>
                    <th style={{ padding: '12px 16px' }}>Student Full Name</th>
                    <th style={{ padding: '12px 16px' }}>Section</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center' }}>Attendance Toggle</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((s) => {
                    const isPresent = attStatus[s.rollNumber] ?? true;
                    return (
                      <tr 
                        key={s.rollNumber} 
                        style={{ 
                          borderBottom: '1px solid var(--color-frost)',
                          backgroundColor: isPresent ? '#ffffff' : 'rgba(228, 43, 12, 0.03)'
                        }}
                      >
                        <td style={{ padding: '12px 16px', fontWeight: 600 }}>{s.rollNumber}</td>
                        <td style={{ padding: '12px 16px' }}>{s.name}</td>
                        <td style={{ padding: '12px 16px', color: 'var(--color-slate-600)' }}>{s.section}</td>
                        <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                          <button
                            type="button"
                            onClick={() => toggleStudentAttendance(s.rollNumber)}
                            style={{
                              padding: '6px 16px',
                              borderRadius: 'var(--radius-lg)',
                              border: 'none',
                              backgroundColor: isPresent ? 'var(--color-slate-900)' : 'var(--color-vermillion-signal)',
                              color: '#ffffff',
                              fontWeight: 600,
                              fontSize: '12px',
                              cursor: 'pointer',
                              minWidth: '85px',
                              transition: 'all 0.15s ease'
                            }}
                          >
                            {isPresent ? 'PRESENT' : 'ABSENT'}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button
                type="submit"
                disabled={submittingAtt}
                className="btn-vermillion"
                style={{ padding: '12px 24px' }}
              >
                <Save size={16} style={{ marginRight: '8px' }} />
                {submittingAtt ? 'Saving Attendance...' : 'Submit & Save Attendance Session'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 2: INTERNAL MARKS ENTRY PANEL */}
      {activeTab === 'marks' && (
        <div className="card-paper" style={{ padding: '32px' }}>
          <form onSubmit={handleMarksSubmit}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
              <div>
                <h3 className="heading-sm">
                  Continuous Internal Assessment: {selectedSubject}
                </h3>
                <div style={{ fontSize: '13px', color: 'var(--color-slate-600)', marginTop: '4px' }}>
                  Enter marks for Mid-Terms or Assignments under autonomous examination regulations.
                </div>
              </div>
            </div>

            {/* Assessment Type Configuration */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
              padding: '20px',
              backgroundColor: 'var(--color-vellum)',
              borderRadius: 'var(--radius-lg)',
              marginBottom: '24px'
            }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', marginBottom: '6px' }}>Assessment Exam</label>
                <select
                  value={examType}
                  onChange={(e) => setExamType(e.target.value)}
                  className="input-field"
                  style={{ background: '#fff' }}
                >
                  <option value="MID_1">Mid-Term Assessment 1</option>
                  <option value="MID_2">Mid-Term Assessment 2</option>
                  <option value="ASSIGNMENT">Continuous Assignment & Quiz</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', marginBottom: '6px' }}>Max Prescribed Marks</label>
                <input
                  type="number"
                  value={maxMarks}
                  onChange={(e) => setMaxMarks(Number(e.target.value))}
                  className="input-field"
                  style={{ background: '#fff' }}
                />
              </div>
            </div>

            {/* Success message banner */}
            {marksSuccessMsg && (
              <div style={{
                padding: '14px 18px',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'rgba(2, 122, 72, 0.1)',
                border: '1px solid var(--color-success)',
                color: 'var(--color-success)',
                fontSize: '14px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '20px'
              }}>
                <CheckCircle2 size={18} /> {marksSuccessMsg}
              </div>
            )}

            {/* Marks Input Table */}
            <div style={{ overflowX: 'auto', maxHeight: '420px', marginBottom: '24px', border: '1px solid var(--color-frost)', borderRadius: 'var(--radius-lg)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                <thead style={{ position: 'sticky', top: 0, backgroundColor: '#ffffff', zIndex: 1, borderBottom: '2px solid var(--color-slate-900)' }}>
                  <tr>
                    <th style={{ padding: '12px 16px' }}>Roll Number</th>
                    <th style={{ padding: '12px 16px' }}>Student Full Name</th>
                    <th style={{ padding: '12px 16px' }}>Max Marks</th>
                    <th style={{ padding: '12px 16px', width: '160px' }}>Marks Obtained</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((s) => (
                    <tr key={s.rollNumber} style={{ borderBottom: '1px solid var(--color-frost)' }}>
                      <td style={{ padding: '12px 16px', fontWeight: 600 }}>{s.rollNumber}</td>
                      <td style={{ padding: '12px 16px' }}>{s.name}</td>
                      <td style={{ padding: '12px 16px', color: 'var(--color-slate-600)' }}>{maxMarks}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <input
                          type="number"
                          step="0.5"
                          min="0"
                          max={maxMarks}
                          value={marksData[s.rollNumber] ?? ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            setMarksData((prev) => ({ ...prev, [s.rollNumber]: val }));
                          }}
                          className="input-field"
                          style={{ padding: '6px 12px', fontSize: '13px' }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button
                type="submit"
                disabled={submittingMarks}
                className="btn-vermillion"
                style={{ padding: '12px 24px' }}
              >
                <Save size={16} style={{ marginRight: '8px' }} />
                {submittingMarks ? 'Posting Marks...' : 'Publish & Submit Internal Marks'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
