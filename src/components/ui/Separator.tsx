import React from 'react';
import SoftBox from './SoftBox';
import SoftTypography from './SoftTypography';

interface SeparatorProps {
  text?: string;
}

const Separator: React.FC<SeparatorProps> = ({ text = "or" }) => {
  return (
    <SoftBox className="relative my-6">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-300"></div>
      </div>
      <div className="relative flex justify-center text-sm">
        <SoftTypography 
          variant="caption" 
          color="text" 
          className="bg-white px-2"
        >
          {text}
        </SoftTypography>
      </div>
    </SoftBox>
  );
};

export default Separator;
