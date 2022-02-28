package com.opentechs.sentravaux.service.impl;

import com.opentechs.sentravaux.domain.Metier;
import com.opentechs.sentravaux.repository.MetierRepository;
import com.opentechs.sentravaux.service.MetierService;
import com.opentechs.sentravaux.service.dto.MetierDTO;
import com.opentechs.sentravaux.service.mapper.MetierMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Metier}.
 */
@Service
@Transactional
public class MetierServiceImpl implements MetierService {

    private final Logger log = LoggerFactory.getLogger(MetierServiceImpl.class);

    private final MetierRepository metierRepository;

    private final MetierMapper metierMapper;

    public MetierServiceImpl(MetierRepository metierRepository, MetierMapper metierMapper) {
        this.metierRepository = metierRepository;
        this.metierMapper = metierMapper;
    }

    @Override
    public MetierDTO save(MetierDTO metierDTO) {
        log.debug("Request to save Metier : {}", metierDTO);
        Metier metier = metierMapper.toEntity(metierDTO);
        metier = metierRepository.save(metier);
        return metierMapper.toDto(metier);
    }

    @Override
    public Optional<MetierDTO> partialUpdate(MetierDTO metierDTO) {
        log.debug("Request to partially update Metier : {}", metierDTO);

        return metierRepository
            .findById(metierDTO.getId())
            .map(existingMetier -> {
                metierMapper.partialUpdate(existingMetier, metierDTO);

                return existingMetier;
            })
            .map(metierRepository::save)
            .map(metierMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<MetierDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Metiers");
        return metierRepository.findAll(pageable).map(metierMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<MetierDTO> findOne(Long id) {
        log.debug("Request to get Metier : {}", id);
        return metierRepository.findById(id).map(metierMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Metier : {}", id);
        metierRepository.deleteById(id);
    }
}
