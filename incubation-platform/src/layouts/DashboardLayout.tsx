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
import Button from '../components/ui/Button';

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
    <div className="h-screen flex overflow-hidden bg-secondary-50">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 flex z-40 md:hidden ${sidebarOpen ? '' : 'hidden'}`}>
        <div className="fixed inset-0 bg-secondary-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
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
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
          <button
            className="px-4 border-r border-secondary-200 text-secondary-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex">
              <div className="w-full flex md:ml-0">
                <div className="relative w-full text-secondary-400 focus-within:text-secondary-600">
                  {/* Search can be added here */}
                </div>
              </div>
            </div>
            
            <div className="ml-4 flex items-center md:ml-6">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-secondary-700">
                  {user?.email}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  icon={LogOut}
                  onClick={handleSignOut}
                >
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const SidebarContent: React.FC = () => {
  const navigate = useNavigate();
  const currentPath = window.location.pathname;

  return (
    <div className="flex flex-col h-0 flex-1 border-r border-secondary-200 bg-white">
      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <h1 className="text-xl font-bold text-primary-600">
            Incubation Platform
          </h1>
        </div>
        
        <nav className="mt-5 flex-1 px-2 space-y-1">
          {sidebarItems.map((item) => {
            const isActive = currentPath === item.href;
            return (
              <button
                key={item.name}
                onClick={() => navigate(item.href)}
                className={`
                  sidebar-nav-item w-full text-left
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
