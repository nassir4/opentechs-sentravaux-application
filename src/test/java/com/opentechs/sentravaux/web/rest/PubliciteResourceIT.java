package com.opentechs.sentravaux.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.opentechs.sentravaux.IntegrationTest;
import com.opentechs.sentravaux.domain.Publicite;
import com.opentechs.sentravaux.repository.PubliciteRepository;
import com.opentechs.sentravaux.service.dto.PubliciteDTO;
import com.opentechs.sentravaux.service.mapper.PubliciteMapper;
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
import org.springframework.util.Base64Utils;

/**
 * Integration tests for the {@link PubliciteResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class PubliciteResourceIT {

    private static final byte[] DEFAULT_IMAGE = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_IMAGE = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_IMAGE_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_IMAGE_CONTENT_TYPE = "image/png";

    private static final byte[] DEFAULT_VIDEO = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_VIDEO = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_VIDEO_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_VIDEO_CONTENT_TYPE = "image/png";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Boolean DEFAULT_STATUT = false;
    private static final Boolean UPDATED_STATUT = true;

    private static final String ENTITY_API_URL = "/api/publicites";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private PubliciteRepository publiciteRepository;

    @Autowired
    private PubliciteMapper publiciteMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPubliciteMockMvc;

    private Publicite publicite;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Publicite createEntity(EntityManager em) {
        Publicite publicite = new Publicite()
            .image(DEFAULT_IMAGE)
            .imageContentType(DEFAULT_IMAGE_CONTENT_TYPE)
            .video(DEFAULT_VIDEO)
            .videoContentType(DEFAULT_VIDEO_CONTENT_TYPE)
            .description(DEFAULT_DESCRIPTION)
            .statut(DEFAULT_STATUT);
        return publicite;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Publicite createUpdatedEntity(EntityManager em) {
        Publicite publicite = new Publicite()
            .image(UPDATED_IMAGE)
            .imageContentType(UPDATED_IMAGE_CONTENT_TYPE)
            .video(UPDATED_VIDEO)
            .videoContentType(UPDATED_VIDEO_CONTENT_TYPE)
            .description(UPDATED_DESCRIPTION)
            .statut(UPDATED_STATUT);
        return publicite;
    }

    @BeforeEach
    public void initTest() {
        publicite = createEntity(em);
    }

    @Test
    @Transactional
    void createPublicite() throws Exception {
        int databaseSizeBeforeCreate = publiciteRepository.findAll().size();
        // Create the Publicite
        PubliciteDTO publiciteDTO = publiciteMapper.toDto(publicite);
        restPubliciteMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(publiciteDTO)))
            .andExpect(status().isCreated());

        // Validate the Publicite in the database
        List<Publicite> publiciteList = publiciteRepository.findAll();
        assertThat(publiciteList).hasSize(databaseSizeBeforeCreate + 1);
        Publicite testPublicite = publiciteList.get(publiciteList.size() - 1);
        assertThat(testPublicite.getImage()).isEqualTo(DEFAULT_IMAGE);
        assertThat(testPublicite.getImageContentType()).isEqualTo(DEFAULT_IMAGE_CONTENT_TYPE);
        assertThat(testPublicite.getVideo()).isEqualTo(DEFAULT_VIDEO);
        assertThat(testPublicite.getVideoContentType()).isEqualTo(DEFAULT_VIDEO_CONTENT_TYPE);
        assertThat(testPublicite.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testPublicite.getStatut()).isEqualTo(DEFAULT_STATUT);
    }

    @Test
    @Transactional
    void createPubliciteWithExistingId() throws Exception {
        // Create the Publicite with an existing ID
        publicite.setId(1L);
        PubliciteDTO publiciteDTO = publiciteMapper.toDto(publicite);

        int databaseSizeBeforeCreate = publiciteRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restPubliciteMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(publiciteDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Publicite in the database
        List<Publicite> publiciteList = publiciteRepository.findAll();
        assertThat(publiciteList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllPublicites() throws Exception {
        // Initialize the database
        publiciteRepository.saveAndFlush(publicite);

        // Get all the publiciteList
        restPubliciteMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(publicite.getId().intValue())))
            .andExpect(jsonPath("$.[*].imageContentType").value(hasItem(DEFAULT_IMAGE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].image").value(hasItem(Base64Utils.encodeToString(DEFAULT_IMAGE))))
            .andExpect(jsonPath("$.[*].videoContentType").value(hasItem(DEFAULT_VIDEO_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].video").value(hasItem(Base64Utils.encodeToString(DEFAULT_VIDEO))))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].statut").value(hasItem(DEFAULT_STATUT.booleanValue())));
    }

    @Test
    @Transactional
    void getPublicite() throws Exception {
        // Initialize the database
        publiciteRepository.saveAndFlush(publicite);

        // Get the publicite
        restPubliciteMockMvc
            .perform(get(ENTITY_API_URL_ID, publicite.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(publicite.getId().intValue()))
            .andExpect(jsonPath("$.imageContentType").value(DEFAULT_IMAGE_CONTENT_TYPE))
            .andExpect(jsonPath("$.image").value(Base64Utils.encodeToString(DEFAULT_IMAGE)))
            .andExpect(jsonPath("$.videoContentType").value(DEFAULT_VIDEO_CONTENT_TYPE))
            .andExpect(jsonPath("$.video").value(Base64Utils.encodeToString(DEFAULT_VIDEO)))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION))
            .andExpect(jsonPath("$.statut").value(DEFAULT_STATUT.booleanValue()));
    }

    @Test
    @Transactional
    void getNonExistingPublicite() throws Exception {
        // Get the publicite
        restPubliciteMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewPublicite() throws Exception {
        // Initialize the database
        publiciteRepository.saveAndFlush(publicite);

        int databaseSizeBeforeUpdate = publiciteRepository.findAll().size();

        // Update the publicite
        Publicite updatedPublicite = publiciteRepository.findById(publicite.getId()).get();
        // Disconnect from session so that the updates on updatedPublicite are not directly saved in db
        em.detach(updatedPublicite);
        updatedPublicite
            .image(UPDATED_IMAGE)
            .imageContentType(UPDATED_IMAGE_CONTENT_TYPE)
            .video(UPDATED_VIDEO)
            .videoContentType(UPDATED_VIDEO_CONTENT_TYPE)
            .description(UPDATED_DESCRIPTION)
            .statut(UPDATED_STATUT);
        PubliciteDTO publiciteDTO = publiciteMapper.toDto(updatedPublicite);

        restPubliciteMockMvc
            .perform(
                put(ENTITY_API_URL_ID, publiciteDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(publiciteDTO))
            )
            .andExpect(status().isOk());

        // Validate the Publicite in the database
        List<Publicite> publiciteList = publiciteRepository.findAll();
        assertThat(publiciteList).hasSize(databaseSizeBeforeUpdate);
        Publicite testPublicite = publiciteList.get(publiciteList.size() - 1);
        assertThat(testPublicite.getImage()).isEqualTo(UPDATED_IMAGE);
        assertThat(testPublicite.getImageContentType()).isEqualTo(UPDATED_IMAGE_CONTENT_TYPE);
        assertThat(testPublicite.getVideo()).isEqualTo(UPDATED_VIDEO);
        assertThat(testPublicite.getVideoContentType()).isEqualTo(UPDATED_VIDEO_CONTENT_TYPE);
        assertThat(testPublicite.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testPublicite.getStatut()).isEqualTo(UPDATED_STATUT);
    }

    @Test
    @Transactional
    void putNonExistingPublicite() throws Exception {
        int databaseSizeBeforeUpdate = publiciteRepository.findAll().size();
        publicite.setId(count.incrementAndGet());

        // Create the Publicite
        PubliciteDTO publiciteDTO = publiciteMapper.toDto(publicite);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPubliciteMockMvc
            .perform(
                put(ENTITY_API_URL_ID, publiciteDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(publiciteDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Publicite in the database
        List<Publicite> publiciteList = publiciteRepository.findAll();
        assertThat(publiciteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchPublicite() throws Exception {
        int databaseSizeBeforeUpdate = publiciteRepository.findAll().size();
        publicite.setId(count.incrementAndGet());

        // Create the Publicite
        PubliciteDTO publiciteDTO = publiciteMapper.toDto(publicite);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPubliciteMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(publiciteDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Publicite in the database
        List<Publicite> publiciteList = publiciteRepository.findAll();
        assertThat(publiciteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamPublicite() throws Exception {
        int databaseSizeBeforeUpdate = publiciteRepository.findAll().size();
        publicite.setId(count.incrementAndGet());

        // Create the Publicite
        PubliciteDTO publiciteDTO = publiciteMapper.toDto(publicite);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPubliciteMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(publiciteDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Publicite in the database
        List<Publicite> publiciteList = publiciteRepository.findAll();
        assertThat(publiciteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdatePubliciteWithPatch() throws Exception {
        // Initialize the database
        publiciteRepository.saveAndFlush(publicite);

        int databaseSizeBeforeUpdate = publiciteRepository.findAll().size();

        // Update the publicite using partial update
        Publicite partialUpdatedPublicite = new Publicite();
        partialUpdatedPublicite.setId(publicite.getId());

        partialUpdatedPublicite.description(UPDATED_DESCRIPTION).statut(UPDATED_STATUT);

        restPubliciteMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPublicite.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPublicite))
            )
            .andExpect(status().isOk());

        // Validate the Publicite in the database
        List<Publicite> publiciteList = publiciteRepository.findAll();
        assertThat(publiciteList).hasSize(databaseSizeBeforeUpdate);
        Publicite testPublicite = publiciteList.get(publiciteList.size() - 1);
        assertThat(testPublicite.getImage()).isEqualTo(DEFAULT_IMAGE);
        assertThat(testPublicite.getImageContentType()).isEqualTo(DEFAULT_IMAGE_CONTENT_TYPE);
        assertThat(testPublicite.getVideo()).isEqualTo(DEFAULT_VIDEO);
        assertThat(testPublicite.getVideoContentType()).isEqualTo(DEFAULT_VIDEO_CONTENT_TYPE);
        assertThat(testPublicite.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testPublicite.getStatut()).isEqualTo(UPDATED_STATUT);
    }

    @Test
    @Transactional
    void fullUpdatePubliciteWithPatch() throws Exception {
        // Initialize the database
        publiciteRepository.saveAndFlush(publicite);

        int databaseSizeBeforeUpdate = publiciteRepository.findAll().size();

        // Update the publicite using partial update
        Publicite partialUpdatedPublicite = new Publicite();
        partialUpdatedPublicite.setId(publicite.getId());

        partialUpdatedPublicite
            .image(UPDATED_IMAGE)
            .imageContentType(UPDATED_IMAGE_CONTENT_TYPE)
            .video(UPDATED_VIDEO)
            .videoContentType(UPDATED_VIDEO_CONTENT_TYPE)
            .description(UPDATED_DESCRIPTION)
            .statut(UPDATED_STATUT);

        restPubliciteMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPublicite.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPublicite))
            )
            .andExpect(status().isOk());

        // Validate the Publicite in the database
        List<Publicite> publiciteList = publiciteRepository.findAll();
        assertThat(publiciteList).hasSize(databaseSizeBeforeUpdate);
        Publicite testPublicite = publiciteList.get(publiciteList.size() - 1);
        assertThat(testPublicite.getImage()).isEqualTo(UPDATED_IMAGE);
        assertThat(testPublicite.getImageContentType()).isEqualTo(UPDATED_IMAGE_CONTENT_TYPE);
        assertThat(testPublicite.getVideo()).isEqualTo(UPDATED_VIDEO);
        assertThat(testPublicite.getVideoContentType()).isEqualTo(UPDATED_VIDEO_CONTENT_TYPE);
        assertThat(testPublicite.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testPublicite.getStatut()).isEqualTo(UPDATED_STATUT);
    }

    @Test
    @Transactional
    void patchNonExistingPublicite() throws Exception {
        int databaseSizeBeforeUpdate = publiciteRepository.findAll().size();
        publicite.setId(count.incrementAndGet());

        // Create the Publicite
        PubliciteDTO publiciteDTO = publiciteMapper.toDto(publicite);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPubliciteMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, publiciteDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(publiciteDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Publicite in the database
        List<Publicite> publiciteList = publiciteRepository.findAll();
        assertThat(publiciteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchPublicite() throws Exception {
        int databaseSizeBeforeUpdate = publiciteRepository.findAll().size();
        publicite.setId(count.incrementAndGet());

        // Create the Publicite
        PubliciteDTO publiciteDTO = publiciteMapper.toDto(publicite);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPubliciteMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(publiciteDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Publicite in the database
        List<Publicite> publiciteList = publiciteRepository.findAll();
        assertThat(publiciteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamPublicite() throws Exception {
        int databaseSizeBeforeUpdate = publiciteRepository.findAll().size();
        publicite.setId(count.incrementAndGet());

        // Create the Publicite
        PubliciteDTO publiciteDTO = publiciteMapper.toDto(publicite);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPubliciteMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(publiciteDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Publicite in the database
        List<Publicite> publiciteList = publiciteRepository.findAll();
        assertThat(publiciteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deletePublicite() throws Exception {
        // Initialize the database
        publiciteRepository.saveAndFlush(publicite);

        int databaseSizeBeforeDelete = publiciteRepository.findAll().size();

        // Delete the publicite
        restPubliciteMockMvc
            .perform(delete(ENTITY_API_URL_ID, publicite.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Publicite> publiciteList = publiciteRepository.findAll();
        assertThat(publiciteList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
