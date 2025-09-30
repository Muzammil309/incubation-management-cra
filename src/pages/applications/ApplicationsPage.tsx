import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { StatCard, WowCard, WowButton, WowBadge, WowTable } from '../../components/wowdash';

const ApplicationsPage: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  const stats = [
    {
      title: 'Total Applications',
      value: '156',
      icon: 'mdi:file-document-multiple',
      iconBgColor: 'bg-primary-500',
      gradientClass: 'bg-gradient-start-1',
      trend: { value: '+12', isPositive: true, label: 'This month' },
    },
    {
      title: 'Pending Review',
      value: '42',
      icon: 'mdi:clock-outline',
      iconBgColor: 'bg-warning-500',
      gradientClass: 'bg-gradient-start-2',
      trend: { value: '+8', isPositive: true, label: 'Awaiting review' },
    },
    {
      title: 'Approved',
      value: '89',
      icon: 'mdi:check-circle',
      iconBgColor: 'bg-success-500',
      gradientClass: 'bg-gradient-start-4',
      trend: { value: '+15', isPositive: true, label: 'This quarter' },
    },
    {
      title: 'Rejected',
      value: '25',
      icon: 'mdi:close-circle',
      iconBgColor: 'bg-danger-500',
      gradientClass: 'bg-gradient-start-5',
      trend: { value: '-3', isPositive: false, label: 'This month' },
    },
  ];

  const applications = [
    {
      id: 'APP-001',
      startupName: 'TechVision AI',
      founder: 'Sarah Johnson',
      industry: 'Artificial Intelligence',
      stage: 'Seed',
      submittedDate: '2024-01-15',
      status: 'pending',
      score: 85,
    },
    {
      id: 'APP-002',
      startupName: 'GreenEnergy Solutions',
      founder: 'Michael Chen',
      industry: 'Clean Tech',
      stage: 'Pre-Seed',
      submittedDate: '2024-01-14',
      status: 'approved',
      score: 92,
    },
    {
      id: 'APP-003',
      startupName: 'HealthTrack Pro',
      founder: 'Emily Rodriguez',
      industry: 'HealthTech',
      stage: 'Seed',
      submittedDate: '2024-01-13',
      status: 'pending',
      score: 78,
    },
    {
      id: 'APP-004',
      startupName: 'FinanceFlow',
      founder: 'David Kim',
      industry: 'FinTech',
      stage: 'Series A',
      submittedDate: '2024-01-12',
      status: 'approved',
      score: 88,
    },
    {
      id: 'APP-005',
      startupName: 'EduLearn Platform',
      founder: 'Lisa Wang',
      industry: 'EdTech',
      stage: 'Pre-Seed',
      submittedDate: '2024-01-11',
      status: 'rejected',
      score: 62,
    },
  ];

  const filteredApplications = filter === 'all' 
    ? applications 
    : applications.filter(app => app.status === filter);

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'success' | 'warning' | 'danger'> = {
      approved: 'success',
      pending: 'warning',
      rejected: 'danger',
    };
    return <WowBadge variant={variants[status]}>{status.toUpperCase()}</WowBadge>;
  };

  const columns = [
    { key: 'id', label: 'Application ID' },
    { key: 'startupName', label: 'Startup Name' },
    { key: 'founder', label: 'Founder' },
    { key: 'industry', label: 'Industry' },
    { key: 'stage', label: 'Stage' },
    { key: 'submittedDate', label: 'Submitted' },
    { 
      key: 'score', 
      label: 'Score',
      render: (value: number) => (
        <span className={`font-semibold ${value >= 80 ? 'text-success-600' : value >= 70 ? 'text-warning-600' : 'text-danger-600'}`}>
          {value}/100
        </span>
      ),
    },
    { 
      key: 'status', 
      label: 'Status',
      render: (value: string) => getStatusBadge(value),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_: any, row: any) => (
        <div className="flex gap-2">
          <button className="text-primary-500 hover:text-primary-700">
            <Icon icon="mdi:eye" className="text-xl" />
          </button>
          {row.status === 'pending' && (
            <>
              <button className="text-success-500 hover:text-success-700">
                <Icon icon="mdi:check" className="text-xl" />
              </button>
              <button className="text-danger-500 hover:text-danger-700">
                <Icon icon="mdi:close" className="text-xl" />
              </button>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="container-fluid">
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h4 className="mb-1 fw-bold text-neutral-900">Applications Management</h4>
              <p className="text-neutral-600 mb-0">Review and manage startup applications to your incubation program</p>
            </div>
            <WowButton variant="primary">
              <Icon icon="mdi:plus" className="mr-2" />
              New Application
            </WowButton>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 gy-4 mb-4">
        {stats.map((stat, index) => (
          <div className="col" key={index}>
            <StatCard {...stat} />
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="row mb-4">
        <div className="col-12">
          <WowCard>
            <div className="d-flex gap-2 flex-wrap">
              <WowButton 
                variant={filter === 'all' ? 'primary' : 'secondary'}
                onClick={() => setFilter('all')}
              >
                All Applications
              </WowButton>
              <WowButton 
                variant={filter === 'pending' ? 'warning' : 'secondary'}
                onClick={() => setFilter('pending')}
              >
                Pending
              </WowButton>
              <WowButton 
                variant={filter === 'approved' ? 'success' : 'secondary'}
                onClick={() => setFilter('approved')}
              >
                Approved
              </WowButton>
              <WowButton 
                variant={filter === 'rejected' ? 'danger' : 'secondary'}
                onClick={() => setFilter('rejected')}
              >
                Rejected
              </WowButton>
            </div>
          </WowCard>
        </div>
      </div>

      {/* Applications Table */}
      <div className="row">
        <div className="col-12">
          <WowCard title="Applications List" subtitle={`Showing ${filteredApplications.length} applications`}>
            <WowTable columns={columns} data={filteredApplications} hoverable striped />
          </WowCard>
        </div>
      </div>
    </div>
  );
};

export default ApplicationsPage;

