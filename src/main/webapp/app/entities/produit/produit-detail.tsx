import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './produit.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const ProduitDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const produitEntity = useAppSelector(state => state.produit.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="produitDetailsHeading">
          <Translate contentKey="sentravauxV1App.produit.detail.title">Produit</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{produitEntity.id}</dd>
          <dt>
            <span id="nom">
              <Translate contentKey="sentravauxV1App.produit.nom">Nom</Translate>
            </span>
          </dt>
          <dd>{produitEntity.nom}</dd>
          <dt>
            <span id="quantite">
              <Translate contentKey="sentravauxV1App.produit.quantite">Quantite</Translate>
            </span>
          </dt>
          <dd>{produitEntity.quantite}</dd>
          <dt>
            <span id="prix">
              <Translate contentKey="sentravauxV1App.produit.prix">Prix</Translate>
            </span>
          </dt>
          <dd>{produitEntity.prix}</dd>
          <dt>
            <span id="photo">
              <Translate contentKey="sentravauxV1App.produit.photo">Photo</Translate>
            </span>
          </dt>
          <dd>
            {produitEntity.photo ? (
              <div>
                {produitEntity.photoContentType ? (
                  <a onClick={openFile(produitEntity.photoContentType, produitEntity.photo)}>
                    <img src={`data:${produitEntity.photoContentType};base64,${produitEntity.photo}`} style={{ maxHeight: '30px' }} />
                  </a>
                ) : null}
                <span>
                  {produitEntity.photoContentType}, {byteSize(produitEntity.photo)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="createdAt">
              <Translate contentKey="sentravauxV1App.produit.createdAt">Created At</Translate>
            </span>
          </dt>
          <dd>
            {produitEntity.createdAt ? <TextFormat value={produitEntity.createdAt} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <Translate contentKey="sentravauxV1App.produit.categorie">Categorie</Translate>
          </dt>
          <dd>{produitEntity.categorie ? produitEntity.categorie.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/produit" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/produit/${produitEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ProduitDetail;
