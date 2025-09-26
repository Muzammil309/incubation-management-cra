import React from 'react';

interface SoftBadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const SoftBadge: React.FC<SoftBadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
}) => {
  const baseClasses = 'inline-flex items-center font-bold uppercase tracking-wide rounded-full';
  
  const variantClasses = {
    primary: 'bg-primary-100 text-primary-600',
    secondary: 'bg-secondary-100 text-secondary-600',
    info: 'bg-info-100 text-info-600',
    success: 'bg-success-100 text-success-600',
    warning: 'bg-warning-100 text-warning-600',
    error: 'bg-error-100 text-error-600',
  };
  
  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-xs px-3 py-1',
    lg: 'text-sm px-4 py-2',
  };
  
  const badgeClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return (
    <span className={badgeClasses}>
      {children}
    </span>
  );
};

export default SoftBadge;
