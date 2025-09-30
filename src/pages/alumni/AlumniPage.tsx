import React from 'react';
import { Icon } from '@iconify/react';
import { StatCard, WowCard, WowButton, WowBadge, WowTable } from '../../components/wowdash';

const AlumniPage: React.FC = () => {
  const stats = [
    {
      title: 'Total Alumni',
      value: '156',
      icon: 'mdi:account-group',
      iconBgColor: 'bg-primary-500',
      gradientClass: 'bg-gradient-start-1',
      trend: { value: '+12', isPositive: true, label: 'This year' },
    },
    {
      title: 'Active Companies',
      value: '142',
      icon: 'mdi:office-building',
      iconBgColor: 'bg-success-500',
      gradientClass: 'bg-gradient-start-4',
      trend: { value: '91%', isPositive: true, label: 'Success rate' },
    },
    {
      title: 'Total Valuation',
      value: '$285M',
      icon: 'mdi:chart-line',
      iconBgColor: 'bg-info-500',
      gradientClass: 'bg-gradient-start-3',
      trend: { value: '+$45M', isPositive: true, label: 'This year' },
    },
    {
      title: 'Jobs Created',
      value: '1,234',
      icon: 'mdi:briefcase',
      iconBgColor: 'bg-purple',
      gradientClass: 'bg-gradient-start-2',
      trend: { value: '+234', isPositive: true, label: 'This year' },
    },
  ];

  const alumni = [
    {
      id: 'ALU-001',
      company: 'TechVision AI',
      founder: 'Sarah Johnson',
      graduationYear: '2023',
      industry: 'Artificial Intelligence',
      currentStage: 'Series A',
      valuation: '$25M',
      employees: 45,
      status: 'thriving',
    },
    {
      id: 'ALU-002',
      company: 'GreenEnergy Solutions',
      founder: 'Michael Chen',
      graduationYear: '2022',
      industry: 'Clean Tech',
      currentStage: 'Series B',
      valuation: '$50M',
      employees: 78,
      status: 'thriving',
    },
    {
      id: 'ALU-003',
      company: 'HealthTrack Pro',
      founder: 'Emily Rodriguez',
      graduationYear: '2023',
      industry: 'HealthTech',
      currentStage: 'Seed',
      valuation: '$8M',
      employees: 22,
      status: 'growing',
    },
    {
      id: 'ALU-004',
      company: 'FinanceFlow',
      founder: 'David Kim',
      graduationYear: '2021',
      industry: 'FinTech',
      currentStage: 'Series C',
      valuation: '$120M',
      employees: 156,
      status: 'thriving',
    },
    {
      id: 'ALU-005',
      company: 'EduLearn Platform',
      founder: 'Lisa Wang',
      graduationYear: '2023',
      industry: 'EdTech',
      currentStage: 'Pre-Seed',
      valuation: '$3M',
      employees: 12,
      status: 'growing',
    },
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'success' | 'info' | 'warning'> = {
      thriving: 'success',
      growing: 'info',
      stable: 'warning',
    };
    return <WowBadge variant={variants[status]}>{status.toUpperCase()}</WowBadge>;
  };

  const columns = [
    { key: 'id', label: 'Alumni ID' },
    { key: 'company', label: 'Company' },
    { key: 'founder', label: 'Founder' },
    { key: 'graduationYear', label: 'Graduation Year' },
    { 
      key: 'industry', 
      label: 'Industry',
      render: (value: string) => <WowBadge variant="secondary">{value}</WowBadge>,
    },
    { 
      key: 'currentStage', 
      label: 'Current Stage',
      render: (value: string) => <WowBadge variant="primary">{value}</WowBadge>,
    },
    { 
      key: 'valuation', 
      label: 'Valuation',
      render: (value: string) => <span className="font-semibold text-success-600">{value}</span>,
    },
    { key: 'employees', label: 'Employees' },
    { 
      key: 'status', 
      label: 'Status',
      render: (value: string) => getStatusBadge(value),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: () => (
        <div className="flex gap-2">
          <button className="text-primary-500 hover:text-primary-700">
            <Icon icon="mdi:account-details" className="text-xl" />
          </button>
          <button className="text-success-500 hover:text-success-700">
            <Icon icon="mdi:email" className="text-xl" />
          </button>
          <button className="text-info-500 hover:text-info-700">
            <Icon icon="mdi:linkedin" className="text-xl" />
          </button>
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
              <h4 className="mb-1 fw-bold text-neutral-900">Alumni Network</h4>
              <p className="text-neutral-600 mb-0">Track graduated startups and maintain alumni relationships</p>
            </div>
            <div className="d-flex gap-2">
              <WowButton variant="secondary">
                <Icon icon="mdi:email-multiple" className="mr-2" />
                Send Newsletter
              </WowButton>
              <WowButton variant="primary">
                <Icon icon="mdi:calendar-plus" className="mr-2" />
                Schedule Event
              </WowButton>
            </div>
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

      {/* Success Stories */}
      <div className="row mb-4">
        <div className="col-12">
          <WowCard title="Success Stories" subtitle="Highlighting our most successful alumni">
            <div className="row row-cols-1 row-cols-md-3 g-4">
              <div className="col">
                <div className="p-4 bg-gradient-start-1 rounded-lg text-white">
                  <Icon icon="mdi:trophy" className="text-4xl mb-2" />
                  <h5 className="fw-bold mb-2">FinanceFlow</h5>
                  <p className="text-sm mb-0">Raised $120M Series C, now valued at $500M+</p>
                </div>
              </div>
              <div className="col">
                <div className="p-4 bg-gradient-start-4 rounded-lg text-white">
                  <Icon icon="mdi:rocket-launch" className="text-4xl mb-2" />
                  <h5 className="fw-bold mb-2">GreenEnergy Solutions</h5>
                  <p className="text-sm mb-0">Expanded to 5 countries, 78 employees</p>
                </div>
              </div>
              <div className="col">
                <div className="p-4 bg-gradient-start-3 rounded-lg text-white">
                  <Icon icon="mdi:star" className="text-4xl mb-2" />
                  <h5 className="fw-bold mb-2">TechVision AI</h5>
                  <p className="text-sm mb-0">Featured in Forbes 30 Under 30</p>
                </div>
              </div>
            </div>
          </WowCard>
        </div>
      </div>

      {/* Alumni Table */}
      <div className="row">
        <div className="col-12">
          <WowCard title="Alumni Directory" subtitle="All graduated startups from our program">
            <WowTable columns={columns} data={alumni} hoverable striped />
          </WowCard>
        </div>
      </div>
    </div>
  );
};

export default AlumniPage;

