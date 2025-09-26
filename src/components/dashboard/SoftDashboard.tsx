import React from 'react';
import SoftCard from '../ui/SoftCard';
import SoftButton from '../ui/SoftButton';
import SoftBadge from '../ui/SoftBadge';

const SoftDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-background-default p-6">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-medium text-dark-700 mb-2">
          🎉 Incubation Management Platform
        </h1>
        <p className="text-lg text-secondary-500">
          Welcome to your Soft UI Dashboard - Now with beautiful design system!
        </p>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <SoftCard variant="gradient" gradientType="primary">
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">✅</div>
            <h3 className="text-lg font-medium mb-1">Authentication</h3>
            <p className="text-sm opacity-90">System Fixed</p>
          </div>
        </SoftCard>

        <SoftCard variant="gradient" gradientType="info">
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">🚀</div>
            <h3 className="text-lg font-medium mb-1">Routing</h3>
            <p className="text-sm opacity-90">System Fixed</p>
          </div>
        </SoftCard>

        <SoftCard variant="gradient" gradientType="success">
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">📊</div>
            <h3 className="text-lg font-medium mb-1">Dashboard</h3>
            <p className="text-sm opacity-90">Loading Successfully</p>
          </div>
        </SoftCard>

        <SoftCard variant="gradient" gradientType="warning">
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">🎨</div>
            <h3 className="text-lg font-medium mb-1">Soft UI</h3>
            <p className="text-sm opacity-90">Design Applied</p>
          </div>
        </SoftCard>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Statistics Card */}
        <SoftCard className="lg:col-span-2">
          <h3 className="text-xl font-medium text-dark-700 mb-4">Platform Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-500 mb-1">150+</div>
              <div className="text-sm text-secondary-500">Startups</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-info-500 mb-1">75</div>
              <div className="text-sm text-secondary-500">Mentors</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success-500 mb-1">25</div>
              <div className="text-sm text-secondary-500">Investors</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-warning-500 mb-1">12</div>
              <div className="text-sm text-secondary-500">Events</div>
            </div>
          </div>
        </SoftCard>

        {/* Quick Actions */}
        <SoftCard>
          <h3 className="text-xl font-medium text-dark-700 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <SoftButton variant="primary" className="w-full">
              Add New Startup
            </SoftButton>
            <SoftButton variant="info" className="w-full">
              Schedule Event
            </SoftButton>
            <SoftButton variant="success" className="w-full">
              View Analytics
            </SoftButton>
            <SoftButton variant="outline" className="w-full">
              Manage Settings
            </SoftButton>
          </div>
        </SoftCard>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <SoftCard>
          <h3 className="text-xl font-medium text-dark-700 mb-4">Recent Startups</h3>
          <div className="space-y-4">
            {[
              { name: 'TechFlow AI', stage: 'Series A', status: 'active' },
              { name: 'GreenTech Solutions', stage: 'Seed', status: 'active' },
              { name: 'HealthCare Plus', stage: 'MVP', status: 'review' },
              { name: 'EduTech Pro', stage: 'Idea', status: 'new' },
            ].map((startup, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-light-100 rounded-xl">
                <div>
                  <div className="font-medium text-dark-700">{startup.name}</div>
                  <div className="text-sm text-secondary-500">{startup.stage}</div>
                </div>
                <SoftBadge 
                  variant={
                    startup.status === 'active' ? 'success' : 
                    startup.status === 'review' ? 'warning' : 'info'
                  }
                >
                  {startup.status}
                </SoftBadge>
              </div>
            ))}
          </div>
        </SoftCard>

        <SoftCard>
          <h3 className="text-xl font-medium text-dark-700 mb-4">Upcoming Events</h3>
          <div className="space-y-4">
            {[
              { name: 'Pitch Day - Cohort 5', date: 'Mar 15, 2024', type: 'pitch' },
              { name: 'Mentor Networking', date: 'Mar 18, 2024', type: 'networking' },
              { name: 'Demo Day Preparation', date: 'Mar 22, 2024', type: 'workshop' },
              { name: 'Investor Meetup', date: 'Mar 25, 2024', type: 'meeting' },
            ].map((event, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-light-100 rounded-xl">
                <div>
                  <div className="font-medium text-dark-700">{event.name}</div>
                  <div className="text-sm text-secondary-500">{event.date}</div>
                </div>
                <SoftBadge 
                  variant={
                    event.type === 'pitch' ? 'primary' : 
                    event.type === 'networking' ? 'info' : 
                    event.type === 'workshop' ? 'success' : 'warning'
                  }
                >
                  {event.type}
                </SoftBadge>
              </div>
            ))}
          </div>
        </SoftCard>
      </div>

      {/* Feature Showcase */}
      <SoftCard variant="gradient" gradientType="dark">
        <div className="text-center">
          <h3 className="text-2xl font-medium mb-4">🎨 Soft UI Design System Applied!</h3>
          <p className="text-lg opacity-90 mb-6">
            Your incubation management platform now features the beautiful Soft UI Dashboard design system
            with gradients, soft shadows, and modern typography.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <SoftBadge variant="primary" size="lg">Beautiful Cards</SoftBadge>
            <SoftBadge variant="info" size="lg">Gradient Buttons</SoftBadge>
            <SoftBadge variant="success" size="lg">Soft Shadows</SoftBadge>
            <SoftBadge variant="warning" size="lg">Modern Typography</SoftBadge>
          </div>
        </div>
      </SoftCard>
    </div>
  );
};

export default SoftDashboard;
