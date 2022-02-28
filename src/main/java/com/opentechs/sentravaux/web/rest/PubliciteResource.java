package com.opentechs.sentravaux.web.rest;

import com.opentechs.sentravaux.repository.PubliciteRepository;
import com.opentechs.sentravaux.service.PubliciteService;
import com.opentechs.sentravaux.service.dto.PubliciteDTO;
import com.opentechs.sentravaux.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
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
 * REST controller for managing {@link com.opentechs.sentravaux.domain.Publicite}.
 */
@RestController
@RequestMapping("/api")
public class PubliciteResource {

    private final Logger log = LoggerFactory.getLogger(PubliciteResource.class);

    private static final String ENTITY_NAME = "publicite";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PubliciteService publiciteService;

    private final PubliciteRepository publiciteRepository;

    public PubliciteResource(PubliciteService publiciteService, PubliciteRepository publiciteRepository) {
        this.publiciteService = publiciteService;
        this.publiciteRepository = publiciteRepository;
    }

    /**
     * {@code POST  /publicites} : Create a new publicite.
     *
     * @param publiciteDTO the publiciteDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new publiciteDTO, or with status {@code 400 (Bad Request)} if the publicite has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/publicites")
    public ResponseEntity<PubliciteDTO> createPublicite(@RequestBody PubliciteDTO publiciteDTO) throws URISyntaxException {
        log.debug("REST request to save Publicite : {}", publiciteDTO);
        if (publiciteDTO.getId() != null) {
            throw new BadRequestAlertException("A new publicite cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PubliciteDTO result = publiciteService.save(publiciteDTO);
        return ResponseEntity
            .created(new URI("/api/publicites/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /publicites/:id} : Updates an existing publicite.
     *
     * @param id the id of the publiciteDTO to save.
     * @param publiciteDTO the publiciteDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated publiciteDTO,
     * or with status {@code 400 (Bad Request)} if the publiciteDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the publiciteDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/publicites/{id}")
    public ResponseEntity<PubliciteDTO> updatePublicite(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody PubliciteDTO publiciteDTO
    ) throws URISyntaxException {
        log.debug("REST request to update Publicite : {}, {}", id, publiciteDTO);
        if (publiciteDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, publiciteDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!publiciteRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        PubliciteDTO result = publiciteService.save(publiciteDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, publiciteDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /publicites/:id} : Partial updates given fields of an existing publicite, field will ignore if it is null
     *
     * @param id the id of the publiciteDTO to save.
     * @param publiciteDTO the publiciteDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated publiciteDTO,
     * or with status {@code 400 (Bad Request)} if the publiciteDTO is not valid,
     * or with status {@code 404 (Not Found)} if the publiciteDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the publiciteDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/publicites/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<PubliciteDTO> partialUpdatePublicite(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody PubliciteDTO publiciteDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update Publicite partially : {}, {}", id, publiciteDTO);
        if (publiciteDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, publiciteDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!publiciteRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<PubliciteDTO> result = publiciteService.partialUpdate(publiciteDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, publiciteDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /publicites} : get all the publicites.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of publicites in body.
     */
    @GetMapping("/publicites")
    public ResponseEntity<List<PubliciteDTO>> getAllPublicites(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of Publicites");
        Page<PubliciteDTO> page = publiciteService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /publicites/:id} : get the "id" publicite.
     *
     * @param id the id of the publiciteDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the publiciteDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/publicites/{id}")
    public ResponseEntity<PubliciteDTO> getPublicite(@PathVariable Long id) {
        log.debug("REST request to get Publicite : {}", id);
        Optional<PubliciteDTO> publiciteDTO = publiciteService.findOne(id);
        return ResponseUtil.wrapOrNotFound(publiciteDTO);
    }

    /**
     * {@code DELETE  /publicites/:id} : delete the "id" publicite.
     *
     * @param id the id of the publiciteDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/publicites/{id}")
    public ResponseEntity<Void> deletePublicite(@PathVariable Long id) {
        log.debug("REST request to delete Publicite : {}", id);
        publiciteService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
