import api from './api';
import { mockOr } from './mock';

const MOCK_DEPARTMENTS = [
  {
    id: 1,
    code: 'CSE',
    name: 'Computer Science and Engineering',
    establishedYear: 1984,
    hodName: 'Dr. A. Kavitha',
    hodEmail: 'hod.cse@ucest.edu',
    intake: 60,
    featured: true,
    description: 'Premier department specializing in AI/ML, Cloud Systems, Distributed Architecture, and Cybersecurity. Fully equipped research laboratories with high-performance GPU clusters.'
  },
  {
    id: 2,
    code: 'ECE',
    name: 'Electronics & Communication Engineering',
    establishedYear: 1973,
    hodName: 'Dr. M. Venkat Rao',
    hodEmail: 'hod.ece@ucest.edu',
    intake: 60,
    featured: false,
    description: 'Centers of excellence in VLSI Design, Embedded Signal Processing, IoT Telecommunications, and Optical Fiber Communications.'
  },
  {
    id: 3,
    code: 'EEE',
    name: 'Electrical & Electronics Engineering',
    establishedYear: 1965,
    hodName: 'Dr. K. S. Reddy',
    hodEmail: 'hod.eee@ucest.edu',
    intake: 60,
    featured: false,
    description: 'Specializations in Smart Grid Power Distribution, Renewable Energy Storage, High Voltage Engineering, and Power Electronic Converters.'
  },
  {
    id: 4,
    code: 'ME',
    name: 'Mechanical Engineering',
    establishedYear: 1965,
    hodName: 'Dr. G. Satyanarayana',
    hodEmail: 'hod.me@ucest.edu',
    intake: 60,
    featured: false,
    description: 'Advanced laboratories for Thermal Turbo-machinery, Mechatronics, Rapid Prototyping, and Finite Element Computational Modeling.'
  },
  {
    id: 5,
    code: 'CE',
    name: 'Civil Engineering',
    establishedYear: 1965,
    hodName: 'Dr. P. Ravinder',
    hodEmail: 'hod.ce@ucest.edu',
    intake: 60,
    featured: false,
    description: 'Pioneering research in Structural Dynamics, Geotechnical Foundations, Environmental Hydraulics, and GIS Urban Transport.'
  },
  {
    id: 6,
    code: 'MET',
    name: 'Metallurgical Engineering',
    establishedYear: 1980,
    hodName: 'Dr. B. Ramesh',
    hodEmail: 'hod.met@ucest.edu',
    intake: 30,
    featured: false,
    description: 'Specialized in Physical Metallurgy, Nano-materials, Extractive Synthesis, and Non-Destructive Testing.'
  }
];

export const departmentService = {
  async getDepartments() {
    try {
      const response = await api.get('/public/departments');
      return response.data;
    } catch (err) {
      return mockOr(err, MOCK_DEPARTMENTS);
    }
  },

  async getDepartmentByCode(code) {
    try {
      const response = await api.get(`/public/departments/${code}`);
      return response.data;
    } catch (err) {
      return mockOr(err, () => MOCK_DEPARTMENTS.find(d => d.code.toLowerCase() === code.toLowerCase()) || MOCK_DEPARTMENTS[0]);
    }
  }
};
