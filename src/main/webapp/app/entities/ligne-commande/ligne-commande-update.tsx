import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ICommande } from 'app/shared/model/commande.model';
import { getEntities as getCommandes } from 'app/entities/commande/commande.reducer';
import { IProduit } from 'app/shared/model/produit.model';
import { getEntities as getProduits } from 'app/entities/produit/produit.reducer';
import { getEntity, updateEntity, createEntity, reset } from './ligne-commande.reducer';
import { ILigneCommande } from 'app/shared/model/ligne-commande.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const LigneCommandeUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const commandes = useAppSelector(state => state.commande.entities);
  const produits = useAppSelector(state => state.produit.entities);
  const ligneCommandeEntity = useAppSelector(state => state.ligneCommande.entity);
  const loading = useAppSelector(state => state.ligneCommande.loading);
  const updating = useAppSelector(state => state.ligneCommande.updating);
  const updateSuccess = useAppSelector(state => state.ligneCommande.updateSuccess);
  const handleClose = () => {
    props.history.push('/ligne-commande');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getCommandes({}));
    dispatch(getProduits({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...ligneCommandeEntity,
      ...values,
      commande: commandes.find(it => it.id.toString() === values.commande.toString()),
      produit: produits.find(it => it.id.toString() === values.produit.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...ligneCommandeEntity,
          commande: ligneCommandeEntity?.commande?.id,
          produit: ligneCommandeEntity?.produit?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="sentravauxV1App.ligneCommande.home.createOrEditLabel" data-cy="LigneCommandeCreateUpdateHeading">
            <Translate contentKey="sentravauxV1App.ligneCommande.home.createOrEditLabel">Create or edit a LigneCommande</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="ligne-commande-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('sentravauxV1App.ligneCommande.quantite')}
                id="ligne-commande-quantite"
                name="quantite"
                data-cy="quantite"
                type="text"
              />
              <ValidatedField
                label={translate('sentravauxV1App.ligneCommande.prix')}
                id="ligne-commande-prix"
                name="prix"
                data-cy="prix"
                type="text"
              />
              <ValidatedField
                id="ligne-commande-commande"
                name="commande"
                data-cy="commande"
                label={translate('sentravauxV1App.ligneCommande.commande')}
                type="select"
              >
                <option value="" key="0" />
                {commandes
                  ? commandes.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="ligne-commande-produit"
                name="produit"
                data-cy="produit"
                label={translate('sentravauxV1App.ligneCommande.produit')}
                type="select"
              >
                <option value="" key="0" />
                {produits
                  ? produits.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/ligne-commande" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default LigneCommandeUpdate;
