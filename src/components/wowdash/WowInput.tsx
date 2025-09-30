import React from 'react';

interface WowInputProps {
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

const WowInput: React.FC<WowInputProps> = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  className = '',
  icon,
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          {label}
          {required && <span className="text-danger-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={`
            w-full px-4 py-2.5 bg-white border rounded-lg
            text-neutral-900 placeholder-neutral-400
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
            transition-all duration-200
            ${icon ? 'pl-10' : ''}
            ${error ? 'border-danger-500 focus:ring-danger-500' : 'border-neutral-300'}
            ${disabled ? 'bg-neutral-100 cursor-not-allowed' : ''}
          `}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-danger-500">{error}</p>
      )}
    </div>
  );
};

export default WowInput;

