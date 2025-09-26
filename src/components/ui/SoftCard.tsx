import React from 'react';

interface SoftCardProps {
  children: React.ReactNode;
  variant?: 'default' | 'gradient' | 'blur';
  gradientType?: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error' | 'dark';
  className?: string;
  hover?: boolean;
}

const SoftCard: React.FC<SoftCardProps> = ({
  children,
  variant = 'default',
  gradientType = 'primary',
  className = '',
  hover = true,
}) => {
  const baseClasses = 'rounded-2xl border-0 p-6 transition-all duration-300';
  
  const variantClasses = {
    default: 'bg-white shadow-soft-lg',
    gradient: `bg-gradient-${gradientType} text-white shadow-soft-lg`,
    blur: 'bg-white/80 backdrop-blur-soft shadow-soft-lg border border-white/20',
  };
  
  const hoverClasses = hover ? 'hover:shadow-soft-xl hover:-translate-y-1' : '';
  
  const cardClasses = `${baseClasses} ${variantClasses[variant]} ${hoverClasses} ${className}`;

  return (
    <div className={cardClasses}>
      {children}
    </div>
  );
};

export default SoftCard;
