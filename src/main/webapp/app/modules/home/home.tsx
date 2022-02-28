import './home.scss';

import React, {useEffect, useState} from 'react';
import {Link, RouteComponentProps} from 'react-router-dom';
import {getSortState, JhiItemCount, JhiPagination, Translate} from 'react-jhipster';
import { Row, Col, Alert } from 'reactstrap';

import {useAppDispatch, useAppSelector} from 'app/config/store';
import {overridePaginationStateWithQueryParams} from "app/shared/util/entity-utils";
import {ASC, DESC, ITEMS_PER_PAGE, SORT} from "app/shared/util/pagination.constants";
import {getEntities} from "app/entities/annonce/annonce.reducer";

export const Home = (props : RouteComponentProps<{url : string}>) => {
  const dispatch = useAppDispatch();
  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(props.location, ITEMS_PER_PAGE, 'id'), props.location.search)
  );
  const annonceList = useAppSelector(state => state.annonce.entities);
  const loading = useAppSelector(state => state.annonce.loading);
  const totalItems = useAppSelector(state => state.annonce.totalItems);

  const getAllEntities = () => {
    dispatch(
      getEntities({
        page : paginationState.activePage - 1,
        size : paginationState.itemsPerPage,
        sort : `${paginationState.sort},${paginationState.order}`,
      })
    );
  };


  const sortEntities = () => {
    getAllEntities();
    const  endURL = `?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`;
    if (props.location.search !== endURL){
      props.history.push(`${props.location.pathname}${endURL}`);
    }
  } ;

  useEffect(()=>{
    sortEntities();
  }, [paginationState.activePage,paginationState.order,paginationState.sort]);

  useEffect(()=>{
    const params = new URLSearchParams(props.location.search);
    const page = params.get('page');
    const sort = params.get(SORT);
    if (page && sort){
      const sortSplit = sort.split(',');
      setPaginationState({
        ...paginationState,
        activePage: +page,
        sort:sortSplit[0],
        order: sortSplit[1]
      });
    }
  }, [props.location.search]);

  const sort = p =>() => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === ASC ? DESC : ASC,
      sort: p,
    });
  }

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage
    });

  const handleSyncList = () => {
    sortEntities();
  };

  const { match } = props;
  return (
    <Row>
      <Col md="3" className="pad">
        <ul className="list-group">
          <li className="list-group-item">Maçon</li>
          <li className="list-group-item">Peintre</li>
          <li className="list-group-item">Plombier</li>
          <li className="list-group-item">Electricien</li>
          <li className="list-group-item">Menuisier Metallique</li>
        </ul>
      </Col>
      <Col md="9">
        {annonceList && annonceList.length > 0 ? (
          <Row md="3">
            {annonceList.map((annonce, i) => (
              <div className="card-deck" key={i}>
                <div className="card" style={{width: "18rem;"}}>
                  <img
                    src={`data:${annonce.imageEnAvantContentType};base64,${annonce.imageEnAvant}`}
                  />
                    <div className="card-body">
                      <h5 className="card-title">{annonce.titre}</h5>
                      <p className="card-text">{annonce.description}</p>
                      <p className="card-text"></p>
                      <a href="#" className="btn btn-primary">Voir</a>
                    </div>
                </div>
              </div> ))}
          </Row>):(
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="sentravauxV1App.annonce.home.notFound">No Annonces found</Translate>
            </div>
          )
        )}
        {totalItems ?(<div className={annonceList && annonceList.length > 0 ? '':'d-none'}>
          <div className="justify-content-center d-flex">
            <JhiPagination
              activePage={paginationState.activePage}
              onSelect={handlePagination}
              maxButtons={5}
              totalItems={totalItems}
              itemsPerPage={paginationState.itemsPerPage}/>
          </div>
        </div>):('')}
      </Col>
    </Row>
  );
};

export default Home;
