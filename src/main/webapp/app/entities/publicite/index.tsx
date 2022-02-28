import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Publicite from './publicite';
import PubliciteDetail from './publicite-detail';
import PubliciteUpdate from './publicite-update';
import PubliciteDeleteDialog from './publicite-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PubliciteUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PubliciteUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PubliciteDetail} />
      <ErrorBoundaryRoute path={match.url} component={Publicite} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={PubliciteDeleteDialog} />
  </>
);

export default Routes;
