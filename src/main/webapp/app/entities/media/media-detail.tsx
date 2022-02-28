import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './media.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const MediaDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const mediaEntity = useAppSelector(state => state.media.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="mediaDetailsHeading">
          <Translate contentKey="sentravauxV1App.media.detail.title">Media</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{mediaEntity.id}</dd>
          <dt>
            <span id="image">
              <Translate contentKey="sentravauxV1App.media.image">Image</Translate>
            </span>
          </dt>
          <dd>
            {mediaEntity.image ? (
              <div>
                {mediaEntity.imageContentType ? (
                  <a onClick={openFile(mediaEntity.imageContentType, mediaEntity.image)}>
                    <img src={`data:${mediaEntity.imageContentType};base64,${mediaEntity.image}`} style={{ maxHeight: '30px' }} />
                  </a>
                ) : null}
                <span>
                  {mediaEntity.imageContentType}, {byteSize(mediaEntity.image)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="video">
              <Translate contentKey="sentravauxV1App.media.video">Video</Translate>
            </span>
          </dt>
          <dd>
            {mediaEntity.video ? (
              <div>
                {mediaEntity.videoContentType ? (
                  <a onClick={openFile(mediaEntity.videoContentType, mediaEntity.video)}>
                    <Translate contentKey="entity.action.open">Open</Translate>&nbsp;
                  </a>
                ) : null}
                <span>
                  {mediaEntity.videoContentType}, {byteSize(mediaEntity.video)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="sentravauxV1App.media.annonce">Annonce</Translate>
          </dt>
          <dd>{mediaEntity.annonce ? mediaEntity.annonce.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/media" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/media/${mediaEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default MediaDetail;
