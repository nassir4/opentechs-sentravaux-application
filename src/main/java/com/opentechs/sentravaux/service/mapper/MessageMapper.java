package com.opentechs.sentravaux.service.mapper;

import com.opentechs.sentravaux.domain.Message;
import com.opentechs.sentravaux.service.dto.MessageDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Message} and its DTO {@link MessageDTO}.
 */
@Mapper(componentModel = "spring", uses = { OuvrierMapper.class, ClientMapper.class, MediaMapper.class })
public interface MessageMapper extends EntityMapper<MessageDTO, Message> {
    @Mapping(target = "ouvrier", source = "ouvrier", qualifiedByName = "id")
    @Mapping(target = "client", source = "client", qualifiedByName = "id")
    @Mapping(target = "media", source = "media", qualifiedByName = "id")
    MessageDTO toDto(Message s);
}
