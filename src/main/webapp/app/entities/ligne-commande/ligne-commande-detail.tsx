import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './ligne-commande.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const LigneCommandeDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const ligneCommandeEntity = useAppSelector(state => state.ligneCommande.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="ligneCommandeDetailsHeading">
          <Translate contentKey="sentravauxV1App.ligneCommande.detail.title">LigneCommande</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{ligneCommandeEntity.id}</dd>
          <dt>
            <span id="quantite">
              <Translate contentKey="sentravauxV1App.ligneCommande.quantite">Quantite</Translate>
            </span>
          </dt>
          <dd>{ligneCommandeEntity.quantite}</dd>
          <dt>
            <span id="prix">
              <Translate contentKey="sentravauxV1App.ligneCommande.prix">Prix</Translate>
            </span>
          </dt>
          <dd>{ligneCommandeEntity.prix}</dd>
          <dt>
            <Translate contentKey="sentravauxV1App.ligneCommande.commande">Commande</Translate>
          </dt>
          <dd>{ligneCommandeEntity.commande ? ligneCommandeEntity.commande.id : ''}</dd>
          <dt>
            <Translate contentKey="sentravauxV1App.ligneCommande.produit">Produit</Translate>
          </dt>
          <dd>{ligneCommandeEntity.produit ? ligneCommandeEntity.produit.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/ligne-commande" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/ligne-commande/${ligneCommandeEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default LigneCommandeDetail;
