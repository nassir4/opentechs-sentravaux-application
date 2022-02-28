package com.opentechs.sentravaux.service.dto;

import java.io.Serializable;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.opentechs.sentravaux.domain.Metier} entity.
 */
public class MetierDTO implements Serializable {

    private Long id;

    @NotNull
    private String nom;

    private String description;

    private OuvrierDTO ouvrier;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public OuvrierDTO getOuvrier() {
        return ouvrier;
    }

    public void setOuvrier(OuvrierDTO ouvrier) {
        this.ouvrier = ouvrier;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof MetierDTO)) {
            return false;
        }

        MetierDTO metierDTO = (MetierDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, metierDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "MetierDTO{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", description='" + getDescription() + "'" +
            ", ouvrier=" + getOuvrier() +
            "}";
    }
}
