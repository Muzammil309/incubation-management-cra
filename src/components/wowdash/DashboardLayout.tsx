import React from 'react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  headerAction?: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  title,
  subtitle,
  headerAction,
}) => {
  return (
    <div className="dashboard-main-wrapper">
      {(title || subtitle || headerAction) && (
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
          <div>
            {title && (
              <h6 className="fw-semibold mb-0 text-neutral-900">{title}</h6>
            )}
            {subtitle && (
              <p className="text-sm text-neutral-600 mb-0 mt-1">{subtitle}</p>
            )}
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      <div className="row gy-4">{children}</div>
    </div>
  );
};

export default DashboardLayout;

