import api from './api';
import { mockOr } from './mock';

const MOCK_STUDENT_DASHBOARD = {
  rollNumber: '23011A0501',
  name: 'A. Rahul Sharma',
  branch: 'CSE',
  semester: 5,
  overallAttendancePercentage: 88.5,
  cgpa: 8.92,
  pendingFeeAmount: 0.0,
  recentNoticesCount: 6
};

const MOCK_ATTENDANCE = {
  overallPercentage: 88.5,
  totalClassesConducted: 240,
  totalClassesAttended: 212,
  subjects: [
    {
      subjectCode: 'CS501PC',
      subjectName: 'Database Management Systems',
      facultyName: 'Mr. P. Vijay Kumar',
      conducted: 48,
      attended: 44,
      percentage: 91.6,
      warning: false
    },
    {
      subjectCode: 'CS502PC',
      subjectName: 'Formal Languages & Automata Theory',
      facultyName: 'Dr. K. Srinivas',
      conducted: 45,
      attended: 41,
      percentage: 91.1,
      warning: false
    },
    {
      subjectCode: 'CS503PC',
      subjectName: 'Artificial Intelligence & Neural Nets',
      facultyName: 'Dr. A. Kavitha',
      conducted: 47,
      attended: 43,
      percentage: 91.4,
      warning: false
    },
    {
      subjectCode: 'CS504PC',
      subjectName: 'Design and Analysis of Algorithms',
      facultyName: 'Mrs. S. Radhika',
      conducted: 50,
      attended: 36,
      percentage: 72.0,
      warning: true
    },
    {
      subjectCode: 'CS505PC',
      subjectName: 'Database Management Systems Lab',
      facultyName: 'Mr. P. Vijay Kumar',
      conducted: 26,
      attended: 25,
      percentage: 96.1,
      warning: false
    },
    {
      subjectCode: 'CS506PC',
      subjectName: 'Advanced UI Frameworks Lab',
      facultyName: 'Mrs. S. Radhika',
      conducted: 24,
      attended: 23,
      percentage: 95.8,
      warning: false
    }
  ]
};

const MOCK_RESULTS = {
  semester: 4,
  sgpa: 8.85,
  cgpa: 8.92,
  creditsEarned: 21.0,
  grades: [
    {
      subjectCode: 'CS401PC',
      subjectName: 'Discrete Mathematics',
      grade: 'O',
      gradePoints: 10,
      credits: 4.0,
      status: 'PASS'
    },
    {
      subjectCode: 'CS402PC',
      subjectName: 'Operating Systems',
      grade: 'A+',
      gradePoints: 9,
      credits: 3.0,
      status: 'PASS'
    },
    {
      subjectCode: 'CS403PC',
      subjectName: 'Computer Organization & Architecture',
      grade: 'A',
      gradePoints: 8,
      credits: 3.0,
      status: 'PASS'
    },
    {
      subjectCode: 'CS404PC',
      subjectName: 'Software Engineering',
      grade: 'A+',
      gradePoints: 9,
      credits: 3.0,
      status: 'PASS'
    },
    {
      subjectCode: 'CS405PC',
      subjectName: 'Operating Systems Lab',
      grade: 'O',
      gradePoints: 10,
      credits: 1.5,
      status: 'PASS'
    },
    {
      subjectCode: 'CS406PC',
      subjectName: 'Java Programming Lab',
      grade: 'O',
      gradePoints: 10,
      credits: 1.5,
      status: 'PASS'
    }
  ]
};

const MOCK_TIMETABLE = [
  { id: 1, dayOfWeek: 'MONDAY', timeSlot: '09:30 - 10:30', courseCode: 'CS501PC', courseName: 'Database Management Systems', facultyName: 'Mr. P. Vijay Kumar', roomNumber: 'CSE-LH-201' },
  { id: 2, dayOfWeek: 'MONDAY', timeSlot: '10:30 - 11:30', courseCode: 'CS502PC', courseName: 'Formal Languages & Automata', facultyName: 'Dr. K. Srinivas', roomNumber: 'CSE-LH-201' },
  { id: 3, dayOfWeek: 'MONDAY', timeSlot: '11:45 - 12:45', courseCode: 'CS504PC', courseName: 'Design & Analysis of Algorithms', facultyName: 'Mrs. S. Radhika', roomNumber: 'CSE-LH-201' },
  { id: 4, dayOfWeek: 'MONDAY', timeSlot: '01:30 - 04:30', courseCode: 'CS505PC', courseName: 'DBMS Lab (Batch A1)', facultyName: 'Mr. P. Vijay Kumar', roomNumber: 'Systems Lab-2' },
  { id: 5, dayOfWeek: 'TUESDAY', timeSlot: '09:30 - 10:30', courseCode: 'CS503PC', courseName: 'Artificial Intelligence', facultyName: 'Dr. A. Kavitha', roomNumber: 'CSE-LH-201' },
  { id: 6, dayOfWeek: 'TUESDAY', timeSlot: '10:30 - 11:30', courseCode: 'CS501PC', courseName: 'Database Management Systems', facultyName: 'Mr. P. Vijay Kumar', roomNumber: 'CSE-LH-201' },
  { id: 7, dayOfWeek: 'TUESDAY', timeSlot: '11:45 - 12:45', courseCode: 'CS502PC', courseName: 'Formal Languages & Automata', facultyName: 'Dr. K. Srinivas', roomNumber: 'CSE-LH-201' },
  { id: 8, dayOfWeek: 'WEDNESDAY', timeSlot: '09:30 - 10:30', courseCode: 'CS504PC', courseName: 'Design & Analysis of Algorithms', facultyName: 'Mrs. S. Radhika', roomNumber: 'CSE-LH-201' },
  { id: 9, dayOfWeek: 'WEDNESDAY', timeSlot: '10:30 - 11:30', courseCode: 'CS503PC', courseName: 'Artificial Intelligence', facultyName: 'Dr. A. Kavitha', roomNumber: 'CSE-LH-201' },
  { id: 10, dayOfWeek: 'WEDNESDAY', timeSlot: '01:30 - 04:30', courseCode: 'CS506PC', courseName: 'UI Frameworks Lab (Batch A1)', facultyName: 'Mrs. S. Radhika', roomNumber: 'Software Lab-1' },
  { id: 11, dayOfWeek: 'THURSDAY', timeSlot: '09:30 - 10:30', courseCode: 'CS501PC', courseName: 'Database Management Systems', facultyName: 'Mr. P. Vijay Kumar', roomNumber: 'CSE-LH-201' },
  { id: 12, dayOfWeek: 'THURSDAY', timeSlot: '10:30 - 11:30', courseCode: 'CS504PC', courseName: 'Design & Analysis of Algorithms', facultyName: 'Mrs. S. Radhika', roomNumber: 'CSE-LH-201' },
  { id: 13, dayOfWeek: 'FRIDAY', timeSlot: '09:30 - 10:30', courseCode: 'CS503PC', courseName: 'Artificial Intelligence', facultyName: 'Dr. A. Kavitha', roomNumber: 'CSE-LH-201' },
  { id: 14, dayOfWeek: 'FRIDAY', timeSlot: '10:30 - 11:30', courseCode: 'CS502PC', courseName: 'Formal Languages & Automata', facultyName: 'Dr. K. Srinivas', roomNumber: 'CSE-LH-201' }
];

const MOCK_FEES = {
  totalAcademicFee: 35000.0,
  amountPaid: 35000.0,
  pendingDue: 0.0,
  status: 'PAID',
  transactions: [
    {
      receiptNo: 'UCEST-2026-FEE-8891',
      amount: 35000.0,
      paymentDate: '2026-08-14',
      mode: 'ONLINE',
      status: 'SUCCESS'
    }
  ]
};

export const studentService = {
  async getDashboard() {
    try {
      const response = await api.get('/student/dashboard');
      return response.data;
    } catch (err) {
      return mockOr(err, MOCK_STUDENT_DASHBOARD);
    }
  },

  async getAttendance() {
    try {
      const response = await api.get('/student/attendance');
      return response.data;
    } catch (err) {
      return mockOr(err, MOCK_ATTENDANCE);
    }
  },

  async getResults(semester = 4) {
    try {
      const response = await api.get('/student/results', { params: { semester } });
      return response.data;
    } catch (err) {
      return mockOr(err, MOCK_RESULTS);
    }
  },

  async getTimetable() {
    try {
      const response = await api.get('/student/timetable');
      return response.data;
    } catch (err) {
      return mockOr(err, MOCK_TIMETABLE);
    }
  },

  async getFees() {
    try {
      const response = await api.get('/student/fees');
      return response.data;
    } catch (err) {
      return mockOr(err, MOCK_FEES);
    }
  },

  async payFee(data) {
    try {
      const response = await api.post('/student/fees/pay', data);
      return response.data;
    } catch (err) {
      return mockOr(err, () => {
        const newTx = {
          receiptNo: `UCEST-2026-FEE-${Math.floor(1000 + Math.random() * 9000)}`,
          amount: data.amount || 35000,
          paymentDate: new Date().toISOString().split('T')[0],
          mode: data.paymentMode || 'ONLINE',
          status: 'SUCCESS'
        };
        MOCK_FEES.amountPaid = Number(MOCK_FEES.amountPaid) + Number(newTx.amount);
        MOCK_FEES.pendingDue = Math.max(0, Number(MOCK_FEES.totalAcademicFee) - Number(MOCK_FEES.amountPaid));
        MOCK_FEES.status = MOCK_FEES.pendingDue === 0 ? 'PAID' : 'PARTIAL';
        MOCK_FEES.transactions.unshift(newTx);
        return { ...MOCK_FEES };
      });
    }
  }
};
