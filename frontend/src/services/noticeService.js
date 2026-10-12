import api from './api';

const MOCK_NOTICES = [
  {
    id: 1,
    title: 'Autonomous B.Tech V Semester Regular & Supplementary Examinations Schedule Released',
    category: 'EXAM',
    description: 'The Examination Branch has released the comprehensive timetable for B.Tech V Semester theory and practical examinations scheduled for November 2026. Hall tickets available on portal from Nov 5.',
    postedDate: '2026-10-10',
    pinned: true,
    author: 'Director of Evaluation'
  },
  {
    id: 2,
    title: 'AICTE / DST National Hackathon 2026 — Call for Student Project Nominations',
    category: 'EVENTS',
    description: 'UCEST Innovation Cell invites interdisciplinary team registrations for the upcoming Smart Hyderabad Hackathon. Cash prizes up to INR 2.5 Lakhs.',
    postedDate: '2026-10-08',
    pinned: true,
    author: 'Innovation Cell'
  },
  {
    id: 3,
    title: 'Mid-Term Assessment 2 Internal Marks Entry Window for Faculty Members',
    category: 'ACADEMIC',
    description: 'All faculty members are requested to complete the entry and verification of Mid-Term 2 marks on the portal before October 25, 2026.',
    postedDate: '2026-10-05',
    pinned: false,
    author: 'Dean of Academic Affairs'
  },
  {
    id: 4,
    title: 'Placement Drive: Google & Microsoft Enterprise Engineering Campus Hiring',
    category: 'GENERAL',
    description: 'Eligibility criteria: B.Tech CSE/ECE batch 2027 with CGPA >= 8.0 and no active backlogs. PPT on Oct 18 in Main Auditorium.',
    postedDate: '2026-10-02',
    pinned: false,
    author: 'Training & Placement Cell'
  },
  {
    id: 5,
    title: 'Re-evaluation & Recounting Applications for B.Tech IV Semester Results',
    category: 'EXAM',
    description: 'Candidates wishing to apply for recounting or challenge valuation must submit their online applications along with fee receipt by Oct 20.',
    postedDate: '2026-09-28',
    pinned: false,
    author: 'Exam Branch'
  },
  {
    id: 6,
    title: 'Annual Alumni Global Conclave 2026 Registration Open',
    category: 'EVENTS',
    description: 'Distinguished alumni from Silicon Valley, Bangalore, and Hyderabad convene on November 15 for mentorship panels and startup incubations.',
    postedDate: '2026-09-20',
    pinned: false,
    author: 'Alumni Relations'
  }
];

export const noticeService = {
  async getNotices(params = {}) {
    try {
      const response = await api.get('/public/notices', { params });
      return response.data;
    } catch (err) {
      console.warn('Backend unavailable, using local notices store:', err.message);
      let filtered = [...MOCK_NOTICES];
      if (params.category && params.category !== 'ALL') {
        filtered = filtered.filter(n => n.category.toUpperCase() === params.category.toUpperCase());
      }
      if (params.search) {
        const q = params.search.toLowerCase();
        filtered = filtered.filter(n => n.title.toLowerCase().includes(q) || n.description.toLowerCase().includes(q));
      }
      return {
        content: filtered,
        totalElements: filtered.length,
        totalPages: 1,
        currentPage: 0
      };
    }
  },

  async getLatestNotices() {
    try {
      const response = await api.get('/public/notices/latest');
      return response.data;
    } catch (err) {
      return MOCK_NOTICES.slice(0, 5);
    }
  },

  async getEvents() {
    try {
      const response = await api.get('/public/events');
      return response.data;
    } catch (err) {
      return MOCK_NOTICES.filter(n => n.category === 'EVENTS');
    }
  },

  async createNotice(data) {
    try {
      const response = await api.post('/admin/notices', data);
      return response.data;
    } catch (err) {
      const newNotice = {
        id: Date.now(),
        ...data,
        postedDate: new Date().toISOString().split('T')[0],
        author: data.author || 'Administration'
      };
      MOCK_NOTICES.unshift(newNotice);
      return newNotice;
    }
  },

  async updateNotice(id, data) {
    try {
      const response = await api.put(`/admin/notices/${id}`, data);
      return response.data;
    } catch (err) {
      const idx = MOCK_NOTICES.findIndex(n => n.id === id);
      if (idx !== -1) {
        MOCK_NOTICES[idx] = { ...MOCK_NOTICES[idx], ...data };
        return MOCK_NOTICES[idx];
      }
      return data;
    }
  },

  async deleteNotice(id) {
    try {
      const response = await api.delete(`/admin/notices/${id}`);
      return response.data;
    } catch (err) {
      const idx = MOCK_NOTICES.findIndex(n => n.id === id);
      if (idx !== -1) {
        MOCK_NOTICES.splice(idx, 1);
      }
      return { status: 'SUCCESS' };
    }
  }
};
