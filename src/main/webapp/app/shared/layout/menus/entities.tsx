import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { Translate, translate } from 'react-jhipster';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown
    icon="th-list"
    name={translate('global.menu.entities.main')}
    id="entity-menu"
    data-cy="entity"
    style={{ maxHeight: '80vh', overflow: 'auto' }}
  >
    <>{/* to avoid warnings when empty */}</>
    <MenuItem icon="asterisk" to="/admin">
      <Translate contentKey="global.menu.entities.admin" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/ouvrier">
      <Translate contentKey="global.menu.entities.ouvrier" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/client">
      <Translate contentKey="global.menu.entities.client" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/adresse">
      <Translate contentKey="global.menu.entities.adresse" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/annonce">
      <Translate contentKey="global.menu.entities.annonce" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/media">
      <Translate contentKey="global.menu.entities.media" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/metier">
      <Translate contentKey="global.menu.entities.metier" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/categorie">
      <Translate contentKey="global.menu.entities.categorie" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/produit">
      <Translate contentKey="global.menu.entities.produit" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/commande">
      <Translate contentKey="global.menu.entities.commande" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/ligne-commande">
      <Translate contentKey="global.menu.entities.ligneCommande" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/livraison">
      <Translate contentKey="global.menu.entities.livraison" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/publicite">
      <Translate contentKey="global.menu.entities.publicite" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/message">
      <Translate contentKey="global.menu.entities.message" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/devis">
      <Translate contentKey="global.menu.entities.devis" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
