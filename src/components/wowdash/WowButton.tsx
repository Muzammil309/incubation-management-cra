import React from 'react';

interface WowButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'success' | 'danger' | 'warning' | 'info' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

const WowButton: React.FC<WowButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  onClick,
  disabled = false,
  type = 'button',
  className = '',
}) => {
  const baseClasses = 'font-medium rounded-lg transition-colors duration-200 inline-flex items-center justify-center';
  
  const variantClasses = {
    primary: 'bg-primary-500 text-white hover:bg-primary-600 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
    success: 'bg-success-500 text-white hover:bg-success-600 focus:ring-2 focus:ring-success-500 focus:ring-offset-2',
    danger: 'bg-danger-500 text-white hover:bg-danger-600 focus:ring-2 focus:ring-danger-500 focus:ring-offset-2',
    warning: 'bg-warning-500 text-white hover:bg-warning-600 focus:ring-2 focus:ring-warning-500 focus:ring-offset-2',
    info: 'bg-info-500 text-white hover:bg-info-600 focus:ring-2 focus:ring-info-500 focus:ring-offset-2',
    secondary: 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300 focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${disabledClass} ${className}`}
    >
      {children}
    </button>
  );
};

export default WowButton;

