# UI/UX Wireframes and Component Library

## Design System Overview

### Design Principles
- **Mobile-First**: Responsive design starting from 320px
- **Accessibility**: WCAG 2.1 AA compliance
- **Consistency**: Unified component library across all interfaces
- **Performance**: Optimized for fast loading and smooth interactions
- **Scalability**: Modular components for easy maintenance

### Color Palette
```css
:root {
  /* Primary Colors */
  --primary-50: #eff6ff;
  --primary-500: #3b82f6;
  --primary-600: #2563eb;
  --primary-700: #1d4ed8;
  
  /* Secondary Colors */
  --secondary-50: #f8fafc;
  --secondary-500: #64748b;
  --secondary-600: #475569;
  
  /* Success/Error/Warning */
  --success-500: #10b981;
  --error-500: #ef4444;
  --warning-500: #f59e0b;
  
  /* Neutral Colors */
  --gray-50: #f9fafb;
  --gray-100: #f3f4f6;
  --gray-900: #111827;
}
```

### Typography Scale
```css
/* Headings */
.text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
.text-3xl { font-size: 1.875rem; line-height: 2.25rem; }
.text-2xl { font-size: 1.5rem; line-height: 2rem; }
.text-xl { font-size: 1.25rem; line-height: 1.75rem; }
.text-lg { font-size: 1.125rem; line-height: 1.75rem; }

/* Body Text */
.text-base { font-size: 1rem; line-height: 1.5rem; }
.text-sm { font-size: 0.875rem; line-height: 1.25rem; }
.text-xs { font-size: 0.75rem; line-height: 1rem; }
```

## Core Component Library

### 1. Dashboard Layout Components

#### AdminDashboard.jsx
```jsx
import React from 'react';
import { Icon } from '@iconify/react';
import StatsCard from './components/StatsCard';
import CohortOverview from './components/CohortOverview';
import RecentActivity from './components/RecentActivity';
import QuickActions from './components/QuickActions';

const AdminDashboard = () => {
  const stats = [
    {
      title: "Active Startups",
      value: "156",
      change: "+12%",
      changeType: "increase",
      icon: "heroicons:building-office-2"
    },
    {
      title: "Total Mentors",
      value: "89",
      change: "+5%",
      changeType: "increase", 
      icon: "heroicons:academic-cap"
    },
    {
      title: "Investment Pipeline",
      value: "$2.4M",
      change: "+18%",
      changeType: "increase",
      icon: "heroicons:currency-dollar"
    },
    {
      title: "Graduation Rate",
      value: "78%",
      change: "+3%",
      changeType: "increase",
      icon: "heroicons:trophy"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Admin Dashboard
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Welcome back! Here's what's happening with your incubator.
              </p>
            </div>
            <QuickActions />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        {/* Dashboard Widgets */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <CohortOverview />
            <RecentActivity />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <UpcomingEvents />
            <TopPerformingStartups />
            <MentorEngagement />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
```

#### StatsCard.jsx
```jsx
import React from 'react';
import { Icon } from '@iconify/react';

const StatsCard = ({ title, value, change, changeType, icon }) => {
  const changeColor = changeType === 'increase' ? 'text-green-600' : 'text-red-600';
  const changeIcon = changeType === 'increase' ? 'heroicons:arrow-trending-up' : 'heroicons:arrow-trending-down';

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          <div className="flex items-center mt-2">
            <Icon icon={changeIcon} className={`w-4 h-4 ${changeColor} mr-1`} />
            <span className={`text-sm font-medium ${changeColor}`}>{change}</span>
            <span className="text-sm text-gray-500 ml-1">vs last month</span>
          </div>
        </div>
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center">
            <Icon icon={icon} className="w-6 h-6 text-primary-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
```

### 2. Startup Management Components

#### StartupProfile.jsx
```jsx
import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import KPIChart from './KPIChart';
import MilestoneTracker from './MilestoneTracker';
import TeamMembers from './TeamMembers';
import DocumentLibrary from './DocumentLibrary';

const StartupProfile = ({ startup }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'heroicons:home' },
    { id: 'kpis', label: 'KPIs & Metrics', icon: 'heroicons:chart-bar' },
    { id: 'milestones', label: 'Milestones', icon: 'heroicons:flag' },
    { id: 'team', label: 'Team', icon: 'heroicons:users' },
    { id: 'documents', label: 'Documents', icon: 'heroicons:document-text' },
    { id: 'mentoring', label: 'Mentoring', icon: 'heroicons:academic-cap' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="px-6 py-6">
          <div className="flex items-start space-x-6">
            <img
              src={startup.logo_url || '/default-startup-logo.png'}
              alt={startup.name}
              className="w-16 h-16 rounded-lg object-cover border border-gray-200"
            />
            <div className="flex-1">
              <div className="flex items-center space-x-3">
                <h1 className="text-2xl font-bold text-gray-900">{startup.name}</h1>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  startup.status === 'active' ? 'bg-green-100 text-green-800' :
                  startup.status === 'graduated' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {startup.status}
                </span>
              </div>
              <p className="text-gray-600 mt-1">{startup.description}</p>
              <div className="flex items-center space-x-6 mt-3 text-sm text-gray-500">
                <span className="flex items-center">
                  <Icon icon="heroicons:building-office" className="w-4 h-4 mr-1" />
                  {startup.industry}
                </span>
                <span className="flex items-center">
                  <Icon icon="heroicons:map-pin" className="w-4 h-4 mr-1" />
                  {startup.headquarters_location}
                </span>
                <span className="flex items-center">
                  <Icon icon="heroicons:calendar" className="w-4 h-4 mr-1" />
                  Founded {new Date(startup.founded_date).getFullYear()}
                </span>
              </div>
            </div>
            <div className="flex space-x-3">
              <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                <Icon icon="heroicons:pencil" className="w-4 h-4 mr-2" />
                Edit Profile
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <Icon icon="heroicons:share" className="w-4 h-4 mr-2" />
                Share
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-t border-gray-200">
          <nav className="px-6 flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon icon={tab.icon} className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="px-6 py-6">
        {activeTab === 'overview' && <OverviewTab startup={startup} />}
        {activeTab === 'kpis' && <KPIChart startupId={startup.id} />}
        {activeTab === 'milestones' && <MilestoneTracker startupId={startup.id} />}
        {activeTab === 'team' && <TeamMembers startupId={startup.id} />}
        {activeTab === 'documents' && <DocumentLibrary startupId={startup.id} />}
        {activeTab === 'mentoring' && <MentoringTab startupId={startup.id} />}
      </div>
    </div>
  );
};

const OverviewTab = ({ startup }) => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <div className="lg:col-span-2">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Overview</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Business Model</label>
            <p className="text-gray-900 mt-1">{startup.business_model}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Target Market</label>
            <p className="text-gray-900 mt-1">{startup.target_market}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Stage</label>
            <p className="text-gray-900 mt-1">{startup.stage}</p>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Employees</span>
            <span className="font-medium">{startup.employee_count}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Website</span>
            <a href={startup.website_url} className="text-primary-600 hover:text-primary-700">
              Visit
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default StartupProfile;
```

### 3. Mentor Matching Components

#### MentorMarketplace.jsx
```jsx
import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import MentorCard from './MentorCard';
import FilterPanel from './FilterPanel';

const MentorMarketplace = () => {
  const [filters, setFilters] = useState({
    expertise: [],
    industry: [],
    availability: 'all',
    rating: 0
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Mentor Marketplace</h1>
              <p className="text-gray-600 mt-1">Find the perfect mentor for your startup</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Icon icon="heroicons:magnifying-glass" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search mentors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-primary-100 text-primary-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <Icon icon="heroicons:squares-2x2" className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-primary-100 text-primary-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <Icon icon="heroicons:list-bullet" className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Filters Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 p-6">
          <FilterPanel filters={filters} onFiltersChange={setFilters} />
        </div>

        {/* Mentor Grid/List */}
        <div className="flex-1 p-6">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-gray-600">Showing 24 of 89 mentors</p>
            <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
              <option>Sort by Rating</option>
              <option>Sort by Experience</option>
              <option>Sort by Availability</option>
            </select>
          </div>

          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-4'
          }>
            {/* Mentor cards would be mapped here */}
            <MentorCard viewMode={viewMode} />
            <MentorCard viewMode={viewMode} />
            <MentorCard viewMode={viewMode} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorMarketplace;
```

### 4. Mobile-First Components

#### Mobile Navigation
```jsx
import React, { useState } from 'react';
import { Icon } from '@iconify/react';

const MobileNavigation = ({ user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { icon: 'heroicons:home', label: 'Dashboard', href: '/dashboard' },
    { icon: 'heroicons:building-office-2', label: 'Startups', href: '/startups' },
    { icon: 'heroicons:academic-cap', label: 'Mentors', href: '/mentors' },
    { icon: 'heroicons:calendar', label: 'Events', href: '/events' },
    { icon: 'heroicons:chart-bar', label: 'Analytics', href: '/analytics' }
  ];

  return (
    <>
      {/* Mobile Header */}
      <header className="lg:hidden bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            >
              <Icon icon="heroicons:bars-3" className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">Incubator</h1>
          </div>
          <div className="flex items-center space-x-3">
            <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-100">
              <Icon icon="heroicons:bell" className="w-6 h-6" />
            </button>
            <img
              src={user.avatar_url}
              alt={user.name}
              className="w-8 h-8 rounded-full"
            />
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsMenuOpen(false)} />
          <div className="fixed left-0 top-0 bottom-0 w-80 bg-white">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-lg text-gray-600 hover:bg-gray-100"
                >
                  <Icon icon="heroicons:x-mark" className="w-6 h-6" />
                </button>
              </div>
            </div>
            <nav className="p-4">
              <ul className="space-y-2">
                {navigationItems.map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.href}
                      className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Icon icon={item.icon} className="w-5 h-5" />
                      <span>{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="grid grid-cols-5">
          {navigationItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="flex flex-col items-center py-2 px-1 text-xs text-gray-600 hover:text-primary-600"
            >
              <Icon icon={item.icon} className="w-6 h-6 mb-1" />
              <span>{item.label}</span>
            </a>
          ))}
        </div>
      </nav>
    </>
  );
};

export default MobileNavigation;

### 5. Investor Portal Components

#### InvestorDashboard.jsx
```jsx
import React from 'react';
import { Icon } from '@iconify/react';
import DealPipeline from './DealPipeline';
import PortfolioOverview from './PortfolioOverview';
import MarketInsights from './MarketInsights';

const InvestorDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-semibold text-gray-900">Investor Portal</h1>
          <p className="text-gray-600 mt-1">Track your investments and discover new opportunities</p>
        </div>
      </header>

      <main className="px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Portfolio Value</p>
                <p className="text-2xl font-bold text-gray-900">$2.4M</p>
              </div>
              <Icon icon="heroicons:currency-dollar" className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Deals</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
              <Icon icon="heroicons:briefcase" className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">ROI</p>
                <p className="text-2xl font-bold text-gray-900">24.5%</p>
              </div>
              <Icon icon="heroicons:arrow-trending-up" className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">New Opportunities</p>
                <p className="text-2xl font-bold text-gray-900">8</p>
              </div>
              <Icon icon="heroicons:light-bulb" className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <DealPipeline />
          </div>
          <div className="space-y-6">
            <PortfolioOverview />
            <MarketInsights />
          </div>
        </div>
      </main>
    </div>
  );
};

export default InvestorDashboard;
```

### 6. Responsive Data Tables

#### ResponsiveTable.jsx
```jsx
import React, { useState } from 'react';
import { Icon } from '@iconify/react';

const ResponsiveTable = ({ columns, data, actions = [] }) => {
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Mobile Card View */}
      <div className="md:hidden">
        {data.map((item, index) => (
          <div key={index} className="p-4 border-b border-gray-200 last:border-b-0">
            {columns.map((column) => (
              <div key={column.key} className="flex justify-between py-1">
                <span className="text-sm font-medium text-gray-600">{column.label}:</span>
                <span className="text-sm text-gray-900">{item[column.key]}</span>
              </div>
            ))}
            {actions.length > 0 && (
              <div className="flex space-x-2 mt-3 pt-3 border-t border-gray-100">
                {actions.map((action, actionIndex) => (
                  <button
                    key={actionIndex}
                    onClick={() => action.onClick(item)}
                    className={`px-3 py-1 rounded text-xs font-medium ${action.className}`}
                  >
                    {action.icon && <Icon icon={action.icon} className="w-3 h-3 mr-1" />}
                    {action.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.label}</span>
                    {column.sortable && (
                      <Icon
                        icon={
                          sortColumn === column.key
                            ? sortDirection === 'asc'
                              ? 'heroicons:chevron-up'
                              : 'heroicons:chevron-down'
                            : 'heroicons:chevron-up-down'
                        }
                        className="w-4 h-4"
                      />
                    )}
                  </div>
                </th>
              ))}
              {actions.length > 0 && (
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                {columns.map((column) => (
                  <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {column.render ? column.render(item[column.key], item) : item[column.key]}
                  </td>
                ))}
                {actions.length > 0 && (
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      {actions.map((action, actionIndex) => (
                        <button
                          key={actionIndex}
                          onClick={() => action.onClick(item)}
                          className={`px-3 py-1 rounded text-xs font-medium ${action.className}`}
                        >
                          {action.icon && <Icon icon={action.icon} className="w-3 h-3 mr-1" />}
                          {action.label}
                        </button>
                      ))}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-3 border-t border-gray-200 flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, data.length)} of {data.length} results
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage * itemsPerPage >= data.length}
            className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResponsiveTable;
```

## Wireframe Specifications

### Desktop Layout (1440px+)
- **Header**: 80px height with navigation and user menu
- **Sidebar**: 280px width with collapsible navigation
- **Main Content**: Fluid width with 24px padding
- **Cards**: 8px border radius, 1px border, subtle shadow

### Tablet Layout (768px - 1439px)
- **Header**: 72px height with hamburger menu
- **Sidebar**: Overlay navigation (320px width)
- **Main Content**: Full width with 16px padding
- **Grid**: 2-column layout for cards

### Mobile Layout (320px - 767px)
- **Header**: 64px height with minimal navigation
- **Bottom Navigation**: 72px height with 5 main actions
- **Main Content**: Single column with 16px padding
- **Cards**: Stack vertically with full width

### Accessibility Features
- **Keyboard Navigation**: Full tab order support
- **Screen Reader**: ARIA labels and landmarks
- **Color Contrast**: WCAG AA compliance (4.5:1 ratio)
- **Focus Indicators**: Visible focus states
- **Text Scaling**: Support up to 200% zoom

This component library provides a comprehensive foundation for building the incubation management platform with consistent, accessible, and responsive user interfaces.
```
