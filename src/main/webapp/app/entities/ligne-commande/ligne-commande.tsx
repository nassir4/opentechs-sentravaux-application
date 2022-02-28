import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntities } from './ligne-commande.reducer';
import { ILigneCommande } from 'app/shared/model/ligne-commande.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const LigneCommande = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const ligneCommandeList = useAppSelector(state => state.ligneCommande.entities);
  const loading = useAppSelector(state => state.ligneCommande.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="ligne-commande-heading" data-cy="LigneCommandeHeading">
        <Translate contentKey="sentravauxV1App.ligneCommande.home.title">Ligne Commandes</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="sentravauxV1App.ligneCommande.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="sentravauxV1App.ligneCommande.home.createLabel">Create new Ligne Commande</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {ligneCommandeList && ligneCommandeList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="sentravauxV1App.ligneCommande.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="sentravauxV1App.ligneCommande.quantite">Quantite</Translate>
                </th>
                <th>
                  <Translate contentKey="sentravauxV1App.ligneCommande.prix">Prix</Translate>
                </th>
                <th>
                  <Translate contentKey="sentravauxV1App.ligneCommande.commande">Commande</Translate>
                </th>
                <th>
                  <Translate contentKey="sentravauxV1App.ligneCommande.produit">Produit</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {ligneCommandeList.map((ligneCommande, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${ligneCommande.id}`} color="link" size="sm">
                      {ligneCommande.id}
                    </Button>
                  </td>
                  <td>{ligneCommande.quantite}</td>
                  <td>{ligneCommande.prix}</td>
                  <td>
                    {ligneCommande.commande ? <Link to={`commande/${ligneCommande.commande.id}`}>{ligneCommande.commande.id}</Link> : ''}
                  </td>
                  <td>{ligneCommande.produit ? <Link to={`produit/${ligneCommande.produit.id}`}>{ligneCommande.produit.id}</Link> : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${ligneCommande.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${ligneCommande.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${ligneCommande.id}/delete`}
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="sentravauxV1App.ligneCommande.home.notFound">No Ligne Commandes found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default LigneCommande;
