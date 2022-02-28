import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm, ValidatedBlobField } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IAdmin } from 'app/shared/model/admin.model';
import { getEntities as getAdmins } from 'app/entities/admin/admin.reducer';
import { getEntity, updateEntity, createEntity, reset } from './publicite.reducer';
import { IPublicite } from 'app/shared/model/publicite.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const PubliciteUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const admins = useAppSelector(state => state.admin.entities);
  const publiciteEntity = useAppSelector(state => state.publicite.entity);
  const loading = useAppSelector(state => state.publicite.loading);
  const updating = useAppSelector(state => state.publicite.updating);
  const updateSuccess = useAppSelector(state => state.publicite.updateSuccess);
  const handleClose = () => {
    props.history.push('/publicite' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getAdmins({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...publiciteEntity,
      ...values,
      admin: admins.find(it => it.id.toString() === values.admin.toString()),
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
          ...publiciteEntity,
          admin: publiciteEntity?.admin?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="sentravauxV1App.publicite.home.createOrEditLabel" data-cy="PubliciteCreateUpdateHeading">
            <Translate contentKey="sentravauxV1App.publicite.home.createOrEditLabel">Create or edit a Publicite</Translate>
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
                  id="publicite-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedBlobField
                label={translate('sentravauxV1App.publicite.image')}
                id="publicite-image"
                name="image"
                data-cy="image"
                isImage
                accept="image/*"
              />
              <ValidatedBlobField
                label={translate('sentravauxV1App.publicite.video')}
                id="publicite-video"
                name="video"
                data-cy="video"
                openActionLabel={translate('entity.action.open')}
              />
              <ValidatedField
                label={translate('sentravauxV1App.publicite.description')}
                id="publicite-description"
                name="description"
                data-cy="description"
                type="text"
              />
              <ValidatedField
                label={translate('sentravauxV1App.publicite.statut')}
                id="publicite-statut"
                name="statut"
                data-cy="statut"
                check
                type="checkbox"
              />
              <ValidatedField
                id="publicite-admin"
                name="admin"
                data-cy="admin"
                label={translate('sentravauxV1App.publicite.admin')}
                type="select"
              >
                <option value="" key="0" />
                {admins
                  ? admins.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/publicite" replace color="info">
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

export default PubliciteUpdate;
