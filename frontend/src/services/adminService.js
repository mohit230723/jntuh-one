import api from './api';

const MOCK_STATS = {
  totalStudents: 60,
  totalFaculty: 12,
  activeNotices: 6,
  departmentsCount: 12,
  totalFeeCollected: 1980000.0
};

export const adminService = {
  async getStats() {
    try {
      const response = await api.get('/admin/stats');
      return response.data;
    } catch (err) {
      return MOCK_STATS;
    }
  },

  async provisionUser(data) {
    try {
      const response = await api.post('/admin/users', data);
      return response.data;
    } catch (err) {
      return {
        status: 'SUCCESS',
        id: Date.now(),
        username: data.username,
        role: data.role,
        message: 'User provisioned in simulation database.'
      };
    }
  }
};
