package com.opentechs.sentravaux.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.opentechs.sentravaux.IntegrationTest;
import com.opentechs.sentravaux.domain.Metier;
import com.opentechs.sentravaux.repository.MetierRepository;
import com.opentechs.sentravaux.service.dto.MetierDTO;
import com.opentechs.sentravaux.service.mapper.MetierMapper;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link MetierResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class MetierResourceIT {

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/metiers";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private MetierRepository metierRepository;

    @Autowired
    private MetierMapper metierMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restMetierMockMvc;

    private Metier metier;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Metier createEntity(EntityManager em) {
        Metier metier = new Metier().nom(DEFAULT_NOM).description(DEFAULT_DESCRIPTION);
        return metier;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Metier createUpdatedEntity(EntityManager em) {
        Metier metier = new Metier().nom(UPDATED_NOM).description(UPDATED_DESCRIPTION);
        return metier;
    }

    @BeforeEach
    public void initTest() {
        metier = createEntity(em);
    }

    @Test
    @Transactional
    void createMetier() throws Exception {
        int databaseSizeBeforeCreate = metierRepository.findAll().size();
        // Create the Metier
        MetierDTO metierDTO = metierMapper.toDto(metier);
        restMetierMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(metierDTO)))
            .andExpect(status().isCreated());

        // Validate the Metier in the database
        List<Metier> metierList = metierRepository.findAll();
        assertThat(metierList).hasSize(databaseSizeBeforeCreate + 1);
        Metier testMetier = metierList.get(metierList.size() - 1);
        assertThat(testMetier.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testMetier.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    void createMetierWithExistingId() throws Exception {
        // Create the Metier with an existing ID
        metier.setId(1L);
        MetierDTO metierDTO = metierMapper.toDto(metier);

        int databaseSizeBeforeCreate = metierRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restMetierMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(metierDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Metier in the database
        List<Metier> metierList = metierRepository.findAll();
        assertThat(metierList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNomIsRequired() throws Exception {
        int databaseSizeBeforeTest = metierRepository.findAll().size();
        // set the field null
        metier.setNom(null);

        // Create the Metier, which fails.
        MetierDTO metierDTO = metierMapper.toDto(metier);

        restMetierMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(metierDTO)))
            .andExpect(status().isBadRequest());

        List<Metier> metierList = metierRepository.findAll();
        assertThat(metierList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllMetiers() throws Exception {
        // Initialize the database
        metierRepository.saveAndFlush(metier);

        // Get all the metierList
        restMetierMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(metier.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)));
    }

    @Test
    @Transactional
    void getMetier() throws Exception {
        // Initialize the database
        metierRepository.saveAndFlush(metier);

        // Get the metier
        restMetierMockMvc
            .perform(get(ENTITY_API_URL_ID, metier.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(metier.getId().intValue()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION));
    }

    @Test
    @Transactional
    void getNonExistingMetier() throws Exception {
        // Get the metier
        restMetierMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewMetier() throws Exception {
        // Initialize the database
        metierRepository.saveAndFlush(metier);

        int databaseSizeBeforeUpdate = metierRepository.findAll().size();

        // Update the metier
        Metier updatedMetier = metierRepository.findById(metier.getId()).get();
        // Disconnect from session so that the updates on updatedMetier are not directly saved in db
        em.detach(updatedMetier);
        updatedMetier.nom(UPDATED_NOM).description(UPDATED_DESCRIPTION);
        MetierDTO metierDTO = metierMapper.toDto(updatedMetier);

        restMetierMockMvc
            .perform(
                put(ENTITY_API_URL_ID, metierDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(metierDTO))
            )
            .andExpect(status().isOk());

        // Validate the Metier in the database
        List<Metier> metierList = metierRepository.findAll();
        assertThat(metierList).hasSize(databaseSizeBeforeUpdate);
        Metier testMetier = metierList.get(metierList.size() - 1);
        assertThat(testMetier.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testMetier.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    void putNonExistingMetier() throws Exception {
        int databaseSizeBeforeUpdate = metierRepository.findAll().size();
        metier.setId(count.incrementAndGet());

        // Create the Metier
        MetierDTO metierDTO = metierMapper.toDto(metier);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMetierMockMvc
            .perform(
                put(ENTITY_API_URL_ID, metierDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(metierDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Metier in the database
        List<Metier> metierList = metierRepository.findAll();
        assertThat(metierList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchMetier() throws Exception {
        int databaseSizeBeforeUpdate = metierRepository.findAll().size();
        metier.setId(count.incrementAndGet());

        // Create the Metier
        MetierDTO metierDTO = metierMapper.toDto(metier);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMetierMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(metierDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Metier in the database
        List<Metier> metierList = metierRepository.findAll();
        assertThat(metierList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamMetier() throws Exception {
        int databaseSizeBeforeUpdate = metierRepository.findAll().size();
        metier.setId(count.incrementAndGet());

        // Create the Metier
        MetierDTO metierDTO = metierMapper.toDto(metier);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMetierMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(metierDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Metier in the database
        List<Metier> metierList = metierRepository.findAll();
        assertThat(metierList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateMetierWithPatch() throws Exception {
        // Initialize the database
        metierRepository.saveAndFlush(metier);

        int databaseSizeBeforeUpdate = metierRepository.findAll().size();

        // Update the metier using partial update
        Metier partialUpdatedMetier = new Metier();
        partialUpdatedMetier.setId(metier.getId());

        partialUpdatedMetier.nom(UPDATED_NOM).description(UPDATED_DESCRIPTION);

        restMetierMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedMetier.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedMetier))
            )
            .andExpect(status().isOk());

        // Validate the Metier in the database
        List<Metier> metierList = metierRepository.findAll();
        assertThat(metierList).hasSize(databaseSizeBeforeUpdate);
        Metier testMetier = metierList.get(metierList.size() - 1);
        assertThat(testMetier.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testMetier.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    void fullUpdateMetierWithPatch() throws Exception {
        // Initialize the database
        metierRepository.saveAndFlush(metier);

        int databaseSizeBeforeUpdate = metierRepository.findAll().size();

        // Update the metier using partial update
        Metier partialUpdatedMetier = new Metier();
        partialUpdatedMetier.setId(metier.getId());

        partialUpdatedMetier.nom(UPDATED_NOM).description(UPDATED_DESCRIPTION);

        restMetierMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedMetier.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedMetier))
            )
            .andExpect(status().isOk());

        // Validate the Metier in the database
        List<Metier> metierList = metierRepository.findAll();
        assertThat(metierList).hasSize(databaseSizeBeforeUpdate);
        Metier testMetier = metierList.get(metierList.size() - 1);
        assertThat(testMetier.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testMetier.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    void patchNonExistingMetier() throws Exception {
        int databaseSizeBeforeUpdate = metierRepository.findAll().size();
        metier.setId(count.incrementAndGet());

        // Create the Metier
        MetierDTO metierDTO = metierMapper.toDto(metier);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMetierMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, metierDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(metierDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Metier in the database
        List<Metier> metierList = metierRepository.findAll();
        assertThat(metierList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchMetier() throws Exception {
        int databaseSizeBeforeUpdate = metierRepository.findAll().size();
        metier.setId(count.incrementAndGet());

        // Create the Metier
        MetierDTO metierDTO = metierMapper.toDto(metier);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMetierMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(metierDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Metier in the database
        List<Metier> metierList = metierRepository.findAll();
        assertThat(metierList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamMetier() throws Exception {
        int databaseSizeBeforeUpdate = metierRepository.findAll().size();
        metier.setId(count.incrementAndGet());

        // Create the Metier
        MetierDTO metierDTO = metierMapper.toDto(metier);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMetierMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(metierDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Metier in the database
        List<Metier> metierList = metierRepository.findAll();
        assertThat(metierList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteMetier() throws Exception {
        // Initialize the database
        metierRepository.saveAndFlush(metier);

        int databaseSizeBeforeDelete = metierRepository.findAll().size();

        // Delete the metier
        restMetierMockMvc
            .perform(delete(ENTITY_API_URL_ID, metier.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Metier> metierList = metierRepository.findAll();
        assertThat(metierList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
