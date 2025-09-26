import React, { useState } from 'react';
import { TrendingUp, DollarSign, Users, Target, Plus, Filter, Eye } from 'lucide-react';

interface Investment {
  id: string;
  startupName: string;
  round: 'Pre-Seed' | 'Seed' | 'Series A' | 'Series B' | 'Series C';
  amount: number;
  valuation: number;
  investors: string[];
  date: string;
  status: 'Active' | 'Completed' | 'In Progress';
  sector: string;
  description: string;
}

const InvestmentsPage: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Sample investments data
  const investments: Investment[] = [
    {
      id: '1',
      startupName: 'TechFlow AI',
      round: 'Series A',
      amount: 5000000,
      valuation: 25000000,
      investors: ['Venture Capital Partners', 'Tech Angels', 'Innovation Fund'],
      date: '2024-01-10',
      status: 'Completed',
      sector: 'Artificial Intelligence',
      description: 'AI-powered workflow automation platform for enterprises'
    },
    {
      id: '2',
      startupName: 'HealthTech Solutions',
      round: 'Seed',
      amount: 1500000,
      valuation: 8000000,
      investors: ['Health Ventures', 'Medical Angels'],
      date: '2024-01-08',
      status: 'In Progress',
      sector: 'Healthcare',
      description: 'Telemedicine platform connecting patients with specialists'
    },
    {
      id: '3',
      startupName: 'FinanceBot',
      round: 'Series B',
      amount: 12000000,
      valuation: 80000000,
      investors: ['Global Ventures', 'Fintech Capital', 'Strategic Partners'],
      date: '2024-01-05',
      status: 'Completed',
      sector: 'Fintech',
      description: 'Automated financial advisory platform for SMEs'
    },
    {
      id: '4',
      startupName: 'EcoGreen',
      round: 'Pre-Seed',
      amount: 500000,
      valuation: 3000000,
      investors: ['Green Fund', 'Sustainability Angels'],
      date: '2024-01-03',
      status: 'Active',
      sector: 'CleanTech',
      description: 'Sustainable packaging solutions for e-commerce'
    }
  ];

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}K`;
    }
    return `$${amount}`;
  };

  const getRoundColor = (round: string) => {
    switch (round) {
      case 'Pre-Seed': return 'bg-gray-100 text-gray-800';
      case 'Seed': return 'bg-green-100 text-green-800';
      case 'Series A': return 'bg-blue-100 text-blue-800';
      case 'Series B': return 'bg-purple-100 text-purple-800';
      case 'Series C': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Completed': return 'bg-blue-100 text-blue-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredInvestments = selectedFilter === 'all' 
    ? investments 
    : investments.filter(investment => investment.round === selectedFilter);

  const totalInvestments = investments.reduce((sum, inv) => sum + inv.amount, 0);
  const avgInvestment = totalInvestments / investments.length;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Investment Tracking</h1>
          <p className="text-gray-600">Monitor funding rounds and investor relations</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Investment</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-soft-xl p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Investments</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalInvestments)}</p>
              <p className="text-sm text-green-600 mt-1">+25% from last quarter</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-soft-xl p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Active Rounds</p>
              <p className="text-2xl font-bold text-gray-900">{investments.filter(i => i.status === 'In Progress').length}</p>
              <p className="text-sm text-blue-600 mt-1">Currently fundraising</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-info-500 to-info-600 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-soft-xl p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Avg Investment</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(avgInvestment)}</p>
              <p className="text-sm text-green-600 mt-1">Per funding round</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-success-500 to-success-600 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-soft-xl p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Unique Investors</p>
              <p className="text-2xl font-bold text-gray-900">24</p>
              <p className="text-sm text-green-600 mt-1">+8 new this quarter</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-warning-500 to-warning-600 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-soft-xl p-6 border border-gray-100 mb-6">
        <div className="flex items-center space-x-4">
          <Filter className="w-5 h-5 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Filter by round:</span>
          <div className="flex space-x-2">
            {['all', 'Pre-Seed', 'Seed', 'Series A', 'Series B', 'Series C'].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedFilter === filter
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filter === 'all' ? 'All Rounds' : filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Investments Table */}
      <div className="bg-white rounded-2xl shadow-soft-xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Investment Portfolio</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Startup</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Round</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valuation</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInvestments.map((investment) => (
                <tr key={investment.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{investment.startupName}</div>
                      <div className="text-sm text-gray-500">{investment.sector}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoundColor(investment.round)}`}>
                      {investment.round}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {formatCurrency(investment.amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(investment.valuation)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(investment.status)}`}>
                      {investment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(investment.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-primary-600 hover:text-primary-900 flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>View</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Investment Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Investment</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Startup Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter startup name"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Funding Round</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                    <option value="Pre-Seed">Pre-Seed</option>
                    <option value="Seed">Seed</option>
                    <option value="Series A">Series A</option>
                    <option value="Series B">Series B</option>
                    <option value="Series C">Series C</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sector</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="e.g., Fintech"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Investment Amount</label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="5000000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Valuation</label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="25000000"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Brief description of the startup"
                ></textarea>
              </div>
            </div>
            <div className="flex space-x-4 mt-8">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all duration-200"
              >
                Cancel
              </button>
              <button className="flex-1 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-200">
                Add Investment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvestmentsPage;
