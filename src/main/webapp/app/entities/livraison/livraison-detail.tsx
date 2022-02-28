import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './livraison.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const LivraisonDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const livraisonEntity = useAppSelector(state => state.livraison.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="livraisonDetailsHeading">
          <Translate contentKey="sentravauxV1App.livraison.detail.title">Livraison</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{livraisonEntity.id}</dd>
          <dt>
            <span id="quartier">
              <Translate contentKey="sentravauxV1App.livraison.quartier">Quartier</Translate>
            </span>
          </dt>
          <dd>{livraisonEntity.quartier}</dd>
          <dt>
            <span id="dateLivraison">
              <Translate contentKey="sentravauxV1App.livraison.dateLivraison">Date Livraison</Translate>
            </span>
          </dt>
          <dd>
            {livraisonEntity.dateLivraison ? (
              <TextFormat value={livraisonEntity.dateLivraison} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="sentravauxV1App.livraison.commande">Commande</Translate>
          </dt>
          <dd>{livraisonEntity.commande ? livraisonEntity.commande.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/livraison" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/livraison/${livraisonEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default LivraisonDetail;
