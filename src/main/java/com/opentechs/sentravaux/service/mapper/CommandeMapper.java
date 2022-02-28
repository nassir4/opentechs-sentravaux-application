package com.opentechs.sentravaux.service.mapper;

import com.opentechs.sentravaux.domain.Commande;
import com.opentechs.sentravaux.service.dto.CommandeDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Commande} and its DTO {@link CommandeDTO}.
 */
@Mapper(componentModel = "spring", uses = { ClientMapper.class, OuvrierMapper.class })
public interface CommandeMapper extends EntityMapper<CommandeDTO, Commande> {
    @Mapping(target = "client", source = "client", qualifiedByName = "id")
    @Mapping(target = "ouvrier", source = "ouvrier", qualifiedByName = "id")
    CommandeDTO toDto(Commande s);

    @Named("id")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    CommandeDTO toDtoId(Commande commande);
}
