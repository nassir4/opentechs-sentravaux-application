import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Ouvrier from './ouvrier';
import OuvrierDetail from './ouvrier-detail';
import OuvrierUpdate from './ouvrier-update';
import OuvrierDeleteDialog from './ouvrier-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={OuvrierUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={OuvrierUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={OuvrierDetail} />
      <ErrorBoundaryRoute path={match.url} component={Ouvrier} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={OuvrierDeleteDialog} />
  </>
);

export default Routes;
