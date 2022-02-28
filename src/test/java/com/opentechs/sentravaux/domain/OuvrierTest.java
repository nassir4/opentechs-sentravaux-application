package com.opentechs.sentravaux.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.opentechs.sentravaux.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class OuvrierTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Ouvrier.class);
        Ouvrier ouvrier1 = new Ouvrier();
        ouvrier1.setId(1L);
        Ouvrier ouvrier2 = new Ouvrier();
        ouvrier2.setId(ouvrier1.getId());
        assertThat(ouvrier1).isEqualTo(ouvrier2);
        ouvrier2.setId(2L);
        assertThat(ouvrier1).isNotEqualTo(ouvrier2);
        ouvrier1.setId(null);
        assertThat(ouvrier1).isNotEqualTo(ouvrier2);
    }
}
