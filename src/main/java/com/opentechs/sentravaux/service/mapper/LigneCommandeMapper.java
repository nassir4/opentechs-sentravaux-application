package com.opentechs.sentravaux.service.mapper;

import com.opentechs.sentravaux.domain.LigneCommande;
import com.opentechs.sentravaux.service.dto.LigneCommandeDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link LigneCommande} and its DTO {@link LigneCommandeDTO}.
 */
@Mapper(componentModel = "spring", uses = { CommandeMapper.class, ProduitMapper.class })
public interface LigneCommandeMapper extends EntityMapper<LigneCommandeDTO, LigneCommande> {
    @Mapping(target = "commande", source = "commande", qualifiedByName = "id")
    @Mapping(target = "produit", source = "produit", qualifiedByName = "id")
    LigneCommandeDTO toDto(LigneCommande s);
}
