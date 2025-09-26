import React, { useState } from 'react';
import SoftCard from '../components/ui/SoftCard';
import SoftButton from '../components/ui/SoftButton';
import SoftBadge from '../components/ui/SoftBadge';
import SoftInput from '../components/ui/SoftInput';
import { 
  Plus, 
  Search, 
  Filter, 
  Building2,
  Users,
  DollarSign,
  TrendingUp,
  Eye,
  Edit,
  MoreHorizontal
} from 'lucide-react';

interface Startup {
  id: string;
  name: string;
  description: string;
  stage: 'Idea' | 'MVP' | 'Seed' | 'Series A' | 'Series B' | 'Growth';
  industry: string;
  foundedDate: string;
  teamSize: number;
  funding: number;
  status: 'Active' | 'Graduated' | 'Paused' | 'Closed';
  logo?: string;
}

const mockStartups: Startup[] = [
  {
    id: '1',
    name: 'TechFlow AI',
    description: 'AI-powered workflow automation platform for enterprises',
    stage: 'Series A',
    industry: 'AI/ML',
    foundedDate: '2022-03-15',
    teamSize: 25,
    funding: 2500000,
    status: 'Active'
  },
  {
    id: '2',
    name: 'GreenTech Solutions',
    description: 'Sustainable energy solutions for smart cities',
    stage: 'Seed',
    industry: 'CleanTech',
    foundedDate: '2023-01-10',
    teamSize: 12,
    funding: 500000,
    status: 'Active'
  },
  {
    id: '3',
    name: 'HealthCare Plus',
    description: 'Telemedicine platform connecting patients with specialists',
    stage: 'MVP',
    industry: 'HealthTech',
    foundedDate: '2023-06-20',
    teamSize: 8,
    funding: 150000,
    status: 'Active'
  },
  {
    id: '4',
    name: 'EduTech Pro',
    description: 'Personalized learning platform using adaptive AI',
    stage: 'Idea',
    industry: 'EdTech',
    foundedDate: '2023-09-01',
    teamSize: 4,
    funding: 50000,
    status: 'Active'
  },
  {
    id: '5',
    name: 'FinanceFlow',
    description: 'Digital banking solution for small businesses',
    stage: 'Series B',
    industry: 'FinTech',
    foundedDate: '2021-08-12',
    teamSize: 45,
    funding: 8000000,
    status: 'Graduated'
  }
];

const StartupsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStage, setSelectedStage] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const filteredStartups = mockStartups.filter(startup => {
    const matchesSearch = startup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         startup.industry.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = selectedStage === 'All' || startup.stage === selectedStage;
    const matchesStatus = selectedStatus === 'All' || startup.status === selectedStatus;
    
    return matchesSearch && matchesStage && matchesStatus;
  });

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'Idea': return 'info';
      case 'MVP': return 'warning';
      case 'Seed': return 'success';
      case 'Series A': return 'primary';
      case 'Series B': return 'secondary';
      case 'Growth': return 'error';
      default: return 'info';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'success';
      case 'Graduated': return 'primary';
      case 'Paused': return 'warning';
      case 'Closed': return 'error';
      default: return 'info';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-dark-700 mb-2">Startup Portfolio</h1>
          <p className="text-secondary-500">Manage and track your incubated startups</p>
        </div>
        <SoftButton variant="primary" className="mt-4 md:mt-0">
          <Plus className="h-4 w-4 mr-2" />
          Add New Startup
        </SoftButton>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SoftCard>
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mr-4">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-secondary-500">Total Startups</p>
              <p className="text-2xl font-bold text-dark-700">{mockStartups.length}</p>
            </div>
          </div>
        </SoftCard>

        <SoftCard>
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-success rounded-xl flex items-center justify-center mr-4">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-secondary-500">Active Startups</p>
              <p className="text-2xl font-bold text-dark-700">
                {mockStartups.filter(s => s.status === 'Active').length}
              </p>
            </div>
          </div>
        </SoftCard>

        <SoftCard>
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-info rounded-xl flex items-center justify-center mr-4">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-secondary-500">Total Team Members</p>
              <p className="text-2xl font-bold text-dark-700">
                {mockStartups.reduce((sum, s) => sum + s.teamSize, 0)}
              </p>
            </div>
          </div>
        </SoftCard>

        <SoftCard>
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-warning rounded-xl flex items-center justify-center mr-4">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-secondary-500">Total Funding</p>
              <p className="text-2xl font-bold text-dark-700">
                ${(mockStartups.reduce((sum, s) => sum + s.funding, 0) / 1000000).toFixed(1)}M
              </p>
            </div>
          </div>
        </SoftCard>
      </div>

      {/* Filters and Search */}
      <SoftCard>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <SoftInput
              placeholder="Search startups..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={<Search className="h-4 w-4" />}
              className="md:w-64"
            />
            
            <select 
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value)}
              className="px-4 py-2 bg-white border border-light-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="All">All Stages</option>
              <option value="Idea">Idea</option>
              <option value="MVP">MVP</option>
              <option value="Seed">Seed</option>
              <option value="Series A">Series A</option>
              <option value="Series B">Series B</option>
              <option value="Growth">Growth</option>
            </select>

            <select 
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 bg-white border border-light-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Graduated">Graduated</option>
              <option value="Paused">Paused</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          <SoftButton variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </SoftButton>
        </div>
      </SoftCard>

      {/* Startups Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredStartups.map((startup) => (
          <SoftCard key={startup.id} className="hover:shadow-soft-xl transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-lg">
                    {startup.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-dark-700">{startup.name}</h3>
                  <p className="text-sm text-secondary-500">{startup.industry}</p>
                </div>
              </div>
              <button className="p-2 text-secondary-400 hover:text-dark-700">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>

            <p className="text-sm text-secondary-600 mb-4 line-clamp-2">
              {startup.description}
            </p>

            <div className="flex items-center justify-between mb-4">
              <SoftBadge variant={getStageColor(startup.stage) as any}>
                {startup.stage}
              </SoftBadge>
              <SoftBadge variant={getStatusColor(startup.status) as any}>
                {startup.status}
              </SoftBadge>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              <div>
                <p className="text-secondary-500">Team Size</p>
                <p className="font-medium text-dark-700">{startup.teamSize} members</p>
              </div>
              <div>
                <p className="text-secondary-500">Funding</p>
                <p className="font-medium text-dark-700">
                  ${startup.funding >= 1000000 
                    ? `${(startup.funding / 1000000).toFixed(1)}M` 
                    : `${(startup.funding / 1000).toFixed(0)}K`}
                </p>
              </div>
            </div>

            <div className="flex space-x-2">
              <SoftButton variant="outline" size="sm" className="flex-1">
                <Eye className="h-4 w-4 mr-2" />
                View
              </SoftButton>
              <SoftButton variant="primary" size="sm" className="flex-1">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </SoftButton>
            </div>
          </SoftCard>
        ))}
      </div>

      {filteredStartups.length === 0 && (
        <SoftCard className="text-center py-12">
          <Building2 className="h-12 w-12 text-secondary-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-dark-700 mb-2">No startups found</h3>
          <p className="text-secondary-500 mb-4">
            Try adjusting your search criteria or add a new startup to get started.
          </p>
          <SoftButton variant="primary">
            <Plus className="h-4 w-4 mr-2" />
            Add New Startup
          </SoftButton>
        </SoftCard>
      )}
    </div>
  );
};

export default StartupsPage;
