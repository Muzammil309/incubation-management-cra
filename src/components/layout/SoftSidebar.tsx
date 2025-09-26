import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, 
  BarChart3, 
  CreditCard, 
  Eye,
  Rocket,
  User,
  UserPlus,
  Star
} from 'lucide-react';
import SoftCard from '../ui/SoftCard';
import SoftButton from '../ui/SoftButton';

interface SidebarItem {
  name: string;
  href: string;
  icon: React.ComponentType<any>;
  active?: boolean;
}

const sidebarItems: SidebarItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Startups', href: '/startups', icon: BarChart3 },
  { name: 'Mentors', href: '/mentors', icon: CreditCard },
  { name: 'Events', href: '/events', icon: Eye },
  { name: 'Analytics', href: '/analytics', icon: Rocket },
];

const accountItems: SidebarItem[] = [
  { name: 'Profile', href: '/profile', icon: User },
  { name: 'Sign In', href: '/auth/login', icon: UserPlus },
  { name: 'Sign Up', href: '/auth/signup', icon: UserPlus },
];

const SoftSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="w-64 h-full bg-white rounded-2xl shadow-soft-lg m-4 p-4 flex flex-col">
      {/* Logo Section */}
      <div className="flex items-center mb-8 px-2">
        <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center mr-3">
          <span className="text-white font-bold text-sm">S</span>
        </div>
        <h1 className="text-lg font-bold text-dark-700">Soft UI Dashboard</h1>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 space-y-2">
        {sidebarItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <button
              key={item.name}
              onClick={() => navigate(item.href)}
              className={`
                w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300
                ${isActive
                  ? 'bg-gradient-primary text-white shadow-soft-button'
                  : 'text-secondary-600 hover:bg-light-200'
                }
              `}
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.name}
            </button>
          );
        })}
      </nav>

      {/* Account Pages Section */}
      <div className="mt-8">
        <h3 className="text-xs font-bold text-secondary-500 uppercase tracking-wider mb-4 px-4">
          Account Pages
        </h3>
        <div className="space-y-2">
          {accountItems.map((item) => (
            <button
              key={item.name}
              onClick={() => navigate(item.href)}
              className="w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 text-secondary-600 hover:bg-light-200"
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.name}
            </button>
          ))}
        </div>
      </div>

      {/* Help Card */}
      <div className="mt-8">
        <SoftCard variant="gradient" gradientType="primary" className="text-center p-4">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <Star className="h-6 w-6 text-white" />
          </div>
          <h4 className="text-sm font-bold mb-2">Need help?</h4>
          <p className="text-xs opacity-90 mb-4">
            Please check our docs
          </p>
          <SoftButton 
            variant="outline" 
            size="sm" 
            className="border-white text-white hover:bg-white hover:text-primary-500 w-full"
          >
            DOCUMENTATION
          </SoftButton>
        </SoftCard>
      </div>
    </div>
  );
};

export default SoftSidebar;
