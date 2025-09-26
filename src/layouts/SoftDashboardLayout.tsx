import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Search, Bell, Settings, User, Menu, X } from 'lucide-react';
import SoftSidebar from '../components/layout/SoftSidebar';
import SoftButton from '../components/ui/SoftButton';
import { useAuth } from '../contexts/AuthContext';

const SoftDashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { } = useAuth();

  return (
    <div className="min-h-screen bg-background-default flex">
      {/* Mobile sidebar overlay */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
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
          <SoftSidebar />
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <SoftSidebar />
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navigation */}
        <header className="bg-transparent">
          <div className="flex items-center justify-between px-6 py-4">
            {/* Left side - Breadcrumb */}
            <div className="flex items-center">
              <button
                className="lg:hidden p-2 rounded-lg text-secondary-500 hover:bg-light-200 mr-2"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </button>
              
              <nav className="flex items-center space-x-2 text-sm">
                <span className="text-secondary-400">🏠</span>
                <span className="text-secondary-400">/</span>
                <span className="text-secondary-500">Dashboard</span>
              </nav>
            </div>

            {/* Center - Page Title */}
            <div className="hidden md:block">
              <h1 className="text-lg font-medium text-dark-700">Dashboard</h1>
            </div>

            {/* Right side - Search and User Actions */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative hidden md:block">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-secondary-400" />
                </div>
                <input
                  type="text"
                  placeholder="Type here..."
                  className="w-64 pl-10 pr-4 py-2 bg-white border border-light-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* User Actions */}
              <div className="flex items-center space-x-2">
                <SoftButton variant="outline" size="sm" className="hidden md:flex">
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </SoftButton>
                
                <button className="p-2 text-secondary-500 hover:text-dark-700">
                  <Settings className="h-5 w-5" />
                </button>
                
                <button className="p-2 text-secondary-500 hover:text-dark-700">
                  <Bell className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SoftDashboardLayout;
