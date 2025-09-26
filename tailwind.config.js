/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Soft UI Primary Colors
        primary: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#cb0c9f', // Main primary from Soft UI
          600: '#ad0a87', // Focus primary from Soft UI
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
        },
        // Soft UI Secondary Colors
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#96a2b8', // Focus secondary from Soft UI
          500: '#8392ab', // Main secondary from Soft UI
          600: '#64748b',
          700: '#475569',
          800: '#334155',
          900: '#1e293b',
        },
        // Soft UI Info Colors
        info: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#3acaeb', // Focus info from Soft UI
          500: '#17c1e8', // Main info from Soft UI
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        // Soft UI Success Colors
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#95dc39', // Focus success from Soft UI
          500: '#82d616', // Main success from Soft UI
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        // Soft UI Warning Colors
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fcd652', // Focus warning from Soft UI
          500: '#fbcf33', // Main warning from Soft UI
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        // Soft UI Error Colors
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ea0606', // Main error from Soft UI
          600: '#c70505', // Focus error from Soft UI
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        // Soft UI Dark Colors
        dark: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#344767', // Main dark from Soft UI
          800: '#1e293b',
          900: '#0f172a',
        },
        // Soft UI Light Colors
        light: {
          50: '#ffffff',
          100: '#f8f9fa', // Background default from Soft UI
          200: '#e9ecef', // Main light from Soft UI
          300: '#dee2e6',
          400: '#ced4da',
          500: '#adb5bd',
          600: '#6c757d',
          700: '#495057',
          800: '#343a40',
          900: '#212529',
        },
        // Soft UI Text Colors
        text: {
          main: '#67748e', // Main text from Soft UI
          focus: '#67748e', // Focus text from Soft UI
        },
        // Soft UI Background
        background: {
          default: '#f8f9fa', // Default background from Soft UI
        },
      },
      fontFamily: {
        sans: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'], // Soft UI font family
      },
      fontSize: {
        'xxs': '0.65rem',   // 10.4px - Soft UI fontSizeXXS
        'xs': '0.75rem',    // 12px - Soft UI fontSizeXS
        'sm': '0.875rem',   // 14px - Soft UI fontSizeSM
        'base': '1rem',     // 16px - Soft UI fontSizeMD
        'lg': '1.125rem',   // 18px - Soft UI fontSizeLG
        'xl': '1.25rem',    // 20px - Soft UI fontSizeXL
        '2xl': '1.5rem',    // 24px
        '3xl': '1.875rem',  // 30px - Soft UI h3
        '4xl': '2.25rem',   // 36px - Soft UI h2
        '5xl': '3rem',      // 48px - Soft UI h1
        '6xl': '3.5rem',    // 56px - Soft UI d4
        '7xl': '4rem',      // 64px - Soft UI d3
        '8xl': '4.5rem',    // 72px - Soft UI d2
        '9xl': '5rem',      // 80px - Soft UI d1
      },
      fontWeight: {
        light: 300,    // Soft UI fontWeightLight
        normal: 400,   // Soft UI fontWeightRegular
        medium: 500,   // Soft UI fontWeightMedium
        bold: 700,     // Soft UI fontWeightBold
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      // Soft UI Box Shadows
      boxShadow: {
        'soft-xs': '0 2px 9px -5px rgba(0, 0, 0, 0.15)',
        'soft-sm': '0 5px 10px 0 rgba(0, 0, 0, 0.12)',
        'soft-md': '0 4px 6px -1px rgba(20, 20, 20, 0.12), 0 2px 4px -1px rgba(20, 20, 20, 0.07)',
        'soft-lg': '0 8px 26px -4px rgba(20, 20, 20, 0.15), 0 8px 9px -5px rgba(20, 20, 20, 0.06)',
        'soft-xl': '0 23px 45px -11px rgba(20, 20, 20, 0.25)',
        'soft-xxl': '0 20px 27px 0 rgba(0, 0, 0, 0.05)',
        'soft-inset': 'inset 0 1px 2px 0 rgba(0, 0, 0, 0.075)',
        'soft-navbar': 'inset 0 0 1px 1px rgba(255, 255, 255, 0.9), 0 20px 27px 0 rgba(0, 0, 0, 0.05)',
        'soft-button': '0 4px 7px -1px rgba(0, 0, 0, 0.11), 0 2px 4px -1px rgba(0, 0, 0, 0.07)',
        'soft-button-hover': '0 3px 5px -1px rgba(0, 0, 0, 0.09), 0 2px 5px -1px rgba(0, 0, 0, 0.07)',
        'soft-input-focus': '0 0 0 2px rgba(129, 227, 249, 1)',
        'soft-input-error': '0 0 0 2px rgba(253, 92, 112, 0.6)',
        'soft-input-success': '0 0 0 2px rgba(102, 212, 50, 0.6)',
      },
      // Soft UI Gradients
      backgroundImage: {
        'gradient-primary': 'linear-gradient(310deg, #7928ca 0%, #ff0080 100%)',
        'gradient-secondary': 'linear-gradient(310deg, #627594 0%, #a8b8d8 100%)',
        'gradient-info': 'linear-gradient(310deg, #2152ff 0%, #21d4fd 100%)',
        'gradient-success': 'linear-gradient(310deg, #17ad37 0%, #98ec2d 100%)',
        'gradient-warning': 'linear-gradient(310deg, #f53939 0%, #fbcf33 100%)',
        'gradient-error': 'linear-gradient(310deg, #ea0606 0%, #ff667c 100%)',
        'gradient-light': 'linear-gradient(310deg, #ced4da 0%, #ebeff4 100%)',
        'gradient-dark': 'linear-gradient(310deg, #141727 0%, #3a416f 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'soft-bounce': 'softBounce 0.6s ease-in-out',
        'soft-pulse': 'softPulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        softBounce: {
          '0%, 100%': {
            transform: 'translateY(-25%)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'none',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
        softPulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
      // Soft UI specific utilities
      backdropBlur: {
        'soft': '20px',
      },
      transitionTimingFunction: {
        'soft': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        '400': '400ms',
      },
    },
  },
  plugins: [],
}
