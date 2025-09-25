import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { db } from '../../../services/supabase';
import { useCurrentProfile } from '../../../hooks/useCurrentProfile';
import AdminCharts from './AdminCharts';
import DataTable from '../../../components/ui/DataTable';
import Modal from '../../../components/ui/Modal';
import Button from '../../../components/ui/Button';
import StartupForm from '../../../components/forms/StartupForm';
import CohortForm from '../../../components/forms/CohortForm';
import LoadingSpinner from '../../../components/ui/LoadingSpinner';
import ErrorBoundary from '../../../components/ui/ErrorBoundary';

const StatCard: React.FC<{ label: string; value: number | string }> = ({ label, value }) => (
  <div className="rounded-lg border border-gray-200 p-4 bg-white shadow-sm">
    <div className="text-sm text-gray-500">{label}</div>
    <div className="text-2xl font-semibold mt-1">{value}</div>
  </div>
);

const AdminDashboard: React.FC<{ profile: any }> = ({ profile }) => {
  const orgId = profile.organization_id as string;
  const [activeTab, setActiveTab] = useState('overview');
  const [showStartupModal, setShowStartupModal] = useState(false);
  const [showCohortModal, setShowCohortModal] = useState(false);
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [selectedCohort, setSelectedCohort] = useState(null);

  const { data: orgs } = useQuery({
    queryKey: ['orgs'],
    queryFn: async () => (await db.getOrganizations()).data ?? [],
  });

  const { data: startups, isLoading: startupsLoading, error: startupsError } = useQuery({
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

  const { data: users } = useQuery({
    queryKey: ['users', orgId],
    enabled: !!orgId,
    queryFn: async () => (await db.getUsers(orgId)).data ?? [],
  });

  const startupColumns = [
    { key: 'name', header: 'Name' },
    { key: 'industry', header: 'Industry' },
    { key: 'stage', header: 'Stage' },
    {
      key: 'employee_count',
      header: 'Employees',
      render: (startup: any) => startup.employee_count || 0
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (startup: any) => (
        <Button
          size="sm"
          variant="secondary"
          onClick={() => {
            setSelectedStartup(startup);
            setShowStartupModal(true);
          }}
        >
          Edit
        </Button>
      )
    }
  ];

  const cohortColumns = [
    { key: 'name', header: 'Name' },
    { key: 'status', header: 'Status' },
    {
      key: 'start_date',
      header: 'Start Date',
      render: (cohort: any) => cohort.start_date ? new Date(cohort.start_date).toLocaleDateString() : '-'
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
          Edit
        </Button>
      )
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'startups', label: 'Startups' },
    { id: 'cohorts', label: 'Cohorts' },
    { id: 'users', label: 'Users' }
  ];

  return (
    <ErrorBoundary>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
          <div className="flex space-x-2">
            <Button
              onClick={() => {
                setSelectedStartup(null);
                setShowStartupModal(true);
              }}
            >
              Add Startup
            </Button>
            <Button
              onClick={() => {
                setSelectedCohort(null);
                setShowCohortModal(true);
              }}
            >
              Add Cohort
            </Button>
          </div>
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
              <StatCard label="Organizations" value={orgs?.length ?? 0} />
              <StatCard label="Startups" value={startups?.length ?? 0} />
              <StatCard label="Cohorts" value={cohorts?.length ?? 0} />
              <StatCard label="Users" value={users?.length ?? 0} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AdminCharts startups={startups as any[]} />
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
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

        {activeTab === 'startups' && (
          <div className="space-y-4">
            <DataTable
              data={startups || []}
              columns={startupColumns}
              loading={startupsLoading}
              error={startupsError?.message}
              emptyMessage="No startups found. Create your first startup to get started."
            />
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

        {activeTab === 'users' && (
          <div className="space-y-4">
            <DataTable
              data={users || []}
              columns={[
                { key: 'full_name', header: 'Name' },
                { key: 'email', header: 'Email' },
                { key: 'role', header: 'Role' },
                {
                  key: 'last_login_at',
                  header: 'Last Login',
                  render: (user: any) => user.last_login_at ? new Date(user.last_login_at).toLocaleDateString() : 'Never'
                }
              ]}
              emptyMessage="No users found."
            />
          </div>
        )}

        {/* Modals */}
        <Modal
          isOpen={showStartupModal}
          onClose={() => {
            setShowStartupModal(false);
            setSelectedStartup(null);
          }}
          title={selectedStartup ? 'Edit Startup' : 'Create New Startup'}
          size="lg"
        >
          <StartupForm
            startup={selectedStartup}
            organizationId={orgId}
            onSuccess={() => {
              setShowStartupModal(false);
              setSelectedStartup(null);
            }}
            onCancel={() => {
              setShowStartupModal(false);
              setSelectedStartup(null);
            }}
          />
        </Modal>

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

export default AdminDashboard;

