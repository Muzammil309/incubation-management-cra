import React, { useEffect } from 'react';
import { Icon } from '@iconify/react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  onClose: () => void;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return 'mdi:check-circle';
      case 'error':
        return 'mdi:alert-circle';
      case 'warning':
        return 'mdi:alert';
      case 'info':
        return 'mdi:information';
      default:
        return 'mdi:information';
    }
  };

  const getColorClass = () => {
    switch (type) {
      case 'success':
        return 'bg-success-500 text-white';
      case 'error':
        return 'bg-danger-500 text-white';
      case 'warning':
        return 'bg-warning-500 text-white';
      case 'info':
        return 'bg-info-500 text-white';
      default:
        return 'bg-neutral-800 text-white';
    }
  };

  return (
    <div
      className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg ${getColorClass()} animate-slide-in-right`}
      style={{ minWidth: '300px', maxWidth: '500px' }}
    >
      <Icon icon={getIcon()} className="text-2xl flex-shrink-0" />
      <p className="flex-1 text-sm font-medium">{message}</p>
      <button
        onClick={onClose}
        className="flex-shrink-0 hover:opacity-80 transition-opacity"
      >
        <Icon icon="mdi:close" className="text-xl" />
      </button>
    </div>
  );
};

export default Toast;

