package com.opentechs.sentravaux.web.rest;

import com.opentechs.sentravaux.repository.MetierRepository;
import com.opentechs.sentravaux.service.MetierService;
import com.opentechs.sentravaux.service.dto.MetierDTO;
import com.opentechs.sentravaux.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.opentechs.sentravaux.domain.Metier}.
 */
@RestController
@RequestMapping("/api")
public class MetierResource {

    private final Logger log = LoggerFactory.getLogger(MetierResource.class);

    private static final String ENTITY_NAME = "metier";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MetierService metierService;

    private final MetierRepository metierRepository;

    public MetierResource(MetierService metierService, MetierRepository metierRepository) {
        this.metierService = metierService;
        this.metierRepository = metierRepository;
    }

    /**
     * {@code POST  /metiers} : Create a new metier.
     *
     * @param metierDTO the metierDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new metierDTO, or with status {@code 400 (Bad Request)} if the metier has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/metiers")
    public ResponseEntity<MetierDTO> createMetier(@Valid @RequestBody MetierDTO metierDTO) throws URISyntaxException {
        log.debug("REST request to save Metier : {}", metierDTO);
        if (metierDTO.getId() != null) {
            throw new BadRequestAlertException("A new metier cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MetierDTO result = metierService.save(metierDTO);
        return ResponseEntity
            .created(new URI("/api/metiers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /metiers/:id} : Updates an existing metier.
     *
     * @param id the id of the metierDTO to save.
     * @param metierDTO the metierDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated metierDTO,
     * or with status {@code 400 (Bad Request)} if the metierDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the metierDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/metiers/{id}")
    public ResponseEntity<MetierDTO> updateMetier(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody MetierDTO metierDTO
    ) throws URISyntaxException {
        log.debug("REST request to update Metier : {}, {}", id, metierDTO);
        if (metierDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, metierDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!metierRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        MetierDTO result = metierService.save(metierDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, metierDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /metiers/:id} : Partial updates given fields of an existing metier, field will ignore if it is null
     *
     * @param id the id of the metierDTO to save.
     * @param metierDTO the metierDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated metierDTO,
     * or with status {@code 400 (Bad Request)} if the metierDTO is not valid,
     * or with status {@code 404 (Not Found)} if the metierDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the metierDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/metiers/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<MetierDTO> partialUpdateMetier(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody MetierDTO metierDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update Metier partially : {}, {}", id, metierDTO);
        if (metierDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, metierDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!metierRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<MetierDTO> result = metierService.partialUpdate(metierDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, metierDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /metiers} : get all the metiers.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of metiers in body.
     */
    @GetMapping("/metiers")
    public ResponseEntity<List<MetierDTO>> getAllMetiers(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of Metiers");
        Page<MetierDTO> page = metierService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /metiers/:id} : get the "id" metier.
     *
     * @param id the id of the metierDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the metierDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/metiers/{id}")
    public ResponseEntity<MetierDTO> getMetier(@PathVariable Long id) {
        log.debug("REST request to get Metier : {}", id);
        Optional<MetierDTO> metierDTO = metierService.findOne(id);
        return ResponseUtil.wrapOrNotFound(metierDTO);
    }

    /**
     * {@code DELETE  /metiers/:id} : delete the "id" metier.
     *
     * @param id the id of the metierDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/metiers/{id}")
    public ResponseEntity<Void> deleteMetier(@PathVariable Long id) {
        log.debug("REST request to delete Metier : {}", id);
        metierService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
