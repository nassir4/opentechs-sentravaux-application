package com.opentechs.sentravaux.service;

import com.opentechs.sentravaux.service.dto.PubliciteDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.opentechs.sentravaux.domain.Publicite}.
 */
public interface PubliciteService {
    /**
     * Save a publicite.
     *
     * @param publiciteDTO the entity to save.
     * @return the persisted entity.
     */
    PubliciteDTO save(PubliciteDTO publiciteDTO);

    /**
     * Partially updates a publicite.
     *
     * @param publiciteDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<PubliciteDTO> partialUpdate(PubliciteDTO publiciteDTO);

    /**
     * Get all the publicites.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<PubliciteDTO> findAll(Pageable pageable);

    /**
     * Get the "id" publicite.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<PubliciteDTO> findOne(Long id);

    /**
     * Delete the "id" publicite.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
