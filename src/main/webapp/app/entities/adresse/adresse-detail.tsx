import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './adresse.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const AdresseDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const adresseEntity = useAppSelector(state => state.adresse.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="adresseDetailsHeading">
          <Translate contentKey="sentravauxV1App.adresse.detail.title">Adresse</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{adresseEntity.id}</dd>
          <dt>
            <span id="region">
              <Translate contentKey="sentravauxV1App.adresse.region">Region</Translate>
            </span>
          </dt>
          <dd>{adresseEntity.region}</dd>
          <dt>
            <span id="departement">
              <Translate contentKey="sentravauxV1App.adresse.departement">Departement</Translate>
            </span>
          </dt>
          <dd>{adresseEntity.departement}</dd>
          <dt>
            <span id="commune">
              <Translate contentKey="sentravauxV1App.adresse.commune">Commune</Translate>
            </span>
          </dt>
          <dd>{adresseEntity.commune}</dd>
        </dl>
        <Button tag={Link} to="/adresse" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/adresse/${adresseEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default AdresseDetail;
