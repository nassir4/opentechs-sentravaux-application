package com.opentechs.sentravaux.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.opentechs.sentravaux.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class MetierDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(MetierDTO.class);
        MetierDTO metierDTO1 = new MetierDTO();
        metierDTO1.setId(1L);
        MetierDTO metierDTO2 = new MetierDTO();
        assertThat(metierDTO1).isNotEqualTo(metierDTO2);
        metierDTO2.setId(metierDTO1.getId());
        assertThat(metierDTO1).isEqualTo(metierDTO2);
        metierDTO2.setId(2L);
        assertThat(metierDTO1).isNotEqualTo(metierDTO2);
        metierDTO1.setId(null);
        assertThat(metierDTO1).isNotEqualTo(metierDTO2);
    }
}
