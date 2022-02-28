package com.opentechs.sentravaux.service.impl;

import com.opentechs.sentravaux.domain.Livraison;
import com.opentechs.sentravaux.repository.LivraisonRepository;
import com.opentechs.sentravaux.service.LivraisonService;
import com.opentechs.sentravaux.service.dto.LivraisonDTO;
import com.opentechs.sentravaux.service.mapper.LivraisonMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Livraison}.
 */
@Service
@Transactional
public class LivraisonServiceImpl implements LivraisonService {

    private final Logger log = LoggerFactory.getLogger(LivraisonServiceImpl.class);

    private final LivraisonRepository livraisonRepository;

    private final LivraisonMapper livraisonMapper;

    public LivraisonServiceImpl(LivraisonRepository livraisonRepository, LivraisonMapper livraisonMapper) {
        this.livraisonRepository = livraisonRepository;
        this.livraisonMapper = livraisonMapper;
    }

    @Override
    public LivraisonDTO save(LivraisonDTO livraisonDTO) {
        log.debug("Request to save Livraison : {}", livraisonDTO);
        Livraison livraison = livraisonMapper.toEntity(livraisonDTO);
        livraison = livraisonRepository.save(livraison);
        return livraisonMapper.toDto(livraison);
    }

    @Override
    public Optional<LivraisonDTO> partialUpdate(LivraisonDTO livraisonDTO) {
        log.debug("Request to partially update Livraison : {}", livraisonDTO);

        return livraisonRepository
            .findById(livraisonDTO.getId())
            .map(existingLivraison -> {
                livraisonMapper.partialUpdate(existingLivraison, livraisonDTO);

                return existingLivraison;
            })
            .map(livraisonRepository::save)
            .map(livraisonMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<LivraisonDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Livraisons");
        return livraisonRepository.findAll(pageable).map(livraisonMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<LivraisonDTO> findOne(Long id) {
        log.debug("Request to get Livraison : {}", id);
        return livraisonRepository.findById(id).map(livraisonMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Livraison : {}", id);
        livraisonRepository.deleteById(id);
    }
}
