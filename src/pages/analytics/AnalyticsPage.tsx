import React from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const AnalyticsPage: React.FC = () => {
  // Sample data for charts
  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Startup Applications',
        data: [12, 19, 15, 25, 22, 30],
        borderColor: 'rgb(203, 12, 159)',
        backgroundColor: 'rgba(203, 12, 159, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Accepted Startups',
        data: [8, 12, 10, 15, 14, 18],
        borderColor: 'rgb(23, 193, 232)',
        backgroundColor: 'rgba(23, 193, 232, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const barChartData = {
    labels: ['Seed', 'Series A', 'Series B', 'Series C'],
    datasets: [
      {
        label: 'Funding Rounds',
        data: [25, 15, 8, 3],
        backgroundColor: [
          'rgba(203, 12, 159, 0.8)',
          'rgba(23, 193, 232, 0.8)',
          'rgba(130, 214, 22, 0.8)',
          'rgba(251, 207, 51, 0.8)',
        ],
        borderColor: [
          'rgb(203, 12, 159)',
          'rgb(23, 193, 232)',
          'rgb(130, 214, 22)',
          'rgb(251, 207, 51)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const doughnutData = {
    labels: ['Tech', 'Healthcare', 'Fintech', 'E-commerce', 'Other'],
    datasets: [
      {
        data: [35, 25, 20, 15, 5],
        backgroundColor: [
          'rgba(203, 12, 159, 0.8)',
          'rgba(23, 193, 232, 0.8)',
          'rgba(130, 214, 22, 0.8)',
          'rgba(251, 207, 51, 0.8)',
          'rgba(234, 6, 6, 0.8)',
        ],
        borderColor: [
          'rgb(203, 12, 159)',
          'rgb(23, 193, 232)',
          'rgb(130, 214, 22)',
          'rgb(251, 207, 51)',
          'rgb(234, 6, 6)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
        <p className="text-gray-600">Comprehensive insights into your incubation program performance</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-soft-xl p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Startups</p>
              <p className="text-2xl font-bold text-gray-900">156</p>
              <p className="text-sm text-green-600 mt-1">+12% from last month</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h4M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-soft-xl p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Active Mentors</p>
              <p className="text-2xl font-bold text-gray-900">89</p>
              <p className="text-sm text-green-600 mt-1">+5% from last month</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-info-500 to-info-600 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-soft-xl p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Funding</p>
              <p className="text-2xl font-bold text-gray-900">$12.5M</p>
              <p className="text-sm text-green-600 mt-1">+28% from last quarter</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-success-500 to-success-600 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-soft-xl p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Success Rate</p>
              <p className="text-2xl font-bold text-gray-900">73%</p>
              <p className="text-sm text-green-600 mt-1">+3% from last quarter</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-warning-500 to-warning-600 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-soft-xl p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Startup Applications Trend</h3>
          <Line data={lineChartData} options={chartOptions} />
        </div>

        <div className="bg-white rounded-2xl shadow-soft-xl p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Funding Rounds Distribution</h3>
          <Bar data={barChartData} options={chartOptions} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-soft-xl p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Industry Distribution</h3>
          <div className="flex justify-center">
            <div className="w-80 h-80">
              <Doughnut data={doughnutData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-soft-xl p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
              <p className="text-sm text-gray-600">New startup "TechFlow" joined the program</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-info-500 rounded-full"></div>
              <p className="text-sm text-gray-600">Mentor session completed with "HealthAI"</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-success-500 rounded-full"></div>
              <p className="text-sm text-gray-600">"FinanceBot" raised $2M Series A funding</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-warning-500 rounded-full"></div>
              <p className="text-sm text-gray-600">Workshop "Product Strategy" scheduled for next week</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
