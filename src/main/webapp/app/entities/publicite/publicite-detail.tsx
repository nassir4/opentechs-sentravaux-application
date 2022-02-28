import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './publicite.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const PubliciteDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const publiciteEntity = useAppSelector(state => state.publicite.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="publiciteDetailsHeading">
          <Translate contentKey="sentravauxV1App.publicite.detail.title">Publicite</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{publiciteEntity.id}</dd>
          <dt>
            <span id="image">
              <Translate contentKey="sentravauxV1App.publicite.image">Image</Translate>
            </span>
          </dt>
          <dd>
            {publiciteEntity.image ? (
              <div>
                {publiciteEntity.imageContentType ? (
                  <a onClick={openFile(publiciteEntity.imageContentType, publiciteEntity.image)}>
                    <img src={`data:${publiciteEntity.imageContentType};base64,${publiciteEntity.image}`} style={{ maxHeight: '30px' }} />
                  </a>
                ) : null}
                <span>
                  {publiciteEntity.imageContentType}, {byteSize(publiciteEntity.image)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="video">
              <Translate contentKey="sentravauxV1App.publicite.video">Video</Translate>
            </span>
          </dt>
          <dd>
            {publiciteEntity.video ? (
              <div>
                {publiciteEntity.videoContentType ? (
                  <a onClick={openFile(publiciteEntity.videoContentType, publiciteEntity.video)}>
                    <Translate contentKey="entity.action.open">Open</Translate>&nbsp;
                  </a>
                ) : null}
                <span>
                  {publiciteEntity.videoContentType}, {byteSize(publiciteEntity.video)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="description">
              <Translate contentKey="sentravauxV1App.publicite.description">Description</Translate>
            </span>
          </dt>
          <dd>{publiciteEntity.description}</dd>
          <dt>
            <span id="statut">
              <Translate contentKey="sentravauxV1App.publicite.statut">Statut</Translate>
            </span>
          </dt>
          <dd>{publiciteEntity.statut ? 'true' : 'false'}</dd>
          <dt>
            <Translate contentKey="sentravauxV1App.publicite.admin">Admin</Translate>
          </dt>
          <dd>{publiciteEntity.admin ? publiciteEntity.admin.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/publicite" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/publicite/${publiciteEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default PubliciteDetail;
