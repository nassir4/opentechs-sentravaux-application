import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Admin from './admin';
import Ouvrier from './ouvrier';
import Client from './client';
import Adresse from './adresse';
import Annonce from './annonce';
import Media from './media';
import Metier from './metier';
import Categorie from './categorie';
import Produit from './produit';
import Commande from './commande';
import LigneCommande from './ligne-commande';
import Livraison from './livraison';
import Publicite from './publicite';
import Message from './message';
import Devis from './devis';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}admin`} component={Admin} />
      <ErrorBoundaryRoute path={`${match.url}ouvrier`} component={Ouvrier} />
      <ErrorBoundaryRoute path={`${match.url}client`} component={Client} />
      <ErrorBoundaryRoute path={`${match.url}adresse`} component={Adresse} />
      <ErrorBoundaryRoute path={`${match.url}annonce`} component={Annonce} />
      <ErrorBoundaryRoute path={`${match.url}media`} component={Media} />
      <ErrorBoundaryRoute path={`${match.url}metier`} component={Metier} />
      <ErrorBoundaryRoute path={`${match.url}categorie`} component={Categorie} />
      <ErrorBoundaryRoute path={`${match.url}produit`} component={Produit} />
      <ErrorBoundaryRoute path={`${match.url}commande`} component={Commande} />
      <ErrorBoundaryRoute path={`${match.url}ligne-commande`} component={LigneCommande} />
      <ErrorBoundaryRoute path={`${match.url}livraison`} component={Livraison} />
      <ErrorBoundaryRoute path={`${match.url}publicite`} component={Publicite} />
      <ErrorBoundaryRoute path={`${match.url}message`} component={Message} />
      <ErrorBoundaryRoute path={`${match.url}devis`} component={Devis} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
