import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { db } from '../../../services/supabase';
import DataTable from '../../../components/ui/DataTable';
import Button from '../../../components/ui/Button';
import ErrorBoundary from '../../../components/ui/ErrorBoundary';

const StatCard: React.FC<{ label: string; value: number | string }> = ({ label, value }) => (
  <div className="rounded-lg border border-gray-200 p-4 bg-white shadow-sm">
    <div className="text-sm text-gray-500">{label}</div>
    <div className="text-2xl font-semibold mt-1">{value}</div>
  </div>
);

const SupportDashboard: React.FC<{ profile: any }> = ({ profile }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const orgId = profile.organization_id as string;

  const { data: users } = useQuery({
    queryKey: ['users', orgId],
    enabled: !!orgId,
    queryFn: async () => (await db.getUsers(orgId)).data ?? [],
  });

  const { data: startups } = useQuery({
    queryKey: ['startups', orgId],
    enabled: !!orgId,
    queryFn: async () => (await db.getStartups(orgId)).data ?? [],
  });

  const { data: events } = useQuery({
    queryKey: ['events', orgId],
    enabled: !!orgId,
    queryFn: async () => (await db.getEvents(orgId)).data ?? [],
  });

  const userColumns = [
    { key: 'full_name', header: 'Name' },
    { key: 'email', header: 'Email' },
    { key: 'role', header: 'Role' },
    {
      key: 'last_login_at',
      header: 'Last Login',
      render: (user: any) => user.last_login_at ? new Date(user.last_login_at).toLocaleDateString() : 'Never'
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (user: any) => (
        <Button size="sm" variant="secondary">
          Contact
        </Button>
      )
    }
  ];

  const startupColumns = [
    { key: 'name', header: 'Startup' },
    { key: 'industry', header: 'Industry' },
    { key: 'stage', header: 'Stage' },
    {
      key: 'created_at',
      header: 'Created',
      render: (startup: any) => startup.created_at ? new Date(startup.created_at).toLocaleDateString() : '-'
    }
  ];

  const eventColumns = [
    { key: 'title', header: 'Event' },
    { key: 'event_type', header: 'Type' },
    {
      key: 'event_date',
      header: 'Date',
      render: (event: any) => new Date(event.event_date).toLocaleDateString()
    },
    { key: 'location', header: 'Location' }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'users', label: 'User Support' },
    { id: 'startups', label: 'Startup Support' },
    { id: 'events', label: 'Event Support' }
  ];

  const recentUsers = users?.filter(u => u.created_at && new Date(u.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) || [];
  const activeUsers = users?.filter(u => u.last_login_at && new Date(u.last_login_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)) || [];

  return (
    <ErrorBoundary>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Support Dashboard</h1>
          <Button>
            Create Ticket
          </Button>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <StatCard label="Total Users" value={users?.length ?? 0} />
              <StatCard label="Active Users (30d)" value={activeUsers.length} />
              <StatCard label="New Users (7d)" value={recentUsers.length} />
              <StatCard label="Total Startups" value={startups?.length ?? 0} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium mb-4">Recent User Activity</h3>
                <div className="space-y-3">
                  {users?.slice(0, 5).map((user: any) => (
                    <div key={user.id} className="flex items-center justify-between py-2 border-b border-gray-100">
                      <div>
                        <p className="font-medium">{user.full_name || user.email}</p>
                        <p className="text-sm text-gray-500">{user.role}</p>
                      </div>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        {user.last_login_at ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium mb-4">System Status</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2">
                    <span>Database Connection</span>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      Healthy
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span>Authentication Service</span>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      Operational
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span>Storage Service</span>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      Operational
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span>Email Service</span>
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                      Monitoring
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="space-y-4">
            <DataTable
              data={users || []}
              columns={userColumns}
              emptyMessage="No users found."
            />
          </div>
        )}

        {activeTab === 'startups' && (
          <div className="space-y-4">
            <DataTable
              data={startups || []}
              columns={startupColumns}
              emptyMessage="No startups found."
            />
          </div>
        )}

        {activeTab === 'events' && (
          <div className="space-y-4">
            <DataTable
              data={events || []}
              columns={eventColumns}
              emptyMessage="No events found."
            />
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default SupportDashboard;

