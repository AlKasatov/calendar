import React from 'react';
import './reset.css';
import './globalStyles.css';

export const WithStyles = ({ children }: React.PropsWithChildren) => {
  return <>{children}</>;
};
