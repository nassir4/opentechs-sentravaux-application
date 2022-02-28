package com.opentechs.sentravaux.service.mapper;

import com.opentechs.sentravaux.domain.Metier;
import com.opentechs.sentravaux.service.dto.MetierDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Metier} and its DTO {@link MetierDTO}.
 */
@Mapper(componentModel = "spring", uses = { OuvrierMapper.class })
public interface MetierMapper extends EntityMapper<MetierDTO, Metier> {
    @Mapping(target = "ouvrier", source = "ouvrier", qualifiedByName = "id")
    MetierDTO toDto(Metier s);
}
