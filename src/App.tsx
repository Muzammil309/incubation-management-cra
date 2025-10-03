import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { isSupabaseConfigured } from './services/supabase';

// Layout Components
import ModernDashboardLayout from './layouts/ModernDashboardLayout';

// Page Components
import LoginPage from './pages/auth/LoginPage';
import SignUpPage from './pages/auth/SignUpPage';
import IncubationDashboard from './components/dashboard/IncubationDashboard';
import StartupsPage from './pages/StartupsPage';
import MentorsPage from './pages/MentorsPage';
import AnalyticsPage from './pages/analytics/AnalyticsPage';
import EventsPage from './pages/events/EventsPage';
import InvestmentsPage from './pages/investments/InvestmentsPage';
import SettingsPage from './pages/settings/SettingsPage';

// New WowDash Pages
import ApplicationsPage from './pages/applications/ApplicationsPage';
import ResourcesPage from './pages/resources/ResourcesPage';
import FundingPage from './pages/funding/FundingPage';
import PerformancePage from './pages/performance/PerformancePage';
import DocumentsPage from './pages/documents/DocumentsPage';
import AlumniPage from './pages/alumni/AlumniPage';

// Dashboard Pages
import AttendeeDashboard from './pages/dashboards/AttendeeDashboard';
import SpeakerDashboard from './pages/dashboards/SpeakerDashboard';
import AdminDashboard from './pages/dashboards/AdminDashboard';

// UI Components
import ErrorBoundary from './components/ui/ErrorBoundary';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  // Check if demo mode is explicitly enabled via environment variable
  const isDemoMode = process.env.REACT_APP_DEMO_MODE === 'true' || !isSupabaseConfigured;

  if (loading && !isDemoMode) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  // If demo mode is enabled, allow access without authentication
  if (isDemoMode) {
    return <>{children}</>;
  }

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  return <>{children}</>;
};

// Public Route Component (redirect if authenticated)
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  // Check if demo mode is explicitly enabled via environment variable
  const isDemoMode = process.env.REACT_APP_DEMO_MODE === 'true' || !isSupabaseConfigured;

  if (loading && !isDemoMode) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  // If demo mode is enabled, redirect to dashboard
  if (isDemoMode) {
    return <Navigate to="/dashboard" replace />;
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Router>
            <div className="App">
              <Routes>
              {/* Public Routes */}
              <Route
                path="/auth/login"
                element={
                  <PublicRoute>
                    <LoginPage />
                  </PublicRoute>
                }
              />
              <Route
                path="/auth/register"
                element={
                  <PublicRoute>
                    <SignUpPage />
                  </PublicRoute>
                }
              />
              
              {/* Protected Routes */}
              <Route path="/" element={<ProtectedRoute><ModernDashboardLayout /></ProtectedRoute>}>
                <Route index element={<Navigate to="/dashboard" replace />} />
                <Route path="dashboard" element={<IncubationDashboard />} />
                <Route path="startups" element={<StartupsPage />} />
                <Route path="mentors" element={<MentorsPage />} />
                <Route path="analytics" element={<AnalyticsPage />} />
                <Route path="events" element={<EventsPage />} />
                <Route path="investments" element={<InvestmentsPage />} />
                <Route path="settings" element={<SettingsPage />} />

                {/* New Pages */}
                <Route path="applications" element={<ApplicationsPage />} />
                <Route path="resources" element={<ResourcesPage />} />
                <Route path="funding" element={<FundingPage />} />
                <Route path="performance" element={<PerformancePage />} />
                <Route path="documents" element={<DocumentsPage />} />
                <Route path="alumni" element={<AlumniPage />} />

                {/* Dashboard Pages */}
                <Route path="attendee-dashboard" element={<AttendeeDashboard />} />
                <Route path="speaker-dashboard" element={<SpeakerDashboard />} />
                <Route path="admin-dashboard" element={<AdminDashboard />} />
              </Route>

              {/* Catch all route */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </div>
          </Router>
        </AuthProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
