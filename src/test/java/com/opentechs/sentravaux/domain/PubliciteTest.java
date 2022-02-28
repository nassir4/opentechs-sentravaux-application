package com.opentechs.sentravaux.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.opentechs.sentravaux.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class PubliciteTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Publicite.class);
        Publicite publicite1 = new Publicite();
        publicite1.setId(1L);
        Publicite publicite2 = new Publicite();
        publicite2.setId(publicite1.getId());
        assertThat(publicite1).isEqualTo(publicite2);
        publicite2.setId(2L);
        assertThat(publicite1).isNotEqualTo(publicite2);
        publicite1.setId(null);
        assertThat(publicite1).isNotEqualTo(publicite2);
    }
}
