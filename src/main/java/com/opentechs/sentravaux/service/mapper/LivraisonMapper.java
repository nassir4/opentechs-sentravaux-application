package com.opentechs.sentravaux.service.mapper;

import com.opentechs.sentravaux.domain.Livraison;
import com.opentechs.sentravaux.service.dto.LivraisonDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Livraison} and its DTO {@link LivraisonDTO}.
 */
@Mapper(componentModel = "spring", uses = { CommandeMapper.class })
public interface LivraisonMapper extends EntityMapper<LivraisonDTO, Livraison> {
    @Mapping(target = "commande", source = "commande", qualifiedByName = "id")
    LivraisonDTO toDto(Livraison s);
}
