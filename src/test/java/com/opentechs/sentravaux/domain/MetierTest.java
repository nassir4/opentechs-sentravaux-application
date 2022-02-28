package com.opentechs.sentravaux.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.opentechs.sentravaux.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class MetierTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Metier.class);
        Metier metier1 = new Metier();
        metier1.setId(1L);
        Metier metier2 = new Metier();
        metier2.setId(metier1.getId());
        assertThat(metier1).isEqualTo(metier2);
        metier2.setId(2L);
        assertThat(metier1).isNotEqualTo(metier2);
        metier1.setId(null);
        assertThat(metier1).isNotEqualTo(metier2);
    }
}
