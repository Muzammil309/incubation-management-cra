import React from 'react';

interface WowCardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  headerAction?: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  noPadding?: boolean;
}

const WowCard: React.FC<WowCardProps> = ({
  children,
  title,
  subtitle,
  headerAction,
  className = '',
  bodyClassName = '',
  noPadding = false,
}) => {
  return (
    <div className={`card ${className}`}>
      {(title || subtitle || headerAction) && (
        <div className="card-header bg-white border-b border-neutral-200 px-5 py-4">
          <div className="d-flex align-items-center justify-content-between">
            <div>
              {title && <h5 className="mb-0 fw-semibold text-neutral-900">{title}</h5>}
              {subtitle && <p className="text-sm text-neutral-600 mb-0 mt-1">{subtitle}</p>}
            </div>
            {headerAction && <div>{headerAction}</div>}
          </div>
        </div>
      )}
      <div className={`card-body ${noPadding ? 'p-0' : ''} ${bodyClassName}`}>
        {children}
      </div>
    </div>
  );
};

export default WowCard;

