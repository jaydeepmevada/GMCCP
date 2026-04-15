import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';

// Layouts
import AdminLayout from './layouts/AdminLayout';
import OfficerLayout from './layouts/OfficerLayout';

// Common Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

// Auth Components
import ProtectedRoute from './components/auth/ProtectedRoute';
import RoleRoute from './components/auth/RoleRoute';

// Public Pages
import Home from './pages/public/Home';
import Login from './pages/public/Login';
import Signup from './pages/public/Signup';
import PublicFeedbacks from './pages/public/PublicFeedbacks';
import Unauthorized from './pages/public/Unauthorized';
import NotFound from './pages/public/NotFound';

// Citizen Pages
import CitizenDashboard from './pages/citizen/CitizenDashboard';
import SubmitComplaint from './pages/citizen/SubmitComplaint';
import ComplaintDetail from './pages/citizen/ComplaintDetail';
import TrackComplaint from './pages/citizen/TrackComplaint';
import Profile from './pages/citizen/Profile';
import Support from './pages/citizen/Support';
import Feedback from './pages/citizen/Feedback';

// Officer Pages
import OfficerDashboard from './pages/officer/OfficerDashboard';
import OfficerComplaints from './pages/officer/OfficerComplaints';
import OfficerComplaintDetail from './pages/officer/OfficerComplaintDetail';
import OfficerReports from './pages/officer/OfficerReports';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageUsers from './pages/admin/ManageUsers';
import ManageComplaints from './pages/admin/ManageComplaints';
import AdminComplaintDetail from './pages/admin/AdminComplaintDetail';
import ManageCategories from './pages/admin/ManageCategories';
import ManageDepartments from './pages/admin/ManageDepartments';
import GenerateReports from './pages/admin/GenerateReports';
import ManageSupport from './pages/admin/ManageSupport';
import ManageFeedbacks from './pages/admin/ManageFeedbacks';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
}

function AppContent() {
  const { pathname } = useLocation();
  const isPanelRoute = pathname.startsWith('/admin') || pathname.startsWith('/officer');

  return (
    <>
      <ScrollToTop />

      <div className="min-h-screen flex flex-col bg-gray-950">
        <Navbar />

        <main className="flex-1">
          <Routes>
            {/* ===== PUBLIC ROUTES ===== */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/feedbacks" element={<PublicFeedbacks />} />
            <Route path="/track-complaint" element={<TrackComplaint />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* ===== CITIZEN ROUTES ===== */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <CitizenDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/submit-complaint"
              element={
                <ProtectedRoute>
                  <SubmitComplaint />
                </ProtectedRoute>
              }
            />
            <Route
              path="/complaints/:id"
              element={
                <ProtectedRoute>
                  <ComplaintDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/support"
              element={
                <ProtectedRoute>
                  <Support />
                </ProtectedRoute>
              }
            />
            <Route
              path="/feedback"
              element={
                <ProtectedRoute>
                  <Feedback />
                </ProtectedRoute>
              }
            />

            {/* ===== OFFICER ROUTES ===== */}
            <Route
              path="/officer"
              element={
                <RoleRoute roles={['officer']}>
                  <OfficerLayout />
                </RoleRoute>
              }
            >
              <Route index element={<OfficerDashboard />} />
              <Route path="complaints" element={<OfficerComplaints />} />
              <Route path="complaints/:id" element={<OfficerComplaintDetail />} />
              <Route path="reports" element={<OfficerReports />} />
            </Route>

            {/* ===== ADMIN ROUTES ===== */}
            <Route
              path="/admin"
              element={
                <RoleRoute roles={['admin']}>
                  <AdminLayout />
                </RoleRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<ManageUsers />} />
              <Route path="complaints" element={<ManageComplaints />} />
              <Route path="complaints/:id" element={<AdminComplaintDetail />} />
              <Route path="categories" element={<ManageCategories />} />
              <Route path="departments" element={<ManageDepartments />} />
              <Route path="reports" element={<GenerateReports />} />
              <Route path="support" element={<ManageSupport />} />
              <Route path="feedbacks" element={<ManageFeedbacks />} />
            </Route>

            {/* ===== 404 ===== */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer className={isPanelRoute ? 'lg:ml-64' : ''} />
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#1f2937',
              color: '#f9fafb',
              borderRadius: '16px',
              padding: '14px 20px',
              fontSize: '14px',
              fontWeight: '500',
              boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)',
            },
            success: {
              style: {
                background: '#065f46',
              },
              iconTheme: {
                primary: '#34d399',
                secondary: '#065f46',
              },
            },
            error: {
              style: {
                background: '#991b1b',
              },
              iconTheme: {
                primary: '#fca5a5',
                secondary: '#991b1b',
              },
            },
          }}
        />
      </AuthProvider>
    </Router>
  );
}

export default App;
