package com.opentechs.sentravaux.service.mapper;

import com.opentechs.sentravaux.domain.Publicite;
import com.opentechs.sentravaux.service.dto.PubliciteDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Publicite} and its DTO {@link PubliciteDTO}.
 */
@Mapper(componentModel = "spring", uses = { AdminMapper.class })
public interface PubliciteMapper extends EntityMapper<PubliciteDTO, Publicite> {
    @Mapping(target = "admin", source = "admin", qualifiedByName = "id")
    PubliciteDTO toDto(Publicite s);
}
