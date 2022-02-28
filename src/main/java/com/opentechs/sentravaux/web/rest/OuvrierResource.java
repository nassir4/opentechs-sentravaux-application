package com.opentechs.sentravaux.web.rest;

import com.opentechs.sentravaux.repository.OuvrierRepository;
import com.opentechs.sentravaux.service.OuvrierService;
import com.opentechs.sentravaux.service.dto.OuvrierDTO;
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
 * REST controller for managing {@link com.opentechs.sentravaux.domain.Ouvrier}.
 */
@RestController
@RequestMapping("/api")
public class OuvrierResource {

    private final Logger log = LoggerFactory.getLogger(OuvrierResource.class);

    private static final String ENTITY_NAME = "ouvrier";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final OuvrierService ouvrierService;

    private final OuvrierRepository ouvrierRepository;

    public OuvrierResource(OuvrierService ouvrierService, OuvrierRepository ouvrierRepository) {
        this.ouvrierService = ouvrierService;
        this.ouvrierRepository = ouvrierRepository;
    }

    /**
     * {@code POST  /ouvriers} : Create a new ouvrier.
     *
     * @param ouvrierDTO the ouvrierDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new ouvrierDTO, or with status {@code 400 (Bad Request)} if the ouvrier has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/ouvriers")
    public ResponseEntity<OuvrierDTO> createOuvrier(@Valid @RequestBody OuvrierDTO ouvrierDTO) throws URISyntaxException {
        log.debug("REST request to save Ouvrier : {}", ouvrierDTO);
        if (ouvrierDTO.getId() != null) {
            throw new BadRequestAlertException("A new ouvrier cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OuvrierDTO result = ouvrierService.save(ouvrierDTO);
        return ResponseEntity
            .created(new URI("/api/ouvriers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ouvriers/:id} : Updates an existing ouvrier.
     *
     * @param id the id of the ouvrierDTO to save.
     * @param ouvrierDTO the ouvrierDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ouvrierDTO,
     * or with status {@code 400 (Bad Request)} if the ouvrierDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the ouvrierDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/ouvriers/{id}")
    public ResponseEntity<OuvrierDTO> updateOuvrier(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody OuvrierDTO ouvrierDTO
    ) throws URISyntaxException {
        log.debug("REST request to update Ouvrier : {}, {}", id, ouvrierDTO);
        if (ouvrierDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, ouvrierDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!ouvrierRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        OuvrierDTO result = ouvrierService.save(ouvrierDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, ouvrierDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /ouvriers/:id} : Partial updates given fields of an existing ouvrier, field will ignore if it is null
     *
     * @param id the id of the ouvrierDTO to save.
     * @param ouvrierDTO the ouvrierDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ouvrierDTO,
     * or with status {@code 400 (Bad Request)} if the ouvrierDTO is not valid,
     * or with status {@code 404 (Not Found)} if the ouvrierDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the ouvrierDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/ouvriers/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<OuvrierDTO> partialUpdateOuvrier(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody OuvrierDTO ouvrierDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update Ouvrier partially : {}, {}", id, ouvrierDTO);
        if (ouvrierDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, ouvrierDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!ouvrierRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<OuvrierDTO> result = ouvrierService.partialUpdate(ouvrierDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, ouvrierDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /ouvriers} : get all the ouvriers.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of ouvriers in body.
     */
    @GetMapping("/ouvriers")
    public ResponseEntity<List<OuvrierDTO>> getAllOuvriers(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of Ouvriers");
        Page<OuvrierDTO> page = ouvrierService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /ouvriers/:id} : get the "id" ouvrier.
     *
     * @param id the id of the ouvrierDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the ouvrierDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/ouvriers/{id}")
    public ResponseEntity<OuvrierDTO> getOuvrier(@PathVariable Long id) {
        log.debug("REST request to get Ouvrier : {}", id);
        Optional<OuvrierDTO> ouvrierDTO = ouvrierService.findOne(id);
        return ResponseUtil.wrapOrNotFound(ouvrierDTO);
    }

    /**
     * {@code DELETE  /ouvriers/:id} : delete the "id" ouvrier.
     *
     * @param id the id of the ouvrierDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/ouvriers/{id}")
    public ResponseEntity<Void> deleteOuvrier(@PathVariable Long id) {
        log.debug("REST request to delete Ouvrier : {}", id);
        ouvrierService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
