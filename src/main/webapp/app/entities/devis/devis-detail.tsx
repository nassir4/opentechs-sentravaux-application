import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './devis.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const DevisDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const devisEntity = useAppSelector(state => state.devis.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="devisDetailsHeading">
          <Translate contentKey="sentravauxV1App.devis.detail.title">Devis</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{devisEntity.id}</dd>
          <dt>
            <span id="dateDevis">
              <Translate contentKey="sentravauxV1App.devis.dateDevis">Date Devis</Translate>
            </span>
          </dt>
          <dd>{devisEntity.dateDevis ? <TextFormat value={devisEntity.dateDevis} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="manoeuvre">
              <Translate contentKey="sentravauxV1App.devis.manoeuvre">Manoeuvre</Translate>
            </span>
          </dt>
          <dd>{devisEntity.manoeuvre}</dd>
          <dt>
            <span id="sommeTotal">
              <Translate contentKey="sentravauxV1App.devis.sommeTotal">Somme Total</Translate>
            </span>
          </dt>
          <dd>{devisEntity.sommeTotal}</dd>
          <dt>
            <Translate contentKey="sentravauxV1App.devis.ouvrier">Ouvrier</Translate>
          </dt>
          <dd>{devisEntity.ouvrier ? devisEntity.ouvrier.id : ''}</dd>
          <dt>
            <Translate contentKey="sentravauxV1App.devis.client">Client</Translate>
          </dt>
          <dd>{devisEntity.client ? devisEntity.client.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/devis" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/devis/${devisEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default DevisDetail;
