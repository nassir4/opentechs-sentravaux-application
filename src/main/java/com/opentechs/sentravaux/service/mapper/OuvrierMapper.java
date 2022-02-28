package com.opentechs.sentravaux.service.mapper;

import com.opentechs.sentravaux.domain.Ouvrier;
import com.opentechs.sentravaux.service.dto.OuvrierDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Ouvrier} and its DTO {@link OuvrierDTO}.
 */
@Mapper(componentModel = "spring", uses = { UserMapper.class, AdresseMapper.class })
public interface OuvrierMapper extends EntityMapper<OuvrierDTO, Ouvrier> {
    @Mapping(target = "user", source = "user", qualifiedByName = "id")
    @Mapping(target = "adresse", source = "adresse", qualifiedByName = "id")
    OuvrierDTO toDto(Ouvrier s);

    @Named("id")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    OuvrierDTO toDtoId(Ouvrier ouvrier);
}
