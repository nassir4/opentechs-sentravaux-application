import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IOuvrier } from 'app/shared/model/ouvrier.model';
import { getEntities as getOuvriers } from 'app/entities/ouvrier/ouvrier.reducer';
import { getEntity, updateEntity, createEntity, reset } from './metier.reducer';
import { IMetier } from 'app/shared/model/metier.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const MetierUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const ouvriers = useAppSelector(state => state.ouvrier.entities);
  const metierEntity = useAppSelector(state => state.metier.entity);
  const loading = useAppSelector(state => state.metier.loading);
  const updating = useAppSelector(state => state.metier.updating);
  const updateSuccess = useAppSelector(state => state.metier.updateSuccess);
  const handleClose = () => {
    props.history.push('/metier' + props.location.search);
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
      ...metierEntity,
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
          ...metierEntity,
          ouvrier: metierEntity?.ouvrier?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="sentravauxV1App.metier.home.createOrEditLabel" data-cy="MetierCreateUpdateHeading">
            <Translate contentKey="sentravauxV1App.metier.home.createOrEditLabel">Create or edit a Metier</Translate>
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
                  id="metier-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('sentravauxV1App.metier.nom')}
                id="metier-nom"
                name="nom"
                data-cy="nom"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('sentravauxV1App.metier.description')}
                id="metier-description"
                name="description"
                data-cy="description"
                type="text"
              />
              <ValidatedField
                id="metier-ouvrier"
                name="ouvrier"
                data-cy="ouvrier"
                label={translate('sentravauxV1App.metier.ouvrier')}
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/metier" replace color="info">
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

export default MetierUpdate;
