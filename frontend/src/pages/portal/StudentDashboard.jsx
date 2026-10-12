import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  CheckCircle, 
  AlertTriangle, 
  Award, 
  Clock, 
  CreditCard, 
  Calendar,
  BookOpen,
  DollarSign,
  Download,
  CheckCircle2,
  X
} from 'lucide-react';
import { studentService } from '../../services/studentService';
import { errorMessage } from '../../services/mock';
import ErrorState from '../../components/ErrorState';

export default function StudentDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview'); // overview, attendance, results, timetable, fees
  const [dashboard, setDashboard] = useState(null);
  const [attendance, setAttendance] = useState(null);
  const [results, setResults] = useState(null);
  const [selectedSem, setSelectedSem] = useState(4);
  const [timetable, setTimetable] = useState([]);
  const [fees, setFees] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [reloadKey, setReloadKey] = useState(0);
  const [paymentError, setPaymentError] = useState('');

  // Pay fee modal state
  const [showPayModal, setShowPayModal] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('35000');
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [receiptGenerated, setReceiptGenerated] = useState(null);

  useEffect(() => {
    async function loadAllData() {
      setLoading(true);
      setLoadError('');
      try {
        const [dashRes, attRes, resRes, ttRes, feeRes] = await Promise.all([
          studentService.getDashboard(),
          studentService.getAttendance(),
          studentService.getResults(selectedSem),
          studentService.getTimetable(),
          studentService.getFees()
        ]);
        setDashboard(dashRes);
        setAttendance(attRes);
        setResults(resRes);
        setTimetable(ttRes);
        setFees(feeRes);
      } catch (err) {
        setLoadError(`Could not load your student data. ${errorMessage(err)}`);
      } finally {
        setLoading(false);
      }
    }
    loadAllData();
  }, [selectedSem, reloadKey]);

  const handlePayFee = async (e) => {
    e.preventDefault();
    setPaymentProcessing(true);
    setPaymentError('');
    try {
      const updatedFees = await studentService.payFee({
        amount: parseFloat(paymentAmount),
        paymentMode: 'ONLINE'
      });
      setFees(updatedFees);
      setReceiptGenerated(updatedFees.transactions[0]);
    } catch (err) {
      setPaymentError(`Payment was not recorded. ${errorMessage(err)}`);
    } finally {
      setPaymentProcessing(false);
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'attendance', label: 'Attendance Ledger', icon: CheckCircle },
    { id: 'results', label: 'Results & Grade Card', icon: Award },
    { id: 'timetable', label: 'Weekly Timetable', icon: Calendar },
    { id: 'fees', label: 'Fees & Accounts', icon: CreditCard },
  ];

  if (loading && !dashboard) {
    return (
      <div className="card-paper" style={{ padding: '40px', textAlign: 'center', color: 'var(--color-slate-600)' }}>
        Loading student command desk...
      </div>
    );
  }

  if (loadError) {
    return <ErrorState message={loadError} onRetry={() => setReloadKey((k) => k + 1)} />;
  }

  const rollNumber = dashboard?.rollNumber || user?.username;
  const studentName = dashboard?.name || user?.name || user?.username;
  const overallAtt = attendance?.overallPercentage ?? dashboard?.overallAttendancePercentage ?? 0;

  return (
    <div>
      {/* Top Banner Overview */}
      <div style={{ marginBottom: '28px' }}>
        <div className="eyebrow-pill" style={{ marginBottom: '8px' }}>STUDENT COMMAND DECK</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 className="heading-lg" style={{ fontSize: '32px' }}>Welcome, {studentName}</h1>
            <div style={{ fontSize: '13px', color: 'var(--color-slate-600)', marginTop: '4px' }}>
              Roll Number: <strong>{rollNumber}</strong> • Semester V • Department of Computer Science & Engineering
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <span className="eyebrow-pill" style={{ backgroundColor: 'var(--color-paper)' }}>Batch 2023–2027</span>
            <span className="eyebrow-pill" style={{ backgroundColor: 'var(--color-paper)' }}>Section A</span>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div style={{
        display: 'flex',
        gap: '8px',
        borderBottom: '1px solid var(--color-frost)',
        paddingBottom: '12px',
        marginBottom: '28px',
        overflowX: 'auto'
      }}>
        {tabs.map((t) => {
          const Icon = t.icon;
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              id={`tab-${t.id}`}
              data-testid={`tab-${t.id}`}
              onClick={() => setActiveTab(t.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 16px',
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
          {/* Metric Cards Row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '32px' }}>
            {/* Attendance Metric */}
            <div className="card-paper" style={{ padding: '24px' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-slate-600)', textTransform: 'uppercase' }}>
                Cumulative Attendance
              </div>
              <div style={{ fontSize: '36px', fontWeight: 300, color: 'var(--color-slate-900)', marginTop: '8px', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                {overallAtt}%
                <span style={{ fontSize: '12px', fontWeight: 600, color: overallAtt >= 75 ? 'var(--color-success)' : 'var(--color-danger)' }}>
                  {overallAtt >= 75 ? 'ELIGIBLE' : 'CONDONATION NEEDED'}
                </span>
              </div>
              <div style={{ fontSize: '12px', color: 'var(--color-iron)', marginTop: '4px' }}>
                Conducted: {attendance?.totalClassesConducted ?? '—'} • Attended: {attendance?.totalClassesAttended ?? '—'}
              </div>
            </div>

            {/* CGPA Metric */}
            <div className="card-paper" style={{ padding: '24px' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-slate-600)', textTransform: 'uppercase' }}>
                Cumulative CGPA
              </div>
              <div style={{ fontSize: '36px', fontWeight: 300, color: 'var(--color-slate-900)', marginTop: '8px', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                {dashboard?.cgpa ?? '—'}
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-slate-700)' }}>OUT OF 10.0</span>
              </div>
              <div style={{ fontSize: '12px', color: 'var(--color-iron)', marginTop: '4px' }}>
                Previous Sem IV SGPA: {results?.sgpa ?? '—'}
              </div>
            </div>

            {/* Fee Status Metric */}
            <div className="card-paper" style={{ padding: '24px' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-slate-600)', textTransform: 'uppercase' }}>
                Fee Balance & Dues
              </div>
              <div style={{ fontSize: '36px', fontWeight: 300, color: 'var(--color-slate-900)', marginTop: '8px', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                ₹{fees?.pendingDue !== undefined ? fees.pendingDue : 0}
                <span style={{ fontSize: '12px', fontWeight: 600, color: (fees?.pendingDue === 0 || !fees) ? 'var(--color-success)' : 'var(--color-danger)' }}>
                  {(fees?.pendingDue === 0 || !fees) ? 'CLEARED' : 'PENDING'}
                </span>
              </div>
              <div style={{ fontSize: '12px', color: 'var(--color-iron)', marginTop: '4px' }}>
                Status: {fees?.status ?? '—'} • Academic Year 2026-27
              </div>
            </div>
          </div>

          {/* Quick Attendance Summary Table */}
          <div className="card-paper" style={{ padding: '28px', marginBottom: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 className="heading-sm">Subject Attendance Breakdown</h3>
              <button onClick={() => setActiveTab('attendance')} style={{ background: 'none', border: 'none', color: 'var(--color-vermillion-signal)', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}>
                View Full Ledger →
              </button>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--color-slate-900)' }}>
                    <th style={{ padding: '10px 12px' }}>Code</th>
                    <th style={{ padding: '10px 12px' }}>Course Title</th>
                    <th style={{ padding: '10px 12px' }}>Faculty</th>
                    <th style={{ padding: '10px 12px' }}>Attended / Conducted</th>
                    <th style={{ padding: '10px 12px' }}>Percentage</th>
                    <th style={{ padding: '10px 12px' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {(attendance?.subjects || []).slice(0, 4).map((s) => (
                    <tr key={s.subjectCode} style={{ borderBottom: '1px solid var(--color-frost)' }}>
                      <td style={{ padding: '12px', fontWeight: 600 }}>{s.subjectCode}</td>
                      <td style={{ padding: '12px' }}>{s.subjectName}</td>
                      <td style={{ padding: '12px', color: 'var(--color-slate-600)' }}>{s.facultyName}</td>
                      <td style={{ padding: '12px' }}>{s.attended} / {s.conducted}</td>
                      <td style={{ padding: '12px', fontWeight: 600 }}>{s.percentage}%</td>
                      <td style={{ padding: '12px' }}>
                        {s.warning ? (
                          <span style={{ color: 'var(--color-danger)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <AlertTriangle size={14} /> Attention (&lt;75%)
                          </span>
                        ) : (
                          <span style={{ color: 'var(--color-success)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <CheckCircle size={14} /> Good Standing
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ATTENDANCE LEDGER */}
      {activeTab === 'attendance' && (
        <div>
          <div className="card-paper" style={{ padding: '32px', marginBottom: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <h3 className="heading-sm">Semester V Master Attendance Ledger</h3>
                <p style={{ fontSize: '13px', color: 'var(--color-slate-600)', marginTop: '4px' }}>
                  Statutory University Requirement: Minimum 75% aggregate attendance is mandatory for semester end examination hall ticket issuance.
                </p>
              </div>
              <div style={{
                background: overallAtt >= 75 ? 'rgba(2, 122, 72, 0.1)' : 'rgba(228, 43, 12, 0.1)',
                padding: '12px 20px',
                borderRadius: 'var(--radius-lg)',
                border: `1px solid ${overallAtt >= 75 ? 'var(--color-success)' : 'var(--color-vermillion-signal)'}`,
                textAlign: 'right'
              }}>
                <div style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', color: overallAtt >= 75 ? 'var(--color-success)' : 'var(--color-vermillion-signal)' }}>
                  Aggregate Attendance
                </div>
                <div style={{ fontSize: '24px', fontWeight: 600, color: 'var(--color-slate-900)' }}>
                  {overallAtt}%
                </div>
              </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--color-slate-900)' }}>
                    <th style={{ padding: '12px 14px' }}>Subject Code</th>
                    <th style={{ padding: '12px 14px' }}>Subject Name</th>
                    <th style={{ padding: '12px 14px' }}>Faculty In-Charge</th>
                    <th style={{ padding: '12px 14px' }}>Conducted</th>
                    <th style={{ padding: '12px 14px' }}>Attended</th>
                    <th style={{ padding: '12px 14px' }}>Percentage</th>
                    <th style={{ padding: '12px 14px' }}>Detention Warning</th>
                  </tr>
                </thead>
                <tbody>
                  {(attendance?.subjects || []).map((s) => (
                    <tr key={s.subjectCode} style={{ borderBottom: '1px solid var(--color-frost)' }}>
                      <td style={{ padding: '14px', fontWeight: 600 }}>{s.subjectCode}</td>
                      <td style={{ padding: '14px' }}>{s.subjectName}</td>
                      <td style={{ padding: '14px', color: 'var(--color-slate-600)' }}>{s.facultyName}</td>
                      <td style={{ padding: '14px' }}>{s.conducted}</td>
                      <td style={{ padding: '14px' }}>{s.attended}</td>
                      <td style={{ padding: '14px', fontWeight: 600 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span>{s.percentage}%</span>
                          <div style={{ width: '60px', height: '6px', background: 'var(--color-vellum)', borderRadius: '3px', overflow: 'hidden' }}>
                            <div style={{
                              width: `${Math.min(100, s.percentage)}%`,
                              height: '100%',
                              backgroundColor: s.percentage >= 75 ? 'var(--color-slate-900)' : 'var(--color-vermillion-signal)'
                            }} />
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '14px' }}>
                        {s.warning ? (
                          <span style={{ color: 'var(--color-danger)', fontWeight: 600, fontSize: '12px' }}>
                            ⚠ Detention Risk (Need {Math.ceil((0.75 * s.conducted - s.attended) / 0.25)} consecutive classes)
                          </span>
                        ) : (
                          <span style={{ color: 'var(--color-success)', fontWeight: 600, fontSize: '12px' }}>
                            ✓ Secure (&gt;75%)
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: RESULTS & GRADE CARD */}
      {activeTab === 'results' && (
        <div>
          <div className="card-paper" style={{ padding: '32px', marginBottom: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <h3 className="heading-sm">Semester Grade Sheet & Autonomous Transcript</h3>
                <p style={{ fontSize: '13px', color: 'var(--color-slate-600)', marginTop: '4px' }}>
                  Official evaluation record endorsed by Controller of Examinations.
                </p>
              </div>

              {/* Semester Selector */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-slate-700)' }}>Select Semester:</span>
                {[1, 2, 3, 4].map((sem) => (
                  <button
                    key={sem}
                    onClick={() => setSelectedSem(sem)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: 'var(--radius-lg)',
                      border: '1px solid var(--color-cloud)',
                      background: selectedSem === sem ? 'var(--color-carbon)' : 'var(--color-paper)',
                      color: selectedSem === sem ? '#fff' : 'var(--color-slate-700)',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    Sem {sem}
                  </button>
                ))}
              </div>
            </div>

            {/* GPA Summary Strip */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '16px',
              padding: '20px',
              backgroundColor: 'var(--color-vellum)',
              borderRadius: 'var(--radius-lg)',
              marginBottom: '24px'
            }}>
              <div>
                <div style={{ fontSize: '12px', color: 'var(--color-slate-600)', textTransform: 'uppercase' }}>Semester Evaluated</div>
                <div style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-slate-900)' }}>Semester {selectedSem}</div>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: 'var(--color-slate-600)', textTransform: 'uppercase' }}>Semester SGPA</div>
                <div style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-vermillion-signal)' }}>{results?.sgpa ?? '—'}</div>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: 'var(--color-slate-600)', textTransform: 'uppercase' }}>Cumulative CGPA</div>
                <div style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-slate-900)' }}>{results?.cgpa ?? '—'}</div>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: 'var(--color-slate-600)', textTransform: 'uppercase' }}>Credits Earned</div>
                <div style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-slate-900)' }}>{results?.creditsEarned ?? '—'}</div>
              </div>
            </div>

            {/* Grade Card Table */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--color-slate-900)' }}>
                    <th style={{ padding: '12px 14px' }}>Course Code</th>
                    <th style={{ padding: '12px 14px' }}>Course Title</th>
                    <th style={{ padding: '12px 14px' }}>Credits</th>
                    <th style={{ padding: '12px 14px' }}>Letter Grade</th>
                    <th style={{ padding: '12px 14px' }}>Grade Points</th>
                    <th style={{ padding: '12px 14px' }}>Result Status</th>
                  </tr>
                </thead>
                <tbody>
                  {(results?.grades || []).map((g) => (
                    <tr key={g.subjectCode} style={{ borderBottom: '1px solid var(--color-frost)' }}>
                      <td style={{ padding: '14px', fontWeight: 600 }}>{g.subjectCode}</td>
                      <td style={{ padding: '14px' }}>{g.subjectName}</td>
                      <td style={{ padding: '14px' }}>{g.credits}</td>
                      <td style={{ padding: '14px', fontWeight: 700, color: 'var(--color-slate-900)' }}>{g.grade}</td>
                      <td style={{ padding: '14px' }}>{g.gradePoints}</td>
                      <td style={{ padding: '14px' }}>
                        <span style={{
                          padding: '3px 8px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontWeight: 600,
                          backgroundColor: g.status === 'PASS' ? 'rgba(2, 122, 72, 0.1)' : 'rgba(228, 43, 12, 0.1)',
                          color: g.status === 'PASS' ? 'var(--color-success)' : 'var(--color-danger)'
                        }}>
                          {g.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: WEEKLY TIMETABLE */}
      {activeTab === 'timetable' && (
        <div>
          <div className="card-paper" style={{ padding: '32px', marginBottom: '32px' }}>
            <div style={{ marginBottom: '24px' }}>
              <h3 className="heading-sm">Weekly Master Schedule (Sem V - Section A)</h3>
              <p style={{ fontSize: '13px', color: 'var(--color-slate-600)', marginTop: '4px' }}>
                Academic Year 2026–2027 • Classroom: CSE Lecture Hall 201 • Systems Lab-2
              </p>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--color-slate-900)' }}>
                    <th style={{ padding: '12px 14px' }}>Day of Week</th>
                    <th style={{ padding: '12px 14px' }}>Time Slot</th>
                    <th style={{ padding: '12px 14px' }}>Course Code</th>
                    <th style={{ padding: '12px 14px' }}>Subject Title</th>
                    <th style={{ padding: '12px 14px' }}>Faculty In-Charge</th>
                    <th style={{ padding: '12px 14px' }}>Venue / Room</th>
                  </tr>
                </thead>
                <tbody>
                  {timetable.map((tt) => (
                    <tr key={tt.id} style={{ borderBottom: '1px solid var(--color-frost)' }}>
                      <td style={{ padding: '14px', fontWeight: 600 }}>{tt.dayOfWeek}</td>
                      <td style={{ padding: '14px', color: 'var(--color-slate-700)' }}>{tt.timeSlot}</td>
                      <td style={{ padding: '14px', fontWeight: 600 }}>{tt.courseCode}</td>
                      <td style={{ padding: '14px' }}>{tt.courseName}</td>
                      <td style={{ padding: '14px', color: 'var(--color-slate-600)' }}>{tt.facultyName}</td>
                      <td style={{ padding: '14px' }}>
                        <span className="eyebrow-pill" style={{ padding: '2px 8px', fontSize: '11px' }}>
                          {tt.roomNumber}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: FEES & ACCOUNTS */}
      {activeTab === 'fees' && (
        <div>
          {/* Fee Balance Banner */}
          <div className="card-paper" style={{ padding: '32px', marginBottom: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', marginBottom: '28px' }}>
              <div>
                <h3 className="heading-sm">Academic Fee Account Statement</h3>
                <p style={{ fontSize: '13px', color: 'var(--color-slate-600)', marginTop: '4px' }}>
                  Autonomous Tuition, Examination & Lab Facilities Fee Account
                </p>
              </div>

              {fees?.pendingDue > 0 ? (
                <button className="btn-vermillion" onClick={() => setShowPayModal(true)}>
                  <CreditCard size={16} style={{ marginRight: '8px' }} /> Pay Tuition Dues Now
                </button>
              ) : (
                <button className="btn-carbon" onClick={() => setShowPayModal(true)}>
                  Make Advance / Special Fee Payment
                </button>
              )}
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '20px',
              padding: '24px',
              backgroundColor: 'var(--color-vellum)',
              borderRadius: 'var(--radius-lg)'
            }}>
              <div>
                <div style={{ fontSize: '12px', color: 'var(--color-slate-600)', textTransform: 'uppercase' }}>Total Prescribed Fee</div>
                <div style={{ fontSize: '28px', fontWeight: 300, color: 'var(--color-slate-900)', marginTop: '4px' }}>
                  ₹{fees?.totalAcademicFee ?? '—'}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: 'var(--color-slate-600)', textTransform: 'uppercase' }}>Amount Paid</div>
                <div style={{ fontSize: '28px', fontWeight: 300, color: 'var(--color-success)', marginTop: '4px' }}>
                  ₹{fees?.amountPaid ?? '—'}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: 'var(--color-slate-600)', textTransform: 'uppercase' }}>Balance Due</div>
                <div style={{ fontSize: '28px', fontWeight: 300, color: (fees?.pendingDue > 0) ? 'var(--color-danger)' : 'var(--color-slate-900)', marginTop: '4px' }}>
                  ₹{fees?.pendingDue || 0}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: 'var(--color-slate-600)', textTransform: 'uppercase' }}>Account Status</div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-success)', marginTop: '10px' }}>
                  {fees?.status === 'PAID' ? '✓ FULLY CLEARED' : 'PENDING'}
                </div>
              </div>
            </div>
          </div>

          {/* Payment Receipts Ledger */}
          <div className="card-paper" style={{ padding: '32px' }}>
            <h4 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '20px', color: 'var(--color-slate-900)' }}>
              Official Payment Receipts & Transactions Ledger
            </h4>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--color-slate-900)' }}>
                    <th style={{ padding: '12px 14px' }}>Receipt / Reference</th>
                    <th style={{ padding: '12px 14px' }}>Amount</th>
                    <th style={{ padding: '12px 14px' }}>Date</th>
                    <th style={{ padding: '12px 14px' }}>Payment Mode</th>
                    <th style={{ padding: '12px 14px' }}>Transaction Status</th>
                    <th style={{ padding: '12px 14px' }}>Receipt Action</th>
                  </tr>
                </thead>
                <tbody>
                  {(fees?.transactions || []).map((tx, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid var(--color-frost)' }}>
                      <td style={{ padding: '14px', fontWeight: 600 }}>{tx.receiptNo}</td>
                      <td style={{ padding: '14px', fontWeight: 600 }}>₹{tx.amount}</td>
                      <td style={{ padding: '14px', color: 'var(--color-slate-600)' }}>{tx.paymentDate}</td>
                      <td style={{ padding: '14px' }}>{tx.mode}</td>
                      <td style={{ padding: '14px' }}>
                        <span style={{
                          padding: '3px 8px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontWeight: 600,
                          backgroundColor: 'rgba(2, 122, 72, 0.1)',
                          color: 'var(--color-success)'
                        }}>
                          {tx.status}
                        </span>
                      </td>
                      <td style={{ padding: '14px' }}>
                        <button
                          onClick={() => alert(`Official Digital Receipt [${tx.receiptNo}]\nAmount: ₹${tx.amount}\nDate: ${tx.paymentDate}\nIssued by: JNTUH UCEST Finance Wing`)}
                          style={{
                            background: 'none',
                            border: '1px solid var(--color-cloud)',
                            borderRadius: 'var(--radius-lg)',
                            padding: '4px 10px',
                            fontSize: '12px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <Download size={12} /> Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* MOCK FEE PAYMENT MODAL */}
      {showPayModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div className="card-paper" style={{ maxWidth: '500px', width: '100%', padding: '32px', position: 'relative' }}>
            <button
              onClick={() => { setShowPayModal(false); setReceiptGenerated(null); }}
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-slate-600)' }}
            >
              <X size={20} />
            </button>

            {receiptGenerated ? (
              <div style={{ textAlign: 'center', padding: '16px 0' }}>
                <CheckCircle2 size={56} color="var(--color-success)" style={{ margin: '0 auto 16px auto' }} />
                <h3 className="heading-sm" style={{ marginBottom: '8px' }}>Payment Successful</h3>
                <p style={{ fontSize: '14px', color: 'var(--color-slate-600)', marginBottom: '20px' }}>
                  Official receipt has been recorded and posted to your ledger.
                </p>

                <div style={{ background: 'var(--color-vellum)', padding: '20px', borderRadius: 'var(--radius-lg)', textAlign: 'left', fontSize: '13px', lineHeight: '1.8', marginBottom: '24px' }}>
                  <div><strong>Receipt No:</strong> {receiptGenerated.receiptNo}</div>
                  <div><strong>Student Roll:</strong> {rollNumber}</div>
                  <div><strong>Amount Paid:</strong> ₹{receiptGenerated.amount}</div>
                  <div><strong>Payment Mode:</strong> {receiptGenerated.mode}</div>
                  <div><strong>Status:</strong> {receiptGenerated.status}</div>
                </div>

                <button
                  className="btn-vermillion"
                  style={{ width: '100%' }}
                  onClick={() => { setShowPayModal(false); setReceiptGenerated(null); }}
                >
                  Return to Dashboard
                </button>
              </div>
            ) : (
              <form onSubmit={handlePayFee}>
                <h3 className="heading-sm" style={{ marginBottom: '8px' }}>Simulate Fee Payment</h3>
                <p style={{ fontSize: '13px', color: 'var(--color-slate-600)', marginBottom: '24px' }}>
                  Autonomous University Gateway (State Bank of India / HDFC e-Pay Simulation)
                </p>

                {paymentError && <ErrorState message={paymentError} />}

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', marginBottom: '6px', color: 'var(--color-slate-700)' }}>
                    Payment Amount (INR)
                  </label>
                  <input
                    type="number"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                    required
                    className="input-field"
                  />
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', marginBottom: '6px', color: 'var(--color-slate-700)' }}>
                    Select Payment Gateway
                  </label>
                  <select className="input-field">
                    <option value="SBI">State Bank of India Multi-Option Payment (MOPS)</option>
                    <option value="HDFC">HDFC Bank Direct NetBanking</option>
                    <option value="UPI">Unified Payments Interface (UPI / QR Code)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={paymentProcessing}
                  className="btn-vermillion"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  {paymentProcessing ? 'Processing Transaction...' : `Confirm & Pay ₹${paymentAmount}`}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
