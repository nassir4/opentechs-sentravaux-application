package com.opentechs.sentravaux.service;

import com.opentechs.sentravaux.service.dto.LivraisonDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.opentechs.sentravaux.domain.Livraison}.
 */
public interface LivraisonService {
    /**
     * Save a livraison.
     *
     * @param livraisonDTO the entity to save.
     * @return the persisted entity.
     */
    LivraisonDTO save(LivraisonDTO livraisonDTO);

    /**
     * Partially updates a livraison.
     *
     * @param livraisonDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<LivraisonDTO> partialUpdate(LivraisonDTO livraisonDTO);

    /**
     * Get all the livraisons.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<LivraisonDTO> findAll(Pageable pageable);

    /**
     * Get the "id" livraison.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<LivraisonDTO> findOne(Long id);

    /**
     * Delete the "id" livraison.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
