package com.opentechs.sentravaux.service.mapper;

import com.opentechs.sentravaux.domain.Annonce;
import com.opentechs.sentravaux.service.dto.AnnonceDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Annonce} and its DTO {@link AnnonceDTO}.
 */
@Mapper(componentModel = "spring", uses = { OuvrierMapper.class })
public interface AnnonceMapper extends EntityMapper<AnnonceDTO, Annonce> {
    @Mapping(target = "ouvrier", source = "ouvrier", qualifiedByName = "id")
    AnnonceDTO toDto(Annonce s);

    @Named("id")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    AnnonceDTO toDtoId(Annonce annonce);
}
