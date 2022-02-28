package com.opentechs.sentravaux.service.mapper;

import com.opentechs.sentravaux.domain.Devis;
import com.opentechs.sentravaux.service.dto.DevisDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Devis} and its DTO {@link DevisDTO}.
 */
@Mapper(componentModel = "spring", uses = { ClientMapper.class })
public interface DevisMapper extends EntityMapper<DevisDTO, Devis> {
    @Mapping(target = "ouvrier", source = "ouvrier", qualifiedByName = "id")
    @Mapping(target = "client", source = "client", qualifiedByName = "id")
    DevisDTO toDto(Devis s);

    @Named("id")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    DevisDTO toDtoId(Devis devis);
}
