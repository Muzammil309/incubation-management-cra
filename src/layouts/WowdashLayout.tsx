import React from 'react';
// MasterLayout is JS/JSX - TypeScript will accept due to allowJs
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import MasterLayout from '../wowdash/masterLayout/MasterLayout.jsx';

const WowdashLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <MasterLayout>
      {children}
    </MasterLayout>
  );
};

export default WowdashLayout;

