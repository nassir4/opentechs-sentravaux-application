package com.opentechs.sentravaux.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.opentechs.sentravaux.IntegrationTest;
import com.opentechs.sentravaux.domain.Ouvrier;
import com.opentechs.sentravaux.repository.OuvrierRepository;
import com.opentechs.sentravaux.service.dto.OuvrierDTO;
import com.opentechs.sentravaux.service.mapper.OuvrierMapper;
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
 * Integration tests for the {@link OuvrierResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class OuvrierResourceIT {

    private static final Integer DEFAULT_TELEPHONE = 1;
    private static final Integer UPDATED_TELEPHONE = 2;

    private static final String ENTITY_API_URL = "/api/ouvriers";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private OuvrierRepository ouvrierRepository;

    @Autowired
    private OuvrierMapper ouvrierMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restOuvrierMockMvc;

    private Ouvrier ouvrier;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Ouvrier createEntity(EntityManager em) {
        Ouvrier ouvrier = new Ouvrier().telephone(DEFAULT_TELEPHONE);
        return ouvrier;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Ouvrier createUpdatedEntity(EntityManager em) {
        Ouvrier ouvrier = new Ouvrier().telephone(UPDATED_TELEPHONE);
        return ouvrier;
    }

    @BeforeEach
    public void initTest() {
        ouvrier = createEntity(em);
    }

    @Test
    @Transactional
    void createOuvrier() throws Exception {
        int databaseSizeBeforeCreate = ouvrierRepository.findAll().size();
        // Create the Ouvrier
        OuvrierDTO ouvrierDTO = ouvrierMapper.toDto(ouvrier);
        restOuvrierMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(ouvrierDTO)))
            .andExpect(status().isCreated());

        // Validate the Ouvrier in the database
        List<Ouvrier> ouvrierList = ouvrierRepository.findAll();
        assertThat(ouvrierList).hasSize(databaseSizeBeforeCreate + 1);
        Ouvrier testOuvrier = ouvrierList.get(ouvrierList.size() - 1);
        assertThat(testOuvrier.getTelephone()).isEqualTo(DEFAULT_TELEPHONE);
    }

    @Test
    @Transactional
    void createOuvrierWithExistingId() throws Exception {
        // Create the Ouvrier with an existing ID
        ouvrier.setId(1L);
        OuvrierDTO ouvrierDTO = ouvrierMapper.toDto(ouvrier);

        int databaseSizeBeforeCreate = ouvrierRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restOuvrierMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(ouvrierDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Ouvrier in the database
        List<Ouvrier> ouvrierList = ouvrierRepository.findAll();
        assertThat(ouvrierList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkTelephoneIsRequired() throws Exception {
        int databaseSizeBeforeTest = ouvrierRepository.findAll().size();
        // set the field null
        ouvrier.setTelephone(null);

        // Create the Ouvrier, which fails.
        OuvrierDTO ouvrierDTO = ouvrierMapper.toDto(ouvrier);

        restOuvrierMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(ouvrierDTO)))
            .andExpect(status().isBadRequest());

        List<Ouvrier> ouvrierList = ouvrierRepository.findAll();
        assertThat(ouvrierList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllOuvriers() throws Exception {
        // Initialize the database
        ouvrierRepository.saveAndFlush(ouvrier);

        // Get all the ouvrierList
        restOuvrierMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ouvrier.getId().intValue())))
            .andExpect(jsonPath("$.[*].telephone").value(hasItem(DEFAULT_TELEPHONE)));
    }

    @Test
    @Transactional
    void getOuvrier() throws Exception {
        // Initialize the database
        ouvrierRepository.saveAndFlush(ouvrier);

        // Get the ouvrier
        restOuvrierMockMvc
            .perform(get(ENTITY_API_URL_ID, ouvrier.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(ouvrier.getId().intValue()))
            .andExpect(jsonPath("$.telephone").value(DEFAULT_TELEPHONE));
    }

    @Test
    @Transactional
    void getNonExistingOuvrier() throws Exception {
        // Get the ouvrier
        restOuvrierMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewOuvrier() throws Exception {
        // Initialize the database
        ouvrierRepository.saveAndFlush(ouvrier);

        int databaseSizeBeforeUpdate = ouvrierRepository.findAll().size();

        // Update the ouvrier
        Ouvrier updatedOuvrier = ouvrierRepository.findById(ouvrier.getId()).get();
        // Disconnect from session so that the updates on updatedOuvrier are not directly saved in db
        em.detach(updatedOuvrier);
        updatedOuvrier.telephone(UPDATED_TELEPHONE);
        OuvrierDTO ouvrierDTO = ouvrierMapper.toDto(updatedOuvrier);

        restOuvrierMockMvc
            .perform(
                put(ENTITY_API_URL_ID, ouvrierDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(ouvrierDTO))
            )
            .andExpect(status().isOk());

        // Validate the Ouvrier in the database
        List<Ouvrier> ouvrierList = ouvrierRepository.findAll();
        assertThat(ouvrierList).hasSize(databaseSizeBeforeUpdate);
        Ouvrier testOuvrier = ouvrierList.get(ouvrierList.size() - 1);
        assertThat(testOuvrier.getTelephone()).isEqualTo(UPDATED_TELEPHONE);
    }

    @Test
    @Transactional
    void putNonExistingOuvrier() throws Exception {
        int databaseSizeBeforeUpdate = ouvrierRepository.findAll().size();
        ouvrier.setId(count.incrementAndGet());

        // Create the Ouvrier
        OuvrierDTO ouvrierDTO = ouvrierMapper.toDto(ouvrier);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOuvrierMockMvc
            .perform(
                put(ENTITY_API_URL_ID, ouvrierDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(ouvrierDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Ouvrier in the database
        List<Ouvrier> ouvrierList = ouvrierRepository.findAll();
        assertThat(ouvrierList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchOuvrier() throws Exception {
        int databaseSizeBeforeUpdate = ouvrierRepository.findAll().size();
        ouvrier.setId(count.incrementAndGet());

        // Create the Ouvrier
        OuvrierDTO ouvrierDTO = ouvrierMapper.toDto(ouvrier);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOuvrierMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(ouvrierDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Ouvrier in the database
        List<Ouvrier> ouvrierList = ouvrierRepository.findAll();
        assertThat(ouvrierList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamOuvrier() throws Exception {
        int databaseSizeBeforeUpdate = ouvrierRepository.findAll().size();
        ouvrier.setId(count.incrementAndGet());

        // Create the Ouvrier
        OuvrierDTO ouvrierDTO = ouvrierMapper.toDto(ouvrier);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOuvrierMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(ouvrierDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Ouvrier in the database
        List<Ouvrier> ouvrierList = ouvrierRepository.findAll();
        assertThat(ouvrierList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateOuvrierWithPatch() throws Exception {
        // Initialize the database
        ouvrierRepository.saveAndFlush(ouvrier);

        int databaseSizeBeforeUpdate = ouvrierRepository.findAll().size();

        // Update the ouvrier using partial update
        Ouvrier partialUpdatedOuvrier = new Ouvrier();
        partialUpdatedOuvrier.setId(ouvrier.getId());

        partialUpdatedOuvrier.telephone(UPDATED_TELEPHONE);

        restOuvrierMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedOuvrier.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedOuvrier))
            )
            .andExpect(status().isOk());

        // Validate the Ouvrier in the database
        List<Ouvrier> ouvrierList = ouvrierRepository.findAll();
        assertThat(ouvrierList).hasSize(databaseSizeBeforeUpdate);
        Ouvrier testOuvrier = ouvrierList.get(ouvrierList.size() - 1);
        assertThat(testOuvrier.getTelephone()).isEqualTo(UPDATED_TELEPHONE);
    }

    @Test
    @Transactional
    void fullUpdateOuvrierWithPatch() throws Exception {
        // Initialize the database
        ouvrierRepository.saveAndFlush(ouvrier);

        int databaseSizeBeforeUpdate = ouvrierRepository.findAll().size();

        // Update the ouvrier using partial update
        Ouvrier partialUpdatedOuvrier = new Ouvrier();
        partialUpdatedOuvrier.setId(ouvrier.getId());

        partialUpdatedOuvrier.telephone(UPDATED_TELEPHONE);

        restOuvrierMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedOuvrier.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedOuvrier))
            )
            .andExpect(status().isOk());

        // Validate the Ouvrier in the database
        List<Ouvrier> ouvrierList = ouvrierRepository.findAll();
        assertThat(ouvrierList).hasSize(databaseSizeBeforeUpdate);
        Ouvrier testOuvrier = ouvrierList.get(ouvrierList.size() - 1);
        assertThat(testOuvrier.getTelephone()).isEqualTo(UPDATED_TELEPHONE);
    }

    @Test
    @Transactional
    void patchNonExistingOuvrier() throws Exception {
        int databaseSizeBeforeUpdate = ouvrierRepository.findAll().size();
        ouvrier.setId(count.incrementAndGet());

        // Create the Ouvrier
        OuvrierDTO ouvrierDTO = ouvrierMapper.toDto(ouvrier);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOuvrierMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, ouvrierDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(ouvrierDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Ouvrier in the database
        List<Ouvrier> ouvrierList = ouvrierRepository.findAll();
        assertThat(ouvrierList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchOuvrier() throws Exception {
        int databaseSizeBeforeUpdate = ouvrierRepository.findAll().size();
        ouvrier.setId(count.incrementAndGet());

        // Create the Ouvrier
        OuvrierDTO ouvrierDTO = ouvrierMapper.toDto(ouvrier);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOuvrierMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(ouvrierDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Ouvrier in the database
        List<Ouvrier> ouvrierList = ouvrierRepository.findAll();
        assertThat(ouvrierList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamOuvrier() throws Exception {
        int databaseSizeBeforeUpdate = ouvrierRepository.findAll().size();
        ouvrier.setId(count.incrementAndGet());

        // Create the Ouvrier
        OuvrierDTO ouvrierDTO = ouvrierMapper.toDto(ouvrier);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOuvrierMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(ouvrierDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Ouvrier in the database
        List<Ouvrier> ouvrierList = ouvrierRepository.findAll();
        assertThat(ouvrierList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteOuvrier() throws Exception {
        // Initialize the database
        ouvrierRepository.saveAndFlush(ouvrier);

        int databaseSizeBeforeDelete = ouvrierRepository.findAll().size();

        // Delete the ouvrier
        restOuvrierMockMvc
            .perform(delete(ENTITY_API_URL_ID, ouvrier.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Ouvrier> ouvrierList = ouvrierRepository.findAll();
        assertThat(ouvrierList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
