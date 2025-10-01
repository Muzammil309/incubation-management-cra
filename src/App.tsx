import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { isSupabaseConfigured } from './services/supabase';

// Layout Components
import WowdashLayout from './layouts/WowdashLayout';

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  // If Supabase is not configured, allow access (demo mode)
  if (!isSupabaseConfigured) {
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  // If Supabase is not configured, redirect to dashboard (demo mode)
  if (!isSupabaseConfigured) {
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
              <Route path="/" element={<ProtectedRoute><WowdashLayout><div /></WowdashLayout></ProtectedRoute>}>
                <Route index element={<Navigate to="/dashboard" replace />} />
                <Route path="dashboard" element={<WowdashLayout><IncubationDashboard /></WowdashLayout>} />
                <Route path="startups" element={<WowdashLayout><StartupsPage /></WowdashLayout>} />
                <Route path="mentors" element={<WowdashLayout><MentorsPage /></WowdashLayout>} />
                <Route path="analytics" element={<WowdashLayout><AnalyticsPage /></WowdashLayout>} />
                <Route path="events" element={<WowdashLayout><EventsPage /></WowdashLayout>} />
                <Route path="investments" element={<WowdashLayout><InvestmentsPage /></WowdashLayout>} />
                <Route path="settings" element={<WowdashLayout><SettingsPage /></WowdashLayout>} />

                {/* New WowDash Pages */}
                <Route path="applications" element={<WowdashLayout><ApplicationsPage /></WowdashLayout>} />
                <Route path="resources" element={<WowdashLayout><ResourcesPage /></WowdashLayout>} />
                <Route path="funding" element={<WowdashLayout><FundingPage /></WowdashLayout>} />
                <Route path="performance" element={<WowdashLayout><PerformancePage /></WowdashLayout>} />
                <Route path="documents" element={<WowdashLayout><DocumentsPage /></WowdashLayout>} />
                <Route path="alumni" element={<WowdashLayout><AlumniPage /></WowdashLayout>} />

                {/* Dashboard Pages */}
                <Route path="attendee-dashboard" element={<WowdashLayout><AttendeeDashboard /></WowdashLayout>} />
                <Route path="speaker-dashboard" element={<WowdashLayout><SpeakerDashboard /></WowdashLayout>} />
                <Route path="admin-dashboard" element={<WowdashLayout><AdminDashboard /></WowdashLayout>} />
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
