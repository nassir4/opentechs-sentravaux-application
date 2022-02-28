package com.opentechs.sentravaux.service;

import com.opentechs.sentravaux.service.dto.AnnonceDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.opentechs.sentravaux.domain.Annonce}.
 */
public interface AnnonceService {
    /**
     * Save a annonce.
     *
     * @param annonceDTO the entity to save.
     * @return the persisted entity.
     */
    AnnonceDTO save(AnnonceDTO annonceDTO);

    /**
     * Partially updates a annonce.
     *
     * @param annonceDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<AnnonceDTO> partialUpdate(AnnonceDTO annonceDTO);

    /**
     * Get all the annonces.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<AnnonceDTO> findAll(Pageable pageable);

    /**
     * Get the "id" annonce.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<AnnonceDTO> findOne(Long id);

    /**
     * Delete the "id" annonce.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
