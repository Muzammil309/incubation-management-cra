import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  Menu,
  X,
  Home,
  Users,
  Building2,
  TrendingUp,
  Calendar,
  DollarSign,
  Settings,
  LogOut
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import SoftButton from '../components/ui/SoftButton';

interface SidebarItem {
  name: string;
  href: string;
  icon: React.ComponentType<any>;
  roles?: string[];
}

const sidebarItems: SidebarItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Startups', href: '/startups', icon: Building2 },
  { name: 'Mentors', href: '/mentors', icon: Users },
  { name: 'Analytics', href: '/analytics', icon: TrendingUp },
  { name: 'Events', href: '/events', icon: Calendar },
  { name: 'Investments', href: '/investments', icon: DollarSign, roles: ['admin', 'investor'] },
  { name: 'Settings', href: '/settings', icon: Settings },
];

const DashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth/login');
  };

  return (
    <div className="h-screen flex overflow-hidden bg-background-default">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 flex z-40 md:hidden ${sidebarOpen ? '' : 'hidden'}`}>
        <div className="fixed inset-0 bg-dark-700 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="relative flex-1 flex flex-col max-w-xs w-full">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
          <SidebarContent />
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <SidebarContent />
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        {/* Top navigation */}
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow-soft-navbar rounded-b-2xl mx-4 mt-4">
          <button
            className="px-4 border-r border-light-200 text-secondary-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 md:hidden rounded-l-2xl"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="flex-1 px-4 flex justify-between items-center">
            <div className="flex-1 flex">
              <div className="w-full flex md:ml-0">
                <div className="relative w-full text-secondary-400 focus-within:text-secondary-600">
                  {/* Search can be added here */}
                </div>
              </div>
            </div>

            <div className="ml-4 flex items-center md:ml-6">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-dark-700">
                  {user?.email}
                </span>
                <SoftButton
                  variant="outline"
                  size="sm"
                  onClick={handleSignOut}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </SoftButton>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

const SidebarContent: React.FC = () => {
  const navigate = useNavigate();
  const currentPath = window.location.pathname;

  return (
    <div className="sidebar-soft h-full">
      <div className="flex-1 flex flex-col overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4 mb-6">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center mr-3">
            <span className="text-white font-bold text-lg">I</span>
          </div>
          <h1 className="text-lg font-bold text-dark-700">
            Incubation Platform
          </h1>
        </div>

        <nav className="sidebar-nav-soft">
          {sidebarItems.map((item) => {
            const isActive = currentPath === item.href;
            return (
              <button
                key={item.name}
                onClick={() => navigate(item.href)}
                className={`
                  sidebar-nav-item-soft w-full text-left
                  ${isActive ? 'active' : ''}
                `}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default DashboardLayout;
