package com.opentechs.sentravaux.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.opentechs.sentravaux.IntegrationTest;
import com.opentechs.sentravaux.domain.Devis;
import com.opentechs.sentravaux.repository.DevisRepository;
import com.opentechs.sentravaux.service.dto.DevisDTO;
import com.opentechs.sentravaux.service.mapper.DevisMapper;
import java.time.LocalDate;
import java.time.ZoneId;
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
 * Integration tests for the {@link DevisResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class DevisResourceIT {

    private static final LocalDate DEFAULT_DATE_DEVIS = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_DEVIS = LocalDate.now(ZoneId.systemDefault());

    private static final Integer DEFAULT_MANOEUVRE = 1;
    private static final Integer UPDATED_MANOEUVRE = 2;

    private static final Integer DEFAULT_SOMME_TOTAL = 1;
    private static final Integer UPDATED_SOMME_TOTAL = 2;

    private static final String ENTITY_API_URL = "/api/devis";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private DevisRepository devisRepository;

    @Autowired
    private DevisMapper devisMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDevisMockMvc;

    private Devis devis;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Devis createEntity(EntityManager em) {
        Devis devis = new Devis().dateDevis(DEFAULT_DATE_DEVIS).manoeuvre(DEFAULT_MANOEUVRE).sommeTotal(DEFAULT_SOMME_TOTAL);
        return devis;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Devis createUpdatedEntity(EntityManager em) {
        Devis devis = new Devis().dateDevis(UPDATED_DATE_DEVIS).manoeuvre(UPDATED_MANOEUVRE).sommeTotal(UPDATED_SOMME_TOTAL);
        return devis;
    }

    @BeforeEach
    public void initTest() {
        devis = createEntity(em);
    }

    @Test
    @Transactional
    void createDevis() throws Exception {
        int databaseSizeBeforeCreate = devisRepository.findAll().size();
        // Create the Devis
        DevisDTO devisDTO = devisMapper.toDto(devis);
        restDevisMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(devisDTO)))
            .andExpect(status().isCreated());

        // Validate the Devis in the database
        List<Devis> devisList = devisRepository.findAll();
        assertThat(devisList).hasSize(databaseSizeBeforeCreate + 1);
        Devis testDevis = devisList.get(devisList.size() - 1);
        assertThat(testDevis.getDateDevis()).isEqualTo(DEFAULT_DATE_DEVIS);
        assertThat(testDevis.getManoeuvre()).isEqualTo(DEFAULT_MANOEUVRE);
        assertThat(testDevis.getSommeTotal()).isEqualTo(DEFAULT_SOMME_TOTAL);
    }

    @Test
    @Transactional
    void createDevisWithExistingId() throws Exception {
        // Create the Devis with an existing ID
        devis.setId(1L);
        DevisDTO devisDTO = devisMapper.toDto(devis);

        int databaseSizeBeforeCreate = devisRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restDevisMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(devisDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Devis in the database
        List<Devis> devisList = devisRepository.findAll();
        assertThat(devisList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllDevis() throws Exception {
        // Initialize the database
        devisRepository.saveAndFlush(devis);

        // Get all the devisList
        restDevisMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(devis.getId().intValue())))
            .andExpect(jsonPath("$.[*].dateDevis").value(hasItem(DEFAULT_DATE_DEVIS.toString())))
            .andExpect(jsonPath("$.[*].manoeuvre").value(hasItem(DEFAULT_MANOEUVRE)))
            .andExpect(jsonPath("$.[*].sommeTotal").value(hasItem(DEFAULT_SOMME_TOTAL)));
    }

    @Test
    @Transactional
    void getDevis() throws Exception {
        // Initialize the database
        devisRepository.saveAndFlush(devis);

        // Get the devis
        restDevisMockMvc
            .perform(get(ENTITY_API_URL_ID, devis.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(devis.getId().intValue()))
            .andExpect(jsonPath("$.dateDevis").value(DEFAULT_DATE_DEVIS.toString()))
            .andExpect(jsonPath("$.manoeuvre").value(DEFAULT_MANOEUVRE))
            .andExpect(jsonPath("$.sommeTotal").value(DEFAULT_SOMME_TOTAL));
    }

    @Test
    @Transactional
    void getNonExistingDevis() throws Exception {
        // Get the devis
        restDevisMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewDevis() throws Exception {
        // Initialize the database
        devisRepository.saveAndFlush(devis);

        int databaseSizeBeforeUpdate = devisRepository.findAll().size();

        // Update the devis
        Devis updatedDevis = devisRepository.findById(devis.getId()).get();
        // Disconnect from session so that the updates on updatedDevis are not directly saved in db
        em.detach(updatedDevis);
        updatedDevis.dateDevis(UPDATED_DATE_DEVIS).manoeuvre(UPDATED_MANOEUVRE).sommeTotal(UPDATED_SOMME_TOTAL);
        DevisDTO devisDTO = devisMapper.toDto(updatedDevis);

        restDevisMockMvc
            .perform(
                put(ENTITY_API_URL_ID, devisDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(devisDTO))
            )
            .andExpect(status().isOk());

        // Validate the Devis in the database
        List<Devis> devisList = devisRepository.findAll();
        assertThat(devisList).hasSize(databaseSizeBeforeUpdate);
        Devis testDevis = devisList.get(devisList.size() - 1);
        assertThat(testDevis.getDateDevis()).isEqualTo(UPDATED_DATE_DEVIS);
        assertThat(testDevis.getManoeuvre()).isEqualTo(UPDATED_MANOEUVRE);
        assertThat(testDevis.getSommeTotal()).isEqualTo(UPDATED_SOMME_TOTAL);
    }

    @Test
    @Transactional
    void putNonExistingDevis() throws Exception {
        int databaseSizeBeforeUpdate = devisRepository.findAll().size();
        devis.setId(count.incrementAndGet());

        // Create the Devis
        DevisDTO devisDTO = devisMapper.toDto(devis);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDevisMockMvc
            .perform(
                put(ENTITY_API_URL_ID, devisDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(devisDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Devis in the database
        List<Devis> devisList = devisRepository.findAll();
        assertThat(devisList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchDevis() throws Exception {
        int databaseSizeBeforeUpdate = devisRepository.findAll().size();
        devis.setId(count.incrementAndGet());

        // Create the Devis
        DevisDTO devisDTO = devisMapper.toDto(devis);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDevisMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(devisDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Devis in the database
        List<Devis> devisList = devisRepository.findAll();
        assertThat(devisList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamDevis() throws Exception {
        int databaseSizeBeforeUpdate = devisRepository.findAll().size();
        devis.setId(count.incrementAndGet());

        // Create the Devis
        DevisDTO devisDTO = devisMapper.toDto(devis);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDevisMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(devisDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Devis in the database
        List<Devis> devisList = devisRepository.findAll();
        assertThat(devisList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateDevisWithPatch() throws Exception {
        // Initialize the database
        devisRepository.saveAndFlush(devis);

        int databaseSizeBeforeUpdate = devisRepository.findAll().size();

        // Update the devis using partial update
        Devis partialUpdatedDevis = new Devis();
        partialUpdatedDevis.setId(devis.getId());

        partialUpdatedDevis.dateDevis(UPDATED_DATE_DEVIS).manoeuvre(UPDATED_MANOEUVRE);

        restDevisMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDevis.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedDevis))
            )
            .andExpect(status().isOk());

        // Validate the Devis in the database
        List<Devis> devisList = devisRepository.findAll();
        assertThat(devisList).hasSize(databaseSizeBeforeUpdate);
        Devis testDevis = devisList.get(devisList.size() - 1);
        assertThat(testDevis.getDateDevis()).isEqualTo(UPDATED_DATE_DEVIS);
        assertThat(testDevis.getManoeuvre()).isEqualTo(UPDATED_MANOEUVRE);
        assertThat(testDevis.getSommeTotal()).isEqualTo(DEFAULT_SOMME_TOTAL);
    }

    @Test
    @Transactional
    void fullUpdateDevisWithPatch() throws Exception {
        // Initialize the database
        devisRepository.saveAndFlush(devis);

        int databaseSizeBeforeUpdate = devisRepository.findAll().size();

        // Update the devis using partial update
        Devis partialUpdatedDevis = new Devis();
        partialUpdatedDevis.setId(devis.getId());

        partialUpdatedDevis.dateDevis(UPDATED_DATE_DEVIS).manoeuvre(UPDATED_MANOEUVRE).sommeTotal(UPDATED_SOMME_TOTAL);

        restDevisMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDevis.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedDevis))
            )
            .andExpect(status().isOk());

        // Validate the Devis in the database
        List<Devis> devisList = devisRepository.findAll();
        assertThat(devisList).hasSize(databaseSizeBeforeUpdate);
        Devis testDevis = devisList.get(devisList.size() - 1);
        assertThat(testDevis.getDateDevis()).isEqualTo(UPDATED_DATE_DEVIS);
        assertThat(testDevis.getManoeuvre()).isEqualTo(UPDATED_MANOEUVRE);
        assertThat(testDevis.getSommeTotal()).isEqualTo(UPDATED_SOMME_TOTAL);
    }

    @Test
    @Transactional
    void patchNonExistingDevis() throws Exception {
        int databaseSizeBeforeUpdate = devisRepository.findAll().size();
        devis.setId(count.incrementAndGet());

        // Create the Devis
        DevisDTO devisDTO = devisMapper.toDto(devis);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDevisMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, devisDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(devisDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Devis in the database
        List<Devis> devisList = devisRepository.findAll();
        assertThat(devisList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchDevis() throws Exception {
        int databaseSizeBeforeUpdate = devisRepository.findAll().size();
        devis.setId(count.incrementAndGet());

        // Create the Devis
        DevisDTO devisDTO = devisMapper.toDto(devis);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDevisMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(devisDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Devis in the database
        List<Devis> devisList = devisRepository.findAll();
        assertThat(devisList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamDevis() throws Exception {
        int databaseSizeBeforeUpdate = devisRepository.findAll().size();
        devis.setId(count.incrementAndGet());

        // Create the Devis
        DevisDTO devisDTO = devisMapper.toDto(devis);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDevisMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(devisDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Devis in the database
        List<Devis> devisList = devisRepository.findAll();
        assertThat(devisList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteDevis() throws Exception {
        // Initialize the database
        devisRepository.saveAndFlush(devis);

        int databaseSizeBeforeDelete = devisRepository.findAll().size();

        // Delete the devis
        restDevisMockMvc
            .perform(delete(ENTITY_API_URL_ID, devis.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Devis> devisList = devisRepository.findAll();
        assertThat(devisList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
