import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale from './locale';
import authentication from './authentication';
import applicationProfile from './application-profile';

import administration from 'app/modules/administration/administration.reducer';
import userManagement from 'app/modules/administration/user-management/user-management.reducer';
import register from 'app/modules/account/register/register.reducer';
import activate from 'app/modules/account/activate/activate.reducer';
import password from 'app/modules/account/password/password.reducer';
import settings from 'app/modules/account/settings/settings.reducer';
import passwordReset from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import admin from 'app/entities/admin/admin.reducer';
// prettier-ignore
import ouvrier from 'app/entities/ouvrier/ouvrier.reducer';
// prettier-ignore
import client from 'app/entities/client/client.reducer';
// prettier-ignore
import adresse from 'app/entities/adresse/adresse.reducer';
// prettier-ignore
import annonce from 'app/entities/annonce/annonce.reducer';
// prettier-ignore
import media from 'app/entities/media/media.reducer';
// prettier-ignore
import metier from 'app/entities/metier/metier.reducer';
// prettier-ignore
import categorie from 'app/entities/categorie/categorie.reducer';
// prettier-ignore
import produit from 'app/entities/produit/produit.reducer';
// prettier-ignore
import commande from 'app/entities/commande/commande.reducer';
// prettier-ignore
import ligneCommande from 'app/entities/ligne-commande/ligne-commande.reducer';
// prettier-ignore
import livraison from 'app/entities/livraison/livraison.reducer';
// prettier-ignore
import publicite from 'app/entities/publicite/publicite.reducer';
// prettier-ignore
import message from 'app/entities/message/message.reducer';
// prettier-ignore
import devis from 'app/entities/devis/devis.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const rootReducer = {
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  admin,
  ouvrier,
  client,
  adresse,
  annonce,
  media,
  metier,
  categorie,
  produit,
  commande,
  ligneCommande,
  livraison,
  publicite,
  message,
  devis,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar,
};

export default rootReducer;
