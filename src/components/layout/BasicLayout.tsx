import React from 'react';
import SoftBox from '../ui/SoftBox';
import SoftTypography from '../ui/SoftTypography';

interface BasicLayoutProps {
  title: string;
  description: string;
  image: string;
  children: React.ReactNode;
}

const BasicLayout: React.FC<BasicLayoutProps> = ({
  title,
  description,
  image,
  children,
}) => {
  return (
    <SoftBox minHeight="100vh" className="bg-gray-100">
      {/* Hero Section with Background Image */}
      <SoftBox
        className="relative"
        sx={{
          width: 'calc(100% - 2rem)',
          minHeight: '50vh',
          margin: '1rem',
          borderRadius: '1rem',
          paddingTop: '6rem',
          paddingBottom: '28rem',
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 justify-center text-center">
            <div className="lg:col-start-2">
              <SoftBox mt={6} mb={1}>
                <SoftTypography 
                  variant="h1" 
                  color="white" 
                  fontWeight="bold"
                >
                  {title}
                </SoftTypography>
              </SoftBox>
              <SoftBox mb={2}>
                <SoftTypography 
                  variant="body2" 
                  color="white" 
                  fontWeight="regular"
                >
                  {description}
                </SoftTypography>
              </SoftBox>
            </div>
          </div>
        </div>
      </SoftBox>

      {/* Form Section */}
      <SoftBox 
        className="relative"
        sx={{
          marginTop: '-26rem',
          paddingLeft: '1rem',
          paddingRight: '1rem',
          width: 'calc(100% - 2rem)',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-4 justify-center">
            <div className="w-full max-w-md mx-auto">
              {children}
            </div>
          </div>
        </div>
      </SoftBox>

      {/* Footer */}
      <SoftBox mt={8} py={6}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <SoftTypography variant="caption" color="text">
              © 2024 Incubation Management Platform. All rights reserved.
            </SoftTypography>
            <div className="flex space-x-6 mt-2 md:mt-0">
              <SoftTypography 
                component="a" 
                href="#" 
                variant="caption" 
                color="text"
                className="hover:text-primary-600 transition-colors"
              >
                Privacy Policy
              </SoftTypography>
              <SoftTypography 
                component="a" 
                href="#" 
                variant="caption" 
                color="text"
                className="hover:text-primary-600 transition-colors"
              >
                Terms of Service
              </SoftTypography>
              <SoftTypography 
                component="a" 
                href="#" 
                variant="caption" 
                color="text"
                className="hover:text-primary-600 transition-colors"
              >
                Support
              </SoftTypography>
            </div>
          </div>
        </div>
      </SoftBox>
    </SoftBox>
  );
};

export default BasicLayout;
