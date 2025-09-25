import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase, db } from '../../../services/supabase';
import InvestorCharts from './InvestorCharts';
import DataTable from '../../../components/ui/DataTable';
import Button from '../../../components/ui/Button';
import ErrorBoundary from '../../../components/ui/ErrorBoundary';

const StatCard: React.FC<{ label: string; value: number | string }> = ({ label, value }) => (
  <div className="rounded-lg border border-gray-200 p-4 bg-white shadow-sm">
    <div className="text-sm text-gray-500">{label}</div>
    <div className="text-2xl font-semibold mt-1">{value}</div>
  </div>
);

const InvestorDashboard: React.FC<{ profile: any }> = ({ profile }) => {
  const orgId = profile.organization_id as string;
  const [activeTab, setActiveTab] = useState('overview');

  const { data: deals, isLoading: dealsLoading } = useQuery({
    queryKey: ['investments', orgId],
    enabled: !!orgId,
    queryFn: async () => (await db.getInvestments(orgId)).data ?? [],
  });

  const { data: startups } = useQuery({
    queryKey: ['startups', orgId],
    enabled: !!orgId,
    queryFn: async () => (await db.getStartups(orgId)).data ?? [],
  });

  const totalInvestment = deals?.reduce((sum, deal) => sum + (deal.amount || 0), 0) || 0;
  const avgDealSize = deals?.length ? totalInvestment / deals.length : 0;

  const dealColumns = [
    {
      key: 'startups',
      header: 'Company',
      render: (deal: any) => deal.startups?.name || 'Unknown'
    },
    {
      key: 'amount',
      header: 'Amount',
      render: (deal: any) => `$${(deal.amount || 0).toLocaleString()}`
    },
    { key: 'stage', header: 'Stage' },
    {
      key: 'investment_date',
      header: 'Date',
      render: (deal: any) => deal.investment_date ? new Date(deal.investment_date).toLocaleDateString() : '-'
    },
    {
      key: 'equity_percentage',
      header: 'Equity %',
      render: (deal: any) => deal.equity_percentage ? `${deal.equity_percentage}%` : '-'
    }
  ];

  const portfolioColumns = [
    { key: 'name', header: 'Company' },
    { key: 'industry', header: 'Industry' },
    { key: 'stage', header: 'Stage' },
    {
      key: 'employee_count',
      header: 'Team Size',
      render: (startup: any) => startup.employee_count || 0
    },
    {
      key: 'funding_raised',
      header: 'Total Funding',
      render: (startup: any) => `$${(startup.funding_raised || 0).toLocaleString()}`
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'deals', label: 'Deals' },
    { id: 'portfolio', label: 'Portfolio' }
  ];

  return (
    <ErrorBoundary>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Investor Dashboard</h1>
          <Button>
            New Investment
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
              <StatCard label="Total Deals" value={deals?.length ?? 0} />
              <StatCard label="Portfolio Companies" value={startups?.length ?? 0} />
              <StatCard label="Total Investment" value={`$${totalInvestment.toLocaleString()}`} />
              <StatCard label="Avg Deal Size" value={`$${avgDealSize.toLocaleString()}`} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <InvestorCharts deals={deals as any[]} />

              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium mb-4">Recent Investments</h3>
                <div className="space-y-3">
                  {deals?.slice(0, 5).map((deal: any) => (
                    <div key={deal.id} className="flex items-center justify-between py-2 border-b border-gray-100">
                      <div>
                        <p className="font-medium">{deal.startups?.name || 'Unknown Company'}</p>
                        <p className="text-sm text-gray-500">{deal.stage}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${(deal.amount || 0).toLocaleString()}</p>
                        <p className="text-sm text-gray-500">
                          {deal.investment_date ? new Date(deal.investment_date).toLocaleDateString() : '-'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'deals' && (
          <div className="space-y-4">
            <DataTable
              data={deals || []}
              columns={dealColumns}
              loading={dealsLoading}
              emptyMessage="No investments found."
            />
          </div>
        )}

        {activeTab === 'portfolio' && (
          <div className="space-y-4">
            <DataTable
              data={startups || []}
              columns={portfolioColumns}
              emptyMessage="No portfolio companies found."
            />
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default InvestorDashboard;

