import React from 'react';

interface SoftTypographyProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'button' | 'caption' | 'subtitle1' | 'subtitle2';
  component?: string | React.ComponentType<any>;
  color?: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error' | 'dark' | 'light' | 'text' | 'white';
  fontWeight?: 'light' | 'regular' | 'medium' | 'bold';
  textGradient?: boolean;
  className?: string;
  sx?: React.CSSProperties;
  [key: string]: any;
}

const SoftTypography: React.FC<SoftTypographyProps> = ({
  children,
  variant = 'body1',
  component,
  color = 'text',
  fontWeight = 'regular',
  textGradient = false,
  className = '',
  sx,
  ...props
}) => {
  // Determine the component to render
  const getComponent = () => {
    if (component) return component;
    
    switch (variant) {
      case 'h1': return 'h1';
      case 'h2': return 'h2';
      case 'h3': return 'h3';
      case 'h4': return 'h4';
      case 'h5': return 'h5';
      case 'h6': return 'h6';
      case 'button': return 'span';
      case 'caption': return 'span';
      case 'subtitle1': return 'h6';
      case 'subtitle2': return 'h6';
      default: return 'p';
    }
  };

  // Get variant classes
  const getVariantClasses = () => {
    switch (variant) {
      case 'h1': return 'text-5xl font-bold leading-tight';
      case 'h2': return 'text-4xl font-bold leading-tight';
      case 'h3': return 'text-3xl font-bold leading-tight';
      case 'h4': return 'text-2xl font-bold leading-tight';
      case 'h5': return 'text-xl font-bold leading-tight';
      case 'h6': return 'text-lg font-bold leading-tight';
      case 'subtitle1': return 'text-base font-medium leading-relaxed';
      case 'subtitle2': return 'text-sm font-medium leading-relaxed';
      case 'body1': return 'text-base leading-relaxed';
      case 'body2': return 'text-sm leading-relaxed';
      case 'button': return 'text-sm font-medium uppercase tracking-wide';
      case 'caption': return 'text-xs leading-relaxed';
      default: return 'text-base leading-relaxed';
    }
  };

  // Get color classes
  const getColorClasses = () => {
    if (textGradient) {
      switch (color) {
        case 'primary': return 'bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent';
        case 'info': return 'bg-gradient-to-r from-info-500 to-info-600 bg-clip-text text-transparent';
        case 'success': return 'bg-gradient-to-r from-success-500 to-success-600 bg-clip-text text-transparent';
        case 'warning': return 'bg-gradient-to-r from-warning-500 to-warning-600 bg-clip-text text-transparent';
        case 'error': return 'bg-gradient-to-r from-error-500 to-error-600 bg-clip-text text-transparent';
        case 'dark': return 'bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent';
        default: return 'bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent';
      }
    }

    switch (color) {
      case 'primary': return 'text-primary-600';
      case 'secondary': return 'text-secondary-600';
      case 'info': return 'text-info-600';
      case 'success': return 'text-success-600';
      case 'warning': return 'text-warning-600';
      case 'error': return 'text-error-600';
      case 'dark': return 'text-gray-900';
      case 'light': return 'text-gray-100';
      case 'text': return 'text-gray-700';
      case 'white': return 'text-white';
      default: return 'text-gray-700';
    }
  };

  // Get font weight classes
  const getFontWeightClasses = () => {
    switch (fontWeight) {
      case 'light': return 'font-light';
      case 'regular': return 'font-normal';
      case 'medium': return 'font-medium';
      case 'bold': return 'font-bold';
      default: return 'font-normal';
    }
  };

  const Component = getComponent() as any;

  const classes = [
    getVariantClasses(),
    getColorClasses(),
    getFontWeightClasses(),
    'font-roboto', // Ensure Roboto font is used
    className,
  ].filter(Boolean).join(' ');

  return (
    <Component className={classes} style={sx} {...props}>
      {children}
    </Component>
  );
};

export default SoftTypography;
