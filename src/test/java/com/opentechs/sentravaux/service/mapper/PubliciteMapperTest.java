package com.opentechs.sentravaux.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class PubliciteMapperTest {

    private PubliciteMapper publiciteMapper;

    @BeforeEach
    public void setUp() {
        publiciteMapper = new PubliciteMapperImpl();
    }
}
