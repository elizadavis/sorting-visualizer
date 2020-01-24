import React from 'react';
import AutoDismissAlert from './AutoDismissAlert';

export const Alerts = ({ alerts }) => {
  return (
    <React.Fragment>
      {alerts.map((alert, index) => (
        <AutoDismissAlert
          key={index}
          heading={alert.heading}
          variant={alert.variant}
          message={alert.message}
        />
      ))}
    </React.Fragment>
  );
};
