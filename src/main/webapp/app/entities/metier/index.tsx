import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Metier from './metier';
import MetierDetail from './metier-detail';
import MetierUpdate from './metier-update';
import MetierDeleteDialog from './metier-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={MetierUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={MetierUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={MetierDetail} />
      <ErrorBoundaryRoute path={match.url} component={Metier} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={MetierDeleteDialog} />
  </>
);

export default Routes;
