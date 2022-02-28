import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Annonce from './annonce';
import AnnonceDetail from './annonce-detail';
import AnnonceUpdate from './annonce-update';
import AnnonceDeleteDialog from './annonce-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={AnnonceUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={AnnonceUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={AnnonceDetail} />
      <ErrorBoundaryRoute path={match.url} component={Annonce} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={AnnonceDeleteDialog} />
  </>
);

export default Routes;
