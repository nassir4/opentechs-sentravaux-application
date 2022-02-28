import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Devis from './devis';
import DevisDetail from './devis-detail';
import DevisUpdate from './devis-update';
import DevisDeleteDialog from './devis-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={DevisUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={DevisUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={DevisDetail} />
      <ErrorBoundaryRoute path={match.url} component={Devis} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={DevisDeleteDialog} />
  </>
);

export default Routes;
