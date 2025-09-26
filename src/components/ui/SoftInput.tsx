import React from 'react';

interface SoftInputProps {
  label?: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  success?: boolean;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

const SoftInput: React.FC<SoftInputProps> = ({
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
  error,
  success,
  disabled = false,
  required = false,
  className = '',
  icon,
}) => {
  const getInputClasses = () => {
    const baseClasses = 'w-full px-4 py-3 rounded-lg text-dark-700 placeholder-secondary-400 transition-all duration-300 focus:outline-none';
    
    if (error) {
      return `${baseClasses} bg-white border border-error-500 focus:shadow-soft-input-error focus:border-error-500`;
    }
    
    if (success) {
      return `${baseClasses} bg-white border border-success-500 focus:shadow-soft-input-success focus:border-success-500`;
    }
    
    return `${baseClasses} bg-white border border-light-300 focus:shadow-soft-input-focus focus:border-info-500`;
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-dark-700">
          {label}
          {required && <span className="text-error-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <div className="text-secondary-400">
              {icon}
            </div>
          </div>
        )}
        
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={`${getInputClasses()} ${icon ? 'pl-10' : ''}`}
        />
      </div>
      
      {error && (
        <p className="text-sm text-error-500 mt-1">
          {error}
        </p>
      )}
      
      {success && !error && (
        <p className="text-sm text-success-500 mt-1">
          Input is valid
        </p>
      )}
    </div>
  );
};

export default SoftInput;
