package com.opentechs.sentravaux.service.impl;

import com.opentechs.sentravaux.domain.Ouvrier;
import com.opentechs.sentravaux.repository.OuvrierRepository;
import com.opentechs.sentravaux.service.OuvrierService;
import com.opentechs.sentravaux.service.dto.OuvrierDTO;
import com.opentechs.sentravaux.service.mapper.OuvrierMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Ouvrier}.
 */
@Service
@Transactional
public class OuvrierServiceImpl implements OuvrierService {

    private final Logger log = LoggerFactory.getLogger(OuvrierServiceImpl.class);

    private final OuvrierRepository ouvrierRepository;

    private final OuvrierMapper ouvrierMapper;

    public OuvrierServiceImpl(OuvrierRepository ouvrierRepository, OuvrierMapper ouvrierMapper) {
        this.ouvrierRepository = ouvrierRepository;
        this.ouvrierMapper = ouvrierMapper;
    }

    @Override
    public OuvrierDTO save(OuvrierDTO ouvrierDTO) {
        log.debug("Request to save Ouvrier : {}", ouvrierDTO);
        Ouvrier ouvrier = ouvrierMapper.toEntity(ouvrierDTO);
        ouvrier = ouvrierRepository.save(ouvrier);
        return ouvrierMapper.toDto(ouvrier);
    }

    @Override
    public Optional<OuvrierDTO> partialUpdate(OuvrierDTO ouvrierDTO) {
        log.debug("Request to partially update Ouvrier : {}", ouvrierDTO);

        return ouvrierRepository
            .findById(ouvrierDTO.getId())
            .map(existingOuvrier -> {
                ouvrierMapper.partialUpdate(existingOuvrier, ouvrierDTO);

                return existingOuvrier;
            })
            .map(ouvrierRepository::save)
            .map(ouvrierMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<OuvrierDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Ouvriers");
        return ouvrierRepository.findAll(pageable).map(ouvrierMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<OuvrierDTO> findOne(Long id) {
        log.debug("Request to get Ouvrier : {}", id);
        return ouvrierRepository.findById(id).map(ouvrierMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Ouvrier : {}", id);
        ouvrierRepository.deleteById(id);
    }
}
