import React from 'react';
import { Icon } from '@iconify/react';
import { StatCard, WowCard, WowButton } from '../../components/wowdash';

const PerformancePage: React.FC = () => {
  const stats = [
    {
      title: 'Program Success Rate',
      value: '87%',
      icon: 'mdi:chart-line',
      iconBgColor: 'bg-success-500',
      gradientClass: 'bg-gradient-start-4',
      trend: { value: '+5%', isPositive: true, label: 'vs last quarter' },
    },
    {
      title: 'Active Startups',
      value: '42',
      icon: 'mdi:rocket-launch',
      iconBgColor: 'bg-primary-500',
      gradientClass: 'bg-gradient-start-1',
      trend: { value: '+8', isPositive: true, label: 'This quarter' },
    },
    {
      title: 'Total Revenue Generated',
      value: '$8.2M',
      icon: 'mdi:currency-usd',
      iconBgColor: 'bg-info-500',
      gradientClass: 'bg-gradient-start-3',
      trend: { value: '+$1.5M', isPositive: true, label: 'This year' },
    },
    {
      title: 'Jobs Created',
      value: '234',
      icon: 'mdi:account-group',
      iconBgColor: 'bg-purple',
      gradientClass: 'bg-gradient-start-2',
      trend: { value: '+45', isPositive: true, label: 'This year' },
    },
  ];

  return (
    <div className="container-fluid">
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h4 className="mb-1 fw-bold text-neutral-900">Performance Metrics</h4>
              <p className="text-neutral-600 mb-0">Analytics dashboard showing KPIs for startups and program success</p>
            </div>
            <WowButton variant="primary">
              <Icon icon="mdi:download" className="mr-2" />
              Export Report
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

      {/* Charts */}
      <div className="row mb-4">
        <div className="col-lg-8">
          <WowCard title="Revenue Growth Trend">
            <div className="p-8 bg-neutral-50 rounded-lg text-center">
              <Icon icon="mdi:chart-areaspline" className="text-6xl text-neutral-400 mb-3" />
              <p className="text-neutral-600">Revenue growth chart will be displayed here</p>
              <p className="text-sm text-neutral-500">Integrate with Chart.js or Recharts for visualization</p>
            </div>
          </WowCard>
        </div>
        <div className="col-lg-4">
          <WowCard title="Startup Distribution">
            <div className="p-8 bg-neutral-50 rounded-lg text-center">
              <Icon icon="mdi:chart-donut" className="text-6xl text-neutral-400 mb-3" />
              <p className="text-neutral-600">Pie chart</p>
            </div>
          </WowCard>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6">
          <WowCard title="Monthly Active Users">
            <div className="p-8 bg-neutral-50 rounded-lg text-center">
              <Icon icon="mdi:chart-bar" className="text-6xl text-neutral-400 mb-3" />
              <p className="text-neutral-600">Bar chart will be displayed here</p>
            </div>
          </WowCard>
        </div>
        <div className="col-lg-6">
          <WowCard title="Funding by Stage">
            <div className="p-8 bg-neutral-50 rounded-lg text-center">
              <Icon icon="mdi:chart-timeline-variant" className="text-6xl text-neutral-400 mb-3" />
              <p className="text-neutral-600">Timeline chart will be displayed here</p>
            </div>
          </WowCard>
        </div>
      </div>
    </div>
  );
};

export default PerformancePage;

