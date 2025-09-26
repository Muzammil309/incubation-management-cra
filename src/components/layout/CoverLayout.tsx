import React from 'react';
import SoftBox from '../ui/SoftBox';
import SoftTypography from '../ui/SoftTypography';

interface CoverLayoutProps {
  title: string;
  description: string;
  image: string;
  color?: 'primary' | 'info' | 'success' | 'warning' | 'error' | 'dark';
  top?: number;
  children: React.ReactNode;
}

const CoverLayout: React.FC<CoverLayoutProps> = ({
  title,
  description,
  image,
  color = 'info',
  top = 20,
  children,
}) => {
  return (
    <SoftBox
      minHeight="100vh"
      position="relative"
      className="bg-white"
    >
      {/* Main Container */}
      <SoftBox
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight="75vh"
        className="relative z-10"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Side - Form */}
            <div className="w-full max-w-md mx-auto lg:mx-0">
              <SoftBox mt={top}>
                <SoftBox pt={3} px={3}>
                  <SoftBox mb={1}>
                    <SoftTypography 
                      variant="h3" 
                      fontWeight="bold" 
                      color={color} 
                      textGradient
                    >
                      {title}
                    </SoftTypography>
                  </SoftBox>
                  <SoftTypography 
                    variant="body2" 
                    fontWeight="regular" 
                    color="text"
                  >
                    {description}
                  </SoftTypography>
                </SoftBox>
                <SoftBox p={3}>
                  {children}
                </SoftBox>
              </SoftBox>
            </div>

            {/* Right Side - Image */}
            <div className="hidden lg:block">
              <SoftBox
                height="100%"
                position="relative"
                className="transform skew-x-[-10deg] overflow-hidden rounded-bl-3xl"
                sx={{
                  right: '-12rem',
                  marginRight: '-4rem',
                }}
              >
                <SoftBox
                  className="transform skew-x-[10deg] h-full"
                  sx={{
                    marginLeft: '-2rem',
                    backgroundImage: `url(${image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    minHeight: '600px',
                  }}
                >
                  {/* Background image container */}
                </SoftBox>
              </SoftBox>
            </div>
          </div>
        </div>
      </SoftBox>

      {/* Footer */}
      <SoftBox
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        py={3}
        className="bg-transparent"
      >
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

export default CoverLayout;
