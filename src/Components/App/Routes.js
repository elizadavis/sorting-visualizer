import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { MainPage, ContributorsPage, NotFoundPage } from '../Pages';

export const Routes = () => {
  return (
    <div className="page">
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/contributors" component={ContributorsPage} />
        <Route path="/" component={NotFoundPage} />
      </Switch>
    </div>
  );
};
