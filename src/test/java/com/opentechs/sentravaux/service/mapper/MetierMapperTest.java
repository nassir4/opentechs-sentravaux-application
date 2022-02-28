package com.opentechs.sentravaux.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class MetierMapperTest {

    private MetierMapper metierMapper;

    @BeforeEach
    public void setUp() {
        metierMapper = new MetierMapperImpl();
    }
}
