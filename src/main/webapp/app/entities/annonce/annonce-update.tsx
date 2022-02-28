import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm, ValidatedBlobField } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IOuvrier } from 'app/shared/model/ouvrier.model';
import { getEntities as getOuvriers } from 'app/entities/ouvrier/ouvrier.reducer';
import { getEntity, updateEntity, createEntity, reset } from './annonce.reducer';
import { IAnnonce } from 'app/shared/model/annonce.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { Disponiblite } from 'app/shared/model/enumerations/disponiblite.model';

export const AnnonceUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const ouvriers = useAppSelector(state => state.ouvrier.entities);
  const annonceEntity = useAppSelector(state => state.annonce.entity);
  const loading = useAppSelector(state => state.annonce.loading);
  const updating = useAppSelector(state => state.annonce.updating);
  const updateSuccess = useAppSelector(state => state.annonce.updateSuccess);
  const disponibliteValues = Object.keys(Disponiblite);
  const handleClose = () => {
    props.history.push('/annonce' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getOuvriers({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...annonceEntity,
      ...values,
      ouvrier: ouvriers.find(it => it.id.toString() === values.ouvrier.toString()),
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
          disponibilite: 'LUNDI',
          ...annonceEntity,
          ouvrier: annonceEntity?.ouvrier?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="sentravauxV1App.annonce.home.createOrEditLabel" data-cy="AnnonceCreateUpdateHeading">
            <Translate contentKey="sentravauxV1App.annonce.home.createOrEditLabel">Create or edit a Annonce</Translate>
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
                  id="annonce-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('sentravauxV1App.annonce.titre')}
                id="annonce-titre"
                name="titre"
                data-cy="titre"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('sentravauxV1App.annonce.statut')}
                id="annonce-statut"
                name="statut"
                data-cy="statut"
                check
                type="checkbox"
              />
              <ValidatedField
                label={translate('sentravauxV1App.annonce.description')}
                id="annonce-description"
                name="description"
                data-cy="description"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('sentravauxV1App.annonce.disponibilite')}
                id="annonce-disponibilite"
                name="disponibilite"
                data-cy="disponibilite"
                type="select"
              >
                {disponibliteValues.map(disponiblite => (
                  <option value={disponiblite} key={disponiblite}>
                    {translate('sentravauxV1App.Disponiblite.' + disponiblite)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedBlobField
                label={translate('sentravauxV1App.annonce.imageEnAvant')}
                id="annonce-imageEnAvant"
                name="imageEnAvant"
                data-cy="imageEnAvant"
                isImage
                accept="image/*"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('sentravauxV1App.annonce.createdAt')}
                id="annonce-createdAt"
                name="createdAt"
                data-cy="createdAt"
                type="date"
              />
              <ValidatedField
                id="annonce-ouvrier"
                name="ouvrier"
                data-cy="ouvrier"
                label={translate('sentravauxV1App.annonce.ouvrier')}
                type="select"
              >
                <option value="" key="0" />
                {ouvriers
                  ? ouvriers.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/annonce" replace color="info">
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

export default AnnonceUpdate;
