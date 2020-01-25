import React from 'react';
import { Route } from 'react-router-dom';
import { MainPage, ContributorsPage } from '../Pages';

export const Routes = () => {
  return (
    <div className="page">
      <Route exact path="/" component={MainPage} />
      <Route exact path="/contributors" component={ContributorsPage} />
    </div>
  );
};
