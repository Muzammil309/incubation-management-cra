import React from 'react';

interface SoftButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const SoftButton: React.FC<SoftButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  className = '',
  type = 'button',
}) => {
  const baseClasses = 'font-bold uppercase tracking-wide rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-opacity-50';
  
  const variantClasses = {
    primary: 'bg-gradient-primary text-white shadow-soft-button hover:shadow-soft-button-hover focus:ring-primary-300',
    secondary: 'bg-gradient-secondary text-white shadow-soft-button hover:shadow-soft-button-hover focus:ring-secondary-300',
    info: 'bg-gradient-info text-white shadow-soft-button hover:shadow-soft-button-hover focus:ring-info-300',
    success: 'bg-gradient-success text-white shadow-soft-button hover:shadow-soft-button-hover focus:ring-success-300',
    warning: 'bg-gradient-warning text-white shadow-soft-button hover:shadow-soft-button-hover focus:ring-warning-300',
    error: 'bg-gradient-error text-white shadow-soft-button hover:shadow-soft-button-hover focus:ring-error-300',
    outline: 'bg-transparent border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white focus:ring-primary-300',
  };
  
  const sizeClasses = {
    sm: 'text-xs py-2 px-4',
    md: 'text-sm py-3 px-6',
    lg: 'text-base py-4 px-8',
  };
  
  const disabledClasses = disabled 
    ? 'opacity-50 cursor-not-allowed transform-none hover:transform-none hover:shadow-none' 
    : '';

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`;

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default SoftButton;
