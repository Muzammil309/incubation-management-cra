import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { db } from '../../../services/supabase';
import DataTable from '../../../components/ui/DataTable';
import Modal from '../../../components/ui/Modal';
import Button from '../../../components/ui/Button';
import CohortForm from '../../../components/forms/CohortForm';
import ErrorBoundary from '../../../components/ui/ErrorBoundary';

const StatCard: React.FC<{ label: string; value: number | string }> = ({ label, value }) => (
  <div className="rounded-lg border border-gray-200 p-4 bg-white shadow-sm">
    <div className="text-sm text-gray-500">{label}</div>
    <div className="text-2xl font-semibold mt-1">{value}</div>
  </div>
);

const ProgramManagerDashboard: React.FC<{ profile: any }> = ({ profile }) => {
  const orgId = profile.organization_id as string;
  const [activeTab, setActiveTab] = useState('overview');
  const [showCohortModal, setShowCohortModal] = useState(false);
  const [selectedCohort, setSelectedCohort] = useState(null);

  const { data: startups } = useQuery({
    queryKey: ['startups', orgId],
    enabled: !!orgId,
    queryFn: async () => (await db.getStartups(orgId)).data ?? [],
  });

  const { data: mentors } = useQuery({
    queryKey: ['mentors', orgId],
    enabled: !!orgId,
    queryFn: async () => (await db.getMentors(orgId)).data ?? [],
  });

  const { data: cohorts, isLoading: cohortsLoading } = useQuery({
    queryKey: ['cohorts', orgId],
    enabled: !!orgId,
    queryFn: async () => (await db.getCohorts(orgId)).data ?? [],
  });

  const { data: events } = useQuery({
    queryKey: ['events', orgId],
    enabled: !!orgId,
    queryFn: async () => (await db.getEvents(orgId)).data ?? [],
  });

  const cohortColumns = [
    { key: 'name', header: 'Cohort Name' },
    {
      key: 'status',
      header: 'Status',
      render: (cohort: any) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          cohort.status === 'active' ? 'bg-green-100 text-green-800' :
          cohort.status === 'recruiting' ? 'bg-blue-100 text-blue-800' :
          cohort.status === 'completed' ? 'bg-gray-100 text-gray-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {cohort.status}
        </span>
      )
    },
    {
      key: 'start_date',
      header: 'Start Date',
      render: (cohort: any) => cohort.start_date ? new Date(cohort.start_date).toLocaleDateString() : '-'
    },
    {
      key: 'end_date',
      header: 'End Date',
      render: (cohort: any) => cohort.end_date ? new Date(cohort.end_date).toLocaleDateString() : '-'
    },
    { key: 'max_startups', header: 'Max Startups' },
    {
      key: 'actions',
      header: 'Actions',
      render: (cohort: any) => (
        <Button
          size="sm"
          variant="secondary"
          onClick={() => {
            setSelectedCohort(cohort);
            setShowCohortModal(true);
          }}
        >
          Manage
        </Button>
      )
    }
  ];

  const startupColumns = [
    { key: 'name', header: 'Startup' },
    { key: 'industry', header: 'Industry' },
    { key: 'stage', header: 'Stage' },
    {
      key: 'cohorts',
      header: 'Cohort',
      render: (startup: any) => startup.cohorts?.name || 'Unassigned'
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'cohorts', label: 'Cohorts' },
    { id: 'startups', label: 'Startups' },
    { id: 'events', label: 'Events' }
  ];

  return (
    <ErrorBoundary>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Program Manager Dashboard</h1>
          <Button
            onClick={() => {
              setSelectedCohort(null);
              setShowCohortModal(true);
            }}
          >
            Create Cohort
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
              <StatCard label="Active Cohorts" value={cohorts?.filter(c => c.status === 'active').length ?? 0} />
              <StatCard label="Total Startups" value={startups?.length ?? 0} />
              <StatCard label="Available Mentors" value={mentors?.length ?? 0} />
              <StatCard label="Upcoming Events" value={events?.filter(e => new Date(e.event_date) > new Date()).length ?? 0} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium mb-4">Active Cohorts</h3>
                <div className="space-y-3">
                  {cohorts?.filter(c => c.status === 'active').slice(0, 5).map((cohort: any) => (
                    <div key={cohort.id} className="flex items-center justify-between py-2 border-b border-gray-100">
                      <div>
                        <p className="font-medium">{cohort.name}</p>
                        <p className="text-sm text-gray-500">
                          {cohort.start_date ? new Date(cohort.start_date).toLocaleDateString() : 'No start date'}
                        </p>
                      </div>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        Active
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium mb-4">Recent Startups</h3>
                <div className="space-y-3">
                  {startups?.slice(0, 5).map((startup: any) => (
                    <div key={startup.id} className="flex items-center justify-between py-2 border-b border-gray-100">
                      <div>
                        <p className="font-medium">{startup.name}</p>
                        <p className="text-sm text-gray-500">{startup.industry}</p>
                      </div>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        {startup.stage}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cohorts' && (
          <div className="space-y-4">
            <DataTable
              data={cohorts || []}
              columns={cohortColumns}
              loading={cohortsLoading}
              emptyMessage="No cohorts found. Create your first cohort to get started."
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

        {/* Modal */}
        <Modal
          isOpen={showCohortModal}
          onClose={() => {
            setShowCohortModal(false);
            setSelectedCohort(null);
          }}
          title={selectedCohort ? 'Edit Cohort' : 'Create New Cohort'}
          size="lg"
        >
          <CohortForm
            cohort={selectedCohort}
            organizationId={orgId}
            onSuccess={() => {
              setShowCohortModal(false);
              setSelectedCohort(null);
            }}
            onCancel={() => {
              setShowCohortModal(false);
              setSelectedCohort(null);
            }}
          />
        </Modal>
      </div>
    </ErrorBoundary>
  );
};

export default ProgramManagerDashboard;

