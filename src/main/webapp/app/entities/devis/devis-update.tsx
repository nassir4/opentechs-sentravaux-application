import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntities as getDevis } from 'app/entities/devis/devis.reducer';
import { IClient } from 'app/shared/model/client.model';
import { getEntities as getClients } from 'app/entities/client/client.reducer';
import { getEntity, updateEntity, createEntity, reset } from './devis.reducer';
import { IDevis } from 'app/shared/model/devis.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const DevisUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const devis = useAppSelector(state => state.devis.entities);
  const clients = useAppSelector(state => state.client.entities);
  const devisEntity = useAppSelector(state => state.devis.entity);
  const loading = useAppSelector(state => state.devis.loading);
  const updating = useAppSelector(state => state.devis.updating);
  const updateSuccess = useAppSelector(state => state.devis.updateSuccess);
  const handleClose = () => {
    props.history.push('/devis' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getDevis({}));
    dispatch(getClients({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...devisEntity,
      ...values,
      ouvrier: devis.find(it => it.id.toString() === values.ouvrier.toString()),
      client: clients.find(it => it.id.toString() === values.client.toString()),
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
          ...devisEntity,
          ouvrier: devisEntity?.ouvrier?.id,
          client: devisEntity?.client?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="sentravauxV1App.devis.home.createOrEditLabel" data-cy="DevisCreateUpdateHeading">
            <Translate contentKey="sentravauxV1App.devis.home.createOrEditLabel">Create or edit a Devis</Translate>
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
                  id="devis-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('sentravauxV1App.devis.dateDevis')}
                id="devis-dateDevis"
                name="dateDevis"
                data-cy="dateDevis"
                type="date"
              />
              <ValidatedField
                label={translate('sentravauxV1App.devis.manoeuvre')}
                id="devis-manoeuvre"
                name="manoeuvre"
                data-cy="manoeuvre"
                type="text"
              />
              <ValidatedField
                label={translate('sentravauxV1App.devis.sommeTotal')}
                id="devis-sommeTotal"
                name="sommeTotal"
                data-cy="sommeTotal"
                type="text"
              />
              <ValidatedField
                id="devis-ouvrier"
                name="ouvrier"
                data-cy="ouvrier"
                label={translate('sentravauxV1App.devis.ouvrier')}
                type="select"
              >
                <option value="" key="0" />
                {devis
                  ? devis.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="devis-client"
                name="client"
                data-cy="client"
                label={translate('sentravauxV1App.devis.client')}
                type="select"
              >
                <option value="" key="0" />
                {clients
                  ? clients.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/devis" replace color="info">
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

export default DevisUpdate;
