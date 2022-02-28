package com.opentechs.sentravaux.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.opentechs.sentravaux.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class LigneCommandeDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(LigneCommandeDTO.class);
        LigneCommandeDTO ligneCommandeDTO1 = new LigneCommandeDTO();
        ligneCommandeDTO1.setId(1L);
        LigneCommandeDTO ligneCommandeDTO2 = new LigneCommandeDTO();
        assertThat(ligneCommandeDTO1).isNotEqualTo(ligneCommandeDTO2);
        ligneCommandeDTO2.setId(ligneCommandeDTO1.getId());
        assertThat(ligneCommandeDTO1).isEqualTo(ligneCommandeDTO2);
        ligneCommandeDTO2.setId(2L);
        assertThat(ligneCommandeDTO1).isNotEqualTo(ligneCommandeDTO2);
        ligneCommandeDTO1.setId(null);
        assertThat(ligneCommandeDTO1).isNotEqualTo(ligneCommandeDTO2);
    }
}
