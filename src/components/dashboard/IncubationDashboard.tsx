import React from 'react';
import SoftCard from '../ui/SoftCard';
import SoftButton from '../ui/SoftButton';
import { 
  DollarSign, 
  Users, 
  UserPlus, 
  TrendingUp,
  ArrowUp,
  ArrowDown,
  Rocket,
  BarChart3
} from 'lucide-react';

const IncubationDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-background-default p-6">
      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Today's Money */}
        <SoftCard className="relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-secondary-500 mb-1">Today's Money</p>
              <div className="flex items-center">
                <h3 className="text-2xl font-bold text-dark-700">$53,000</h3>
                <div className="flex items-center ml-2 text-success-500">
                  <ArrowUp className="h-4 w-4" />
                  <span className="text-sm font-medium">+55%</span>
                </div>
              </div>
            </div>
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
          </div>
        </SoftCard>

        {/* Today's Users */}
        <SoftCard className="relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-secondary-500 mb-1">Today's Users</p>
              <div className="flex items-center">
                <h3 className="text-2xl font-bold text-dark-700">2,300</h3>
                <div className="flex items-center ml-2 text-success-500">
                  <ArrowUp className="h-4 w-4" />
                  <span className="text-sm font-medium">+3%</span>
                </div>
              </div>
            </div>
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
              <Users className="h-6 w-6 text-white" />
            </div>
          </div>
        </SoftCard>

        {/* New Clients */}
        <SoftCard className="relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-secondary-500 mb-1">New Clients</p>
              <div className="flex items-center">
                <h3 className="text-2xl font-bold text-dark-700">+3,462</h3>
                <div className="flex items-center ml-2 text-error-500">
                  <ArrowDown className="h-4 w-4" />
                  <span className="text-sm font-medium">-2%</span>
                </div>
              </div>
            </div>
            <div className="w-12 h-12 bg-gradient-info rounded-xl flex items-center justify-center">
              <UserPlus className="h-6 w-6 text-white" />
            </div>
          </div>
        </SoftCard>

        {/* Sales */}
        <SoftCard className="relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-secondary-500 mb-1">Sales</p>
              <div className="flex items-center">
                <h3 className="text-2xl font-bold text-dark-700">$103,430</h3>
                <div className="flex items-center ml-2 text-success-500">
                  <ArrowUp className="h-4 w-4" />
                  <span className="text-sm font-medium">+5%</span>
                </div>
              </div>
            </div>
            <div className="w-12 h-12 bg-gradient-success rounded-xl flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
          </div>
        </SoftCard>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Build by developers card */}
        <SoftCard>
          <div className="mb-4">
            <p className="text-sm font-medium text-secondary-500 mb-2">Build by developers</p>
            <h3 className="text-xl font-bold text-dark-700 mb-3">Soft UI Dashboard</h3>
            <p className="text-sm text-secondary-500 mb-6">
              From colors, cards, typography to complex elements, you will find the full documentation.
            </p>
            <SoftButton variant="outline" size="sm">
              Read More →
            </SoftButton>
          </div>
        </SoftCard>

        {/* Rocket Card */}
        <SoftCard variant="gradient" gradientType="info" className="relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center justify-center mb-4">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                <Rocket className="h-10 w-10 text-white" />
              </div>
            </div>
          </div>
        </SoftCard>

        {/* Work with the rockets */}
        <SoftCard variant="gradient" gradientType="dark">
          <h3 className="text-xl font-bold mb-3">Work with the rockets</h3>
          <p className="text-sm opacity-90 mb-6">
            Wealth creation is an evolutionarily recent positive-sum game. It is all about who take the opportunity first.
          </p>
          <SoftButton variant="outline" size="sm" className="border-white text-white hover:bg-white hover:text-dark-700">
            Read More →
          </SoftButton>
        </SoftCard>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <SoftCard variant="gradient" gradientType="dark" className="h-80">
          <div className="h-full flex flex-col">
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-2">Sales Overview</h3>
              <div className="flex items-center text-sm opacity-90">
                <ArrowUp className="h-4 w-4 mr-1" />
                <span>4% more in 2021</span>
              </div>
            </div>
            
            {/* Chart Area */}
            <div className="flex-1 flex items-end justify-between px-4">
              {[200, 300, 250, 400, 350, 450, 300, 380, 420, 350, 400, 300].map((height, index) => (
                <div
                  key={index}
                  className="bg-white/30 rounded-t-lg"
                  style={{ 
                    height: `${(height / 450) * 100}%`,
                    width: '20px'
                  }}
                />
              ))}
            </div>
            
            {/* Chart Labels */}
            <div className="flex justify-between text-xs opacity-70 mt-4">
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
              <span>Aug</span>
              <span>Sep</span>
              <span>Oct</span>
              <span>Nov</span>
              <span>Dec</span>
            </div>
          </div>
        </SoftCard>

        {/* Sales Overview Line Chart */}
        <SoftCard>
          <div className="mb-6">
            <h3 className="text-lg font-bold text-dark-700 mb-2">Sales Overview</h3>
            <div className="flex items-center text-sm text-success-500">
              <ArrowUp className="h-4 w-4 mr-1" />
              <span>4% more in 2021</span>
            </div>
          </div>
          
          {/* Line Chart Area */}
          <div className="h-48 relative">
            <svg className="w-full h-full" viewBox="0 0 400 200">
              {/* Grid lines */}
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
              
              {/* Line chart paths */}
              <path
                d="M 20 150 Q 80 120 120 100 T 200 80 T 280 60 T 360 40"
                fill="none"
                stroke="#17c1e8"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M 20 180 Q 80 160 120 140 T 200 120 T 280 100 T 360 80"
                fill="none"
                stroke="#8392ab"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </SoftCard>
      </div>
    </div>
  );
};

export default IncubationDashboard;
