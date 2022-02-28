package com.opentechs.sentravaux.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class OuvrierMapperTest {

    private OuvrierMapper ouvrierMapper;

    @BeforeEach
    public void setUp() {
        ouvrierMapper = new OuvrierMapperImpl();
    }
}
