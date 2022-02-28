package com.opentechs.sentravaux.service.mapper;

import com.opentechs.sentravaux.domain.Media;
import com.opentechs.sentravaux.service.dto.MediaDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Media} and its DTO {@link MediaDTO}.
 */
@Mapper(componentModel = "spring", uses = { AnnonceMapper.class })
public interface MediaMapper extends EntityMapper<MediaDTO, Media> {
    @Mapping(target = "annonce", source = "annonce", qualifiedByName = "id")
    MediaDTO toDto(Media s);

    @Named("id")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    MediaDTO toDtoId(Media media);
}
