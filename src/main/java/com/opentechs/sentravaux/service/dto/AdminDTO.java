package com.opentechs.sentravaux.service.dto;

import java.io.Serializable;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.opentechs.sentravaux.domain.Admin} entity.
 */
public class AdminDTO implements Serializable {

    private Long id;

    @NotNull
    private Integer telephone;

    private UserDTO user;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getTelephone() {
        return telephone;
    }

    public void setTelephone(Integer telephone) {
        this.telephone = telephone;
    }

    public UserDTO getUser() {
        return user;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AdminDTO)) {
            return false;
        }

        AdminDTO adminDTO = (AdminDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, adminDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "AdminDTO{" +
            "id=" + getId() +
            ", telephone=" + getTelephone() +
            ", user=" + getUser() +
            "}";
    }
}
