import React from 'react';

interface Tab {
  id: string;
  label: string;
  icon?: string;
  badge?: number;
}

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  variant?: 'default' | 'pills' | 'underline';
  className?: string;
}

const TabNavigation: React.FC<TabNavigationProps> = ({
  tabs,
  activeTab,
  onTabChange,
  variant = 'pills',
  className = '',
}) => {
  const getTabClasses = (tabId: string) => {
    const baseClasses = 'nav-link';
    const activeClasses = activeTab === tabId ? 'active' : '';
    
    if (variant === 'pills') {
      return `${baseClasses} ${activeClasses} px-4 py-2 rounded-lg fw-medium transition-all`;
    } else if (variant === 'underline') {
      return `${baseClasses} ${activeClasses} px-4 py-2 border-bottom-2 fw-medium`;
    }
    return `${baseClasses} ${activeClasses}`;
  };

  return (
    <div className={`card mb-4 ${className}`}>
      <div className="card-body p-0">
        <ul className={`nav ${variant === 'pills' ? 'nav-pills' : 'nav-tabs'} gap-2 p-3 flex-wrap`}>
          {tabs.map((tab) => (
            <li className="nav-item" key={tab.id}>
              <button
                className={getTabClasses(tab.id)}
                onClick={() => onTabChange(tab.id)}
                type="button"
              >
                {tab.icon && (
                  <i className={`${tab.icon} me-2`}></i>
                )}
                {tab.label}
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className="badge bg-primary ms-2 rounded-pill">
                    {tab.badge}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TabNavigation;

