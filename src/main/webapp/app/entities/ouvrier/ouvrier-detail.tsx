import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './ouvrier.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const OuvrierDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const ouvrierEntity = useAppSelector(state => state.ouvrier.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="ouvrierDetailsHeading">
          <Translate contentKey="sentravauxV1App.ouvrier.detail.title">Ouvrier</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{ouvrierEntity.id}</dd>
          <dt>
            <span id="telephone">
              <Translate contentKey="sentravauxV1App.ouvrier.telephone">Telephone</Translate>
            </span>
          </dt>
          <dd>{ouvrierEntity.telephone}</dd>
          <dt>
            <Translate contentKey="sentravauxV1App.ouvrier.user">User</Translate>
          </dt>
          <dd>{ouvrierEntity.user ? ouvrierEntity.user.id : ''}</dd>
          <dt>
            <Translate contentKey="sentravauxV1App.ouvrier.adresse">Adresse</Translate>
          </dt>
          <dd>{ouvrierEntity.adresse ? ouvrierEntity.adresse.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/ouvrier" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/ouvrier/${ouvrierEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default OuvrierDetail;
