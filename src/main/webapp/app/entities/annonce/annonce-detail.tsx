import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './annonce.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const AnnonceDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const annonceEntity = useAppSelector(state => state.annonce.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="annonceDetailsHeading">
          <Translate contentKey="sentravauxV1App.annonce.detail.title">Annonce</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{annonceEntity.id}</dd>
          <dt>
            <span id="titre">
              <Translate contentKey="sentravauxV1App.annonce.titre">Titre</Translate>
            </span>
          </dt>
          <dd>{annonceEntity.titre}</dd>
          <dt>
            <span id="statut">
              <Translate contentKey="sentravauxV1App.annonce.statut">Statut</Translate>
            </span>
          </dt>
          <dd>{annonceEntity.statut ? 'true' : 'false'}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="sentravauxV1App.annonce.description">Description</Translate>
            </span>
          </dt>
          <dd>{annonceEntity.description}</dd>
          <dt>
            <span id="disponibilite">
              <Translate contentKey="sentravauxV1App.annonce.disponibilite">Disponibilite</Translate>
            </span>
          </dt>
          <dd>{annonceEntity.disponibilite}</dd>
          <dt>
            <span id="imageEnAvant">
              <Translate contentKey="sentravauxV1App.annonce.imageEnAvant">Image En Avant</Translate>
            </span>
          </dt>
          <dd>
            {annonceEntity.imageEnAvant ? (
              <div>
                {annonceEntity.imageEnAvantContentType ? (
                  <a onClick={openFile(annonceEntity.imageEnAvantContentType, annonceEntity.imageEnAvant)}>
                    <img
                      src={`data:${annonceEntity.imageEnAvantContentType};base64,${annonceEntity.imageEnAvant}`}
                      style={{ maxHeight: '30px' }}
                    />
                  </a>
                ) : null}
                <span>
                  {annonceEntity.imageEnAvantContentType}, {byteSize(annonceEntity.imageEnAvant)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="createdAt">
              <Translate contentKey="sentravauxV1App.annonce.createdAt">Created At</Translate>
            </span>
          </dt>
          <dd>
            {annonceEntity.createdAt ? <TextFormat value={annonceEntity.createdAt} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <Translate contentKey="sentravauxV1App.annonce.ouvrier">Ouvrier</Translate>
          </dt>
          <dd>{annonceEntity.ouvrier ? annonceEntity.ouvrier.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/annonce" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/annonce/${annonceEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default AnnonceDetail;
