package com.opentechs.sentravaux.service.mapper;

import com.opentechs.sentravaux.domain.Admin;
import com.opentechs.sentravaux.service.dto.AdminDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Admin} and its DTO {@link AdminDTO}.
 */
@Mapper(componentModel = "spring", uses = { UserMapper.class })
public interface AdminMapper extends EntityMapper<AdminDTO, Admin> {
    @Mapping(target = "user", source = "user", qualifiedByName = "id")
    AdminDTO toDto(Admin s);

    @Named("id")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    AdminDTO toDtoId(Admin admin);
}
