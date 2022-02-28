package com.opentechs.sentravaux.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.opentechs.sentravaux.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class PubliciteDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(PubliciteDTO.class);
        PubliciteDTO publiciteDTO1 = new PubliciteDTO();
        publiciteDTO1.setId(1L);
        PubliciteDTO publiciteDTO2 = new PubliciteDTO();
        assertThat(publiciteDTO1).isNotEqualTo(publiciteDTO2);
        publiciteDTO2.setId(publiciteDTO1.getId());
        assertThat(publiciteDTO1).isEqualTo(publiciteDTO2);
        publiciteDTO2.setId(2L);
        assertThat(publiciteDTO1).isNotEqualTo(publiciteDTO2);
        publiciteDTO1.setId(null);
        assertThat(publiciteDTO1).isNotEqualTo(publiciteDTO2);
    }
}
