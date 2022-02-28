package com.opentechs.sentravaux.service.impl;

import com.opentechs.sentravaux.domain.Annonce;
import com.opentechs.sentravaux.repository.AnnonceRepository;
import com.opentechs.sentravaux.service.AnnonceService;
import com.opentechs.sentravaux.service.dto.AnnonceDTO;
import com.opentechs.sentravaux.service.mapper.AnnonceMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Annonce}.
 */
@Service
@Transactional
public class AnnonceServiceImpl implements AnnonceService {

    private final Logger log = LoggerFactory.getLogger(AnnonceServiceImpl.class);

    private final AnnonceRepository annonceRepository;

    private final AnnonceMapper annonceMapper;

    public AnnonceServiceImpl(AnnonceRepository annonceRepository, AnnonceMapper annonceMapper) {
        this.annonceRepository = annonceRepository;
        this.annonceMapper = annonceMapper;
    }

    @Override
    public AnnonceDTO save(AnnonceDTO annonceDTO) {
        log.debug("Request to save Annonce : {}", annonceDTO);
        Annonce annonce = annonceMapper.toEntity(annonceDTO);
        annonce = annonceRepository.save(annonce);
        return annonceMapper.toDto(annonce);
    }

    @Override
    public Optional<AnnonceDTO> partialUpdate(AnnonceDTO annonceDTO) {
        log.debug("Request to partially update Annonce : {}", annonceDTO);

        return annonceRepository
            .findById(annonceDTO.getId())
            .map(existingAnnonce -> {
                annonceMapper.partialUpdate(existingAnnonce, annonceDTO);

                return existingAnnonce;
            })
            .map(annonceRepository::save)
            .map(annonceMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<AnnonceDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Annonces");
        return annonceRepository.findAll(pageable).map(annonceMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<AnnonceDTO> findOne(Long id) {
        log.debug("Request to get Annonce : {}", id);
        return annonceRepository.findById(id).map(annonceMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Annonce : {}", id);
        annonceRepository.deleteById(id);
    }
}
