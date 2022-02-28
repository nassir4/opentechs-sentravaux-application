package com.opentechs.sentravaux.service;

import com.opentechs.sentravaux.service.dto.OuvrierDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.opentechs.sentravaux.domain.Ouvrier}.
 */
public interface OuvrierService {
    /**
     * Save a ouvrier.
     *
     * @param ouvrierDTO the entity to save.
     * @return the persisted entity.
     */
    OuvrierDTO save(OuvrierDTO ouvrierDTO);

    /**
     * Partially updates a ouvrier.
     *
     * @param ouvrierDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<OuvrierDTO> partialUpdate(OuvrierDTO ouvrierDTO);

    /**
     * Get all the ouvriers.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<OuvrierDTO> findAll(Pageable pageable);

    /**
     * Get the "id" ouvrier.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<OuvrierDTO> findOne(Long id);

    /**
     * Delete the "id" ouvrier.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
