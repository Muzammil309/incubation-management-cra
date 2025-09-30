import React from 'react';
import { Icon } from '@iconify/react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  iconBgColor: string;
  trend?: {
    value: string;
    isPositive: boolean;
    label: string;
  };
  gradientClass?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  iconBgColor,
  trend,
  gradientClass = 'bg-gradient-start-1',
}) => {
  return (
    <div className={`card shadow-none border ${gradientClass} h-100`}>
      <div className="card-body p-20">
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
          <div>
            <p className="fw-medium text-primary-light mb-1">{title}</p>
            <h6 className="mb-0">{value}</h6>
          </div>
          <div className={`w-50-px h-50-px ${iconBgColor} rounded-circle d-flex justify-content-center align-items-center`}>
            <Icon icon={icon} className="text-white text-2xl mb-0" />
          </div>
        </div>
        {trend && (
          <p className="fw-medium text-sm text-primary-light mt-12 mb-0 d-flex align-items-center gap-2">
            <span className={`d-inline-flex align-items-center gap-1 ${trend.isPositive ? 'text-success-main' : 'text-danger-main'}`}>
              <Icon icon={trend.isPositive ? 'bxs:up-arrow' : 'bxs:down-arrow'} className="text-xs" />
              {trend.value}
            </span>
            {trend.label}
          </p>
        )}
      </div>
    </div>
  );
};

export default StatCard;

