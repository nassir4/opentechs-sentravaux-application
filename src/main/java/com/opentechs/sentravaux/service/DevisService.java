package com.opentechs.sentravaux.service;

import com.opentechs.sentravaux.service.dto.DevisDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.opentechs.sentravaux.domain.Devis}.
 */
public interface DevisService {
    /**
     * Save a devis.
     *
     * @param devisDTO the entity to save.
     * @return the persisted entity.
     */
    DevisDTO save(DevisDTO devisDTO);

    /**
     * Partially updates a devis.
     *
     * @param devisDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<DevisDTO> partialUpdate(DevisDTO devisDTO);

    /**
     * Get all the devis.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<DevisDTO> findAll(Pageable pageable);

    /**
     * Get the "id" devis.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<DevisDTO> findOne(Long id);

    /**
     * Delete the "id" devis.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
