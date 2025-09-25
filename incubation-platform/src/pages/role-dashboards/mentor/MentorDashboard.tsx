import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { db, supabase } from '../../../services/supabase';
import DataTable from '../../../components/ui/DataTable';
import Button from '../../../components/ui/Button';
import ErrorBoundary from '../../../components/ui/ErrorBoundary';

const StatCard: React.FC<{ label: string; value: number | string }> = ({ label, value }) => (
  <div className="rounded-lg border border-gray-200 p-4 bg-white shadow-sm">
    <div className="text-sm text-gray-500">{label}</div>
    <div className="text-2xl font-semibold mt-1">{value}</div>
  </div>
);

const MentorDashboard: React.FC<{ profile: any }> = ({ profile }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const { data: mentor } = useQuery({
    queryKey: ['mentor-profile', profile.id],
    enabled: !!profile?.id,
    queryFn: async () => {
      const { data } = await supabase
        .from('mentors')
        .select('*')
        .eq('user_id', profile.id)
        .single();
      return data;
    },
  });

  const { data: sessions } = useQuery({
    queryKey: ['mentor-sessions', mentor?.id],
    enabled: !!mentor?.id,
    queryFn: async () => {
      const { data } = await db.getMentorSessions(mentor.id);
      return data ?? [];
    },
  });

  const { data: startups } = useQuery({
    queryKey: ['mentor-startups', profile.organization_id],
    enabled: !!profile?.organization_id,
    queryFn: async () => (await db.getStartups(profile.organization_id)).data ?? [],
  });

  const upcomingSessions = sessions?.filter(s => new Date(s.scheduled_at) > new Date()) || [];
  const pastSessions = sessions?.filter(s => new Date(s.scheduled_at) <= new Date()) || [];

  const sessionColumns = [
    {
      key: 'startups',
      header: 'Startup',
      render: (session: any) => session.startups?.name || 'Unknown'
    },
    {
      key: 'scheduled_at',
      header: 'Date & Time',
      render: (session: any) => new Date(session.scheduled_at).toLocaleString()
    },
    {
      key: 'duration_minutes',
      header: 'Duration',
      render: (session: any) => `${session.duration_minutes || 60} min`
    },
    {
      key: 'status',
      header: 'Status',
      render: (session: any) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          session.status === 'completed' ? 'bg-green-100 text-green-800' :
          session.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
          session.status === 'cancelled' ? 'bg-red-100 text-red-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {session.status || 'scheduled'}
        </span>
      )
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (session: any) => (
        <Button size="sm" variant="secondary">
          View Details
        </Button>
      )
    }
  ];

  const startupColumns = [
    { key: 'name', header: 'Startup' },
    { key: 'industry', header: 'Industry' },
    { key: 'stage', header: 'Stage' },
    {
      key: 'employee_count',
      header: 'Team Size',
      render: (startup: any) => startup.employee_count || 0
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'sessions', label: 'Sessions' },
    { id: 'startups', label: 'Available Startups' }
  ];

  return (
    <ErrorBoundary>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Mentor Dashboard</h1>
          <Button>
            Schedule Session
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
              <StatCard label="Upcoming Sessions" value={upcomingSessions.length} />
              <StatCard label="Past Sessions" value={pastSessions.length} />
              <StatCard label="Total Sessions" value={sessions?.length ?? 0} />
              <StatCard label="Available Startups" value={startups?.length ?? 0} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium mb-4">Upcoming Sessions</h3>
                <div className="space-y-3">
                  {upcomingSessions.slice(0, 5).map((session: any) => (
                    <div key={session.id} className="flex items-center justify-between py-2 border-b border-gray-100">
                      <div>
                        <p className="font-medium">{session.startups?.name || 'Unknown Startup'}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(session.scheduled_at).toLocaleString()}
                        </p>
                      </div>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        {session.duration_minutes || 60} min
                      </span>
                    </div>
                  ))}
                  {upcomingSessions.length === 0 && (
                    <p className="text-gray-500 text-center py-4">No upcoming sessions</p>
                  )}
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium mb-4">Recent Sessions</h3>
                <div className="space-y-3">
                  {pastSessions.slice(0, 5).map((session: any) => (
                    <div key={session.id} className="flex items-center justify-between py-2 border-b border-gray-100">
                      <div>
                        <p className="font-medium">{session.startups?.name || 'Unknown Startup'}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(session.scheduled_at).toLocaleDateString()}
                        </p>
                      </div>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        Completed
                      </span>
                    </div>
                  ))}
                  {pastSessions.length === 0 && (
                    <p className="text-gray-500 text-center py-4">No past sessions</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'sessions' && (
          <div className="space-y-4">
            <DataTable
              data={sessions || []}
              columns={sessionColumns}
              emptyMessage="No sessions scheduled."
            />
          </div>
        )}

        {activeTab === 'startups' && (
          <div className="space-y-4">
            <DataTable
              data={startups || []}
              columns={startupColumns}
              emptyMessage="No startups available for mentoring."
            />
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default MentorDashboard;

