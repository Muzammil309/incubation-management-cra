import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useCurrentProfile } from '../../hooks/useCurrentProfile';

// Import WowDash Dashboard Components
import DashBoardLayerOne from '../../wowdash/components/DashBoardLayerOne';
import DashBoardLayerTwo from '../../wowdash/components/DashBoardLayerTwo';
import DashBoardLayerThree from '../../wowdash/components/DashBoardLayerThree';
import DashBoardLayerFour from '../../wowdash/components/DashBoardLayerFour';
import DashBoardLayerFive from '../../wowdash/components/DashBoardLayerFive';
import DashBoardLayerSix from '../../wowdash/components/DashBoardLayerSix';

const RoleDashboardRouter: React.FC = () => {
  const { user } = useAuth();
  const { profile, loading, error } = useCurrentProfile();

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        <h4 className="alert-heading">Error Loading Profile</h4>
        <p>Unable to load user profile: {error}</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="alert alert-warning" role="alert">
        <h4 className="alert-heading">Profile Not Found</h4>
        <p>Please complete your profile setup to access the dashboard.</p>
      </div>
    );
  }

  // Role-based dashboard rendering
  const renderDashboard = () => {
    switch (profile.role) {
      case 'admin':
        return (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h1 className="h3 mb-0">Admin Dashboard</h1>
              <span className="badge bg-primary">Administrator</span>
            </div>
            <DashBoardLayerOne />
          </div>
        );

      case 'program_manager':
        return (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h1 className="h3 mb-0">Program Manager Dashboard</h1>
              <span className="badge bg-success">Program Manager</span>
            </div>
            <DashBoardLayerTwo />
          </div>
        );

      case 'investor':
        return (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h1 className="h3 mb-0">Investor Dashboard</h1>
              <span className="badge bg-warning">Investor</span>
            </div>
            <DashBoardLayerThree />
          </div>
        );

      case 'mentor':
        return (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h1 className="h3 mb-0">Mentor Dashboard</h1>
              <span className="badge bg-info">Mentor</span>
            </div>
            <DashBoardLayerFour />
          </div>
        );

      case 'founder':
        return (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h1 className="h3 mb-0">Founder Dashboard</h1>
              <span className="badge bg-secondary">Founder</span>
            </div>
            <DashBoardLayerFive />
          </div>
        );

      case 'support':
        return (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h1 className="h3 mb-0">Support Dashboard</h1>
              <span className="badge bg-dark">Support</span>
            </div>
            <DashBoardLayerSix />
          </div>
        );

      default:
        return (
          <div className="alert alert-warning" role="alert">
            <h4 className="alert-heading">Unknown Role</h4>
            <p>Your role "{profile.role}" is not recognized. Please contact support.</p>
          </div>
        );
    }
  };

  return (
    <div className="container-fluid">
      {renderDashboard()}
    </div>
  );
};

export default RoleDashboardRouter;

