import React from 'react';
import HubNavbar from './components/hub/HubNavbar';

const WithNavbar = ({ component: WrappedComponent, ...rest }) => {
  return (
    <div>
      <HubNavbar />
      <WrappedComponent {...rest} />
    </div>
  );
};

export default WithNavbar;