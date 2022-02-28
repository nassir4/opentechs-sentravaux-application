package com.opentechs.sentravaux.service;

import com.opentechs.sentravaux.service.dto.MetierDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.opentechs.sentravaux.domain.Metier}.
 */
public interface MetierService {
    /**
     * Save a metier.
     *
     * @param metierDTO the entity to save.
     * @return the persisted entity.
     */
    MetierDTO save(MetierDTO metierDTO);

    /**
     * Partially updates a metier.
     *
     * @param metierDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<MetierDTO> partialUpdate(MetierDTO metierDTO);

    /**
     * Get all the metiers.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<MetierDTO> findAll(Pageable pageable);

    /**
     * Get the "id" metier.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<MetierDTO> findOne(Long id);

    /**
     * Delete the "id" metier.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
