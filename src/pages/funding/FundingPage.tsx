import React from 'react';
import { Icon } from '@iconify/react';
import { StatCard, WowCard, WowButton, WowBadge, WowTable } from '../../components/wowdash';

const FundingPage: React.FC = () => {
  const stats = [
    {
      title: 'Total Funding',
      value: '$12.5M',
      icon: 'mdi:cash-multiple',
      iconBgColor: 'bg-success-500',
      gradientClass: 'bg-gradient-start-4',
      trend: { value: '+$2.3M', isPositive: true, label: 'This quarter' },
    },
    {
      title: 'Active Investors',
      value: '34',
      icon: 'mdi:account-tie',
      iconBgColor: 'bg-primary-500',
      gradientClass: 'bg-gradient-start-1',
      trend: { value: '+6', isPositive: true, label: 'New this month' },
    },
    {
      title: 'Funding Rounds',
      value: '18',
      icon: 'mdi:chart-timeline-variant',
      iconBgColor: 'bg-info-500',
      gradientClass: 'bg-gradient-start-3',
      trend: { value: '+3', isPositive: true, label: 'In progress' },
    },
    {
      title: 'Avg. Deal Size',
      value: '$694K',
      icon: 'mdi:trending-up',
      iconBgColor: 'bg-purple',
      gradientClass: 'bg-gradient-start-2',
      trend: { value: '+12%', isPositive: true, label: 'vs last quarter' },
    },
  ];

  const fundingRounds = [
    {
      id: 'FR-001',
      startup: 'TechVision AI',
      round: 'Series A',
      amount: '$2.5M',
      leadInvestor: 'Venture Capital Partners',
      date: '2024-01-20',
      status: 'completed',
      valuation: '$15M',
    },
    {
      id: 'FR-002',
      startup: 'GreenEnergy Solutions',
      round: 'Seed',
      amount: '$800K',
      leadInvestor: 'Green Tech Fund',
      date: '2024-02-05',
      status: 'in-progress',
      valuation: '$4M',
    },
    {
      id: 'FR-003',
      startup: 'HealthTrack Pro',
      round: 'Pre-Seed',
      amount: '$500K',
      leadInvestor: 'Angel Investors Group',
      date: '2024-02-10',
      status: 'in-progress',
      valuation: '$2.5M',
    },
    {
      id: 'FR-004',
      startup: 'FinanceFlow',
      round: 'Series B',
      amount: '$5M',
      leadInvestor: 'Global Ventures',
      date: '2024-01-15',
      status: 'completed',
      valuation: '$35M',
    },
  ];

  const investors = [
    {
      id: 'INV-001',
      name: 'Venture Capital Partners',
      type: 'VC Firm',
      portfolio: 12,
      totalInvested: '$8.5M',
      focus: 'AI, SaaS',
      status: 'active',
    },
    {
      id: 'INV-002',
      name: 'Green Tech Fund',
      type: 'Impact Fund',
      portfolio: 8,
      totalInvested: '$3.2M',
      focus: 'Clean Tech, Sustainability',
      status: 'active',
    },
    {
      id: 'INV-003',
      name: 'Angel Investors Group',
      type: 'Angel Network',
      portfolio: 15,
      totalInvested: '$2.8M',
      focus: 'Early Stage',
      status: 'active',
    },
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'success' | 'warning' | 'info'> = {
      completed: 'success',
      'in-progress': 'warning',
      pending: 'info',
      active: 'success',
    };
    return <WowBadge variant={variants[status]}>{status.replace('-', ' ').toUpperCase()}</WowBadge>;
  };

  const fundingColumns = [
    { key: 'id', label: 'Round ID' },
    { key: 'startup', label: 'Startup' },
    { 
      key: 'round', 
      label: 'Round',
      render: (value: string) => <WowBadge variant="primary">{value}</WowBadge>,
    },
    { 
      key: 'amount', 
      label: 'Amount',
      render: (value: string) => <span className="font-semibold text-success-600">{value}</span>,
    },
    { key: 'leadInvestor', label: 'Lead Investor' },
    { key: 'valuation', label: 'Valuation' },
    { key: 'date', label: 'Date' },
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
            <Icon icon="mdi:eye" className="text-xl" />
          </button>
          <button className="text-info-500 hover:text-info-700">
            <Icon icon="mdi:pencil" className="text-xl" />
          </button>
        </div>
      ),
    },
  ];

  const investorColumns = [
    { key: 'id', label: 'Investor ID' },
    { key: 'name', label: 'Name' },
    { 
      key: 'type', 
      label: 'Type',
      render: (value: string) => <WowBadge variant="secondary">{value}</WowBadge>,
    },
    { key: 'portfolio', label: 'Portfolio Size' },
    { 
      key: 'totalInvested', 
      label: 'Total Invested',
      render: (value: string) => <span className="font-semibold text-success-600">{value}</span>,
    },
    { key: 'focus', label: 'Focus Areas' },
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
              <h4 className="mb-1 fw-bold text-neutral-900">Funding & Investments</h4>
              <p className="text-neutral-600 mb-0">Track funding rounds, investor connections, and financial milestones</p>
            </div>
            <div className="d-flex gap-2">
              <WowButton variant="secondary">
                <Icon icon="mdi:download" className="mr-2" />
                Export Report
              </WowButton>
              <WowButton variant="primary">
                <Icon icon="mdi:plus" className="mr-2" />
                New Funding Round
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

      {/* Funding Rounds */}
      <div className="row mb-4">
        <div className="col-12">
          <WowCard title="Funding Rounds" subtitle="Track all funding activities">
            <WowTable columns={fundingColumns} data={fundingRounds} hoverable striped />
          </WowCard>
        </div>
      </div>

      {/* Investors */}
      <div className="row">
        <div className="col-12">
          <WowCard title="Investor Network" subtitle="Manage investor relationships">
            <WowTable columns={investorColumns} data={investors} hoverable striped />
          </WowCard>
        </div>
      </div>
    </div>
  );
};

export default FundingPage;

