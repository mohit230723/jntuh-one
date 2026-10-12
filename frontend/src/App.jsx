import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import PortalLayout from './layouts/PortalLayout';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Academics from './pages/Academics';
import Departments from './pages/Departments';
import CseDepartment from './pages/CseDepartment';
import Admissions from './pages/Admissions';
import Examinations from './pages/Examinations';
import CampusLife from './pages/CampusLife';
import Research from './pages/Research';
import Contact from './pages/Contact';
import Login from './pages/Login';

// Portal Pages
import StudentDashboard from './pages/portal/StudentDashboard';
import FacultyDashboard from './pages/portal/FacultyDashboard';
import AdminDashboard from './pages/portal/AdminDashboard';

// Route Guard Component
function ProtectedRoute({ children, requiredRole }) {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (requiredRole && user?.role !== requiredRole) {
    if (user?.role === 'ROLE_STUDENT') return <Navigate to="/portal/student" replace />;
    if (user?.role === 'ROLE_FACULTY') return <Navigate to="/portal/faculty" replace />;
    if (user?.role === 'ROLE_ADMIN') return <Navigate to="/portal/admin" replace />;
    return <Navigate to="/" replace />;
  }
  return children;
}

export default function App() {
  const { user } = useAuth();

  const getDefaultPortal = () => {
    if (!user) return '/login';
    if (user.role === 'ROLE_STUDENT') return '/portal/student';
    if (user.role === 'ROLE_FACULTY') return '/portal/faculty';
    if (user.role === 'ROLE_ADMIN') return '/portal/admin';
    return '/';
  };

  return (
    <Routes>
      {/* 10 Public Pages */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="academics" element={<Academics />} />
        <Route path="departments" element={<Departments />} />
        <Route path="departments/cse" element={<CseDepartment />} />
        <Route path="admissions" element={<Admissions />} />
        <Route path="examinations" element={<Examinations />} />
        <Route path="campus-life" element={<CampusLife />} />
        <Route path="research" element={<Research />} />
        <Route path="contact" element={<Contact />} />
        <Route path="login" element={<Login />} />
      </Route>

      {/* Authenticated Portals */}
      <Route path="/portal" element={<ProtectedRoute><PortalLayout /></ProtectedRoute>}>
        <Route index element={<Navigate to={getDefaultPortal()} replace />} />
        
        {/* Student Routes */}
        <Route path="student" element={<ProtectedRoute requiredRole="ROLE_STUDENT"><StudentDashboard /></ProtectedRoute>} />
        <Route path="student/*" element={<ProtectedRoute requiredRole="ROLE_STUDENT"><StudentDashboard /></ProtectedRoute>} />

        {/* Faculty Routes */}
        <Route path="faculty" element={<ProtectedRoute requiredRole="ROLE_FACULTY"><FacultyDashboard /></ProtectedRoute>} />
        <Route path="faculty/*" element={<ProtectedRoute requiredRole="ROLE_FACULTY"><FacultyDashboard /></ProtectedRoute>} />

        {/* Admin Routes */}
        <Route path="admin" element={<ProtectedRoute requiredRole="ROLE_ADMIN"><AdminDashboard /></ProtectedRoute>} />
        <Route path="admin/*" element={<ProtectedRoute requiredRole="ROLE_ADMIN"><AdminDashboard /></ProtectedRoute>} />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
