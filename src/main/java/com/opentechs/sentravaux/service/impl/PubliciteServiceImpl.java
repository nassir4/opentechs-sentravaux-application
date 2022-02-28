package com.opentechs.sentravaux.service.impl;

import com.opentechs.sentravaux.domain.Publicite;
import com.opentechs.sentravaux.repository.PubliciteRepository;
import com.opentechs.sentravaux.service.PubliciteService;
import com.opentechs.sentravaux.service.dto.PubliciteDTO;
import com.opentechs.sentravaux.service.mapper.PubliciteMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Publicite}.
 */
@Service
@Transactional
public class PubliciteServiceImpl implements PubliciteService {

    private final Logger log = LoggerFactory.getLogger(PubliciteServiceImpl.class);

    private final PubliciteRepository publiciteRepository;

    private final PubliciteMapper publiciteMapper;

    public PubliciteServiceImpl(PubliciteRepository publiciteRepository, PubliciteMapper publiciteMapper) {
        this.publiciteRepository = publiciteRepository;
        this.publiciteMapper = publiciteMapper;
    }

    @Override
    public PubliciteDTO save(PubliciteDTO publiciteDTO) {
        log.debug("Request to save Publicite : {}", publiciteDTO);
        Publicite publicite = publiciteMapper.toEntity(publiciteDTO);
        publicite = publiciteRepository.save(publicite);
        return publiciteMapper.toDto(publicite);
    }

    @Override
    public Optional<PubliciteDTO> partialUpdate(PubliciteDTO publiciteDTO) {
        log.debug("Request to partially update Publicite : {}", publiciteDTO);

        return publiciteRepository
            .findById(publiciteDTO.getId())
            .map(existingPublicite -> {
                publiciteMapper.partialUpdate(existingPublicite, publiciteDTO);

                return existingPublicite;
            })
            .map(publiciteRepository::save)
            .map(publiciteMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<PubliciteDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Publicites");
        return publiciteRepository.findAll(pageable).map(publiciteMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<PubliciteDTO> findOne(Long id) {
        log.debug("Request to get Publicite : {}", id);
        return publiciteRepository.findById(id).map(publiciteMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Publicite : {}", id);
        publiciteRepository.deleteById(id);
    }
}
