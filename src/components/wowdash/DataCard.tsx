import React from 'react';

interface DataCardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  headerAction?: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  noPadding?: boolean;
  shadow?: 'none' | 'sm' | 'md' | 'lg';
}

const DataCard: React.FC<DataCardProps> = ({
  children,
  title,
  subtitle,
  headerAction,
  className = '',
  bodyClassName = '',
  noPadding = false,
  shadow = 'sm',
}) => {
  const shadowClass = shadow === 'none' ? 'shadow-none' : `shadow-${shadow}`;
  
  return (
    <div className={`card ${shadowClass} border ${className}`}>
      {(title || subtitle || headerAction) && (
        <div className="card-header bg-white border-bottom px-24 py-16">
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
            <div>
              {title && (
                <h6 className="mb-0 fw-semibold text-neutral-900">{title}</h6>
              )}
              {subtitle && (
                <p className="text-sm text-neutral-600 mb-0 mt-1">{subtitle}</p>
              )}
            </div>
            {headerAction && <div>{headerAction}</div>}
          </div>
        </div>
      )}
      <div className={`card-body ${noPadding ? 'p-0' : 'p-24'} ${bodyClassName}`}>
        {children}
      </div>
    </div>
  );
};

export default DataCard;

