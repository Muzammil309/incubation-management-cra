import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase, db } from '../../../services/supabase';
import DataTable from '../../../components/ui/DataTable';
import Button from '../../../components/ui/Button';
import ErrorBoundary from '../../../components/ui/ErrorBoundary';

const StatCard: React.FC<{ label: string; value: number | string }> = ({ label, value }) => (
  <div className="rounded-lg border border-gray-200 p-4 bg-white shadow-sm">
    <div className="text-sm text-gray-500">{label}</div>
    <div className="text-2xl font-semibold mt-1">{value}</div>
  </div>
);

const FounderDashboard: React.FC<{ profile: any }> = ({ profile }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const { data: memberships } = useQuery({
    queryKey: ['startup-memberships', profile.id],
    enabled: !!profile?.id,
    queryFn: async () => {
      const { data } = await supabase
        .from('startup_members')
        .select('*, startups(*)')
        .eq('user_id', profile.id);
      return data ?? [];
    },
  });

  const { data: sessions } = useQuery({
    queryKey: ['founder-sessions', profile.id],
    enabled: !!profile?.id,
    queryFn: async () => {
      const startupIds = memberships?.map(m => m.startup_id) || [];
      if (startupIds.length === 0) return [];

      const { data } = await supabase
        .from('mentor_sessions')
        .select('*, mentors(*), startups(*)')
        .in('startup_id', startupIds)
        .order('scheduled_at', { ascending: false });
      return data ?? [];
    },
  });

  const { data: events } = useQuery({
    queryKey: ['events', profile.organization_id],
    enabled: !!profile?.organization_id,
    queryFn: async () => (await db.getEvents(profile.organization_id)).data ?? [],
  });

  const startupColumns = [
    {
      key: 'startups',
      header: 'Company',
      render: (membership: any) => membership.startups?.name || 'Unknown'
    },
    {
      key: 'startups',
      header: 'Industry',
      render: (membership: any) => membership.startups?.industry || '-'
    },
    {
      key: 'startups',
      header: 'Stage',
      render: (membership: any) => membership.startups?.stage || '-'
    },
    {
      key: 'role',
      header: 'My Role',
      render: (membership: any) => membership.role || 'Member'
    }
  ];

  const sessionColumns = [
    {
      key: 'mentors',
      header: 'Mentor',
      render: (session: any) => session.mentors?.users?.full_name || 'Unknown'
    },
    {
      key: 'scheduled_at',
      header: 'Date',
      render: (session: any) => new Date(session.scheduled_at).toLocaleDateString()
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
          'bg-gray-100 text-gray-800'
        }`}>
          {session.status || 'scheduled'}
        </span>
      )
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'startups', label: 'My Startups' },
    { id: 'sessions', label: 'Mentor Sessions' },
    { id: 'events', label: 'Events' }
  ];

  const upcomingEvents = events?.filter(e => new Date(e.event_date) > new Date()) || [];
  const upcomingSessions = sessions?.filter(s => new Date(s.scheduled_at) > new Date()) || [];

  return (
    <ErrorBoundary>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Founder Dashboard</h1>
          <Button>
            Update KPIs
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
              <StatCard label="My Startups" value={memberships?.length ?? 0} />
              <StatCard label="Upcoming Sessions" value={upcomingSessions.length} />
              <StatCard label="Upcoming Events" value={upcomingEvents.length} />
              <StatCard label="Total Sessions" value={sessions?.length ?? 0} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium mb-4">My Companies</h3>
                <div className="space-y-3">
                  {memberships?.slice(0, 5).map((membership: any) => (
                    <div key={membership.id} className="flex items-center justify-between py-2 border-b border-gray-100">
                      <div>
                        <p className="font-medium">{membership.startups?.name || 'Unknown'}</p>
                        <p className="text-sm text-gray-500">{membership.startups?.industry || '-'}</p>
                      </div>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        {membership.role || 'Member'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium mb-4">Upcoming Sessions</h3>
                <div className="space-y-3">
                  {upcomingSessions.slice(0, 5).map((session: any) => (
                    <div key={session.id} className="flex items-center justify-between py-2 border-b border-gray-100">
                      <div>
                        <p className="font-medium">{session.mentors?.users?.full_name || 'Unknown Mentor'}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(session.scheduled_at).toLocaleDateString()}
                        </p>
                      </div>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        {session.duration_minutes || 60} min
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'startups' && (
          <div className="space-y-4">
            <DataTable
              data={memberships || []}
              columns={startupColumns}
              emptyMessage="You are not associated with any startups yet."
            />
          </div>
        )}

        {activeTab === 'sessions' && (
          <div className="space-y-4">
            <DataTable
              data={sessions || []}
              columns={sessionColumns}
              emptyMessage="No mentor sessions scheduled."
            />
          </div>
        )}

        {activeTab === 'events' && (
          <div className="space-y-4">
            <DataTable
              data={events || []}
              columns={[
                { key: 'title', header: 'Event' },
                { key: 'event_type', header: 'Type' },
                {
                  key: 'event_date',
                  header: 'Date',
                  render: (event: any) => new Date(event.event_date).toLocaleDateString()
                },
                { key: 'location', header: 'Location' }
              ]}
              emptyMessage="No events scheduled."
            />
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default FounderDashboard;

