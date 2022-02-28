package com.opentechs.sentravaux.service.mapper;

import com.opentechs.sentravaux.domain.Client;
import com.opentechs.sentravaux.service.dto.ClientDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Client} and its DTO {@link ClientDTO}.
 */
@Mapper(componentModel = "spring", uses = { UserMapper.class, AdresseMapper.class })
public interface ClientMapper extends EntityMapper<ClientDTO, Client> {
    @Mapping(target = "user", source = "user", qualifiedByName = "id")
    @Mapping(target = "adresse", source = "adresse", qualifiedByName = "id")
    ClientDTO toDto(Client s);

    @Named("id")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    ClientDTO toDtoId(Client client);
}
