package com.opentechs.sentravaux.service.dto;

import com.opentechs.sentravaux.domain.enumeration.Disponiblite;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;
import javax.persistence.Lob;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.opentechs.sentravaux.domain.Annonce} entity.
 */
public class AnnonceDTO implements Serializable {

    private Long id;

    @NotNull
    private String titre;

    private Boolean statut;

    @NotNull
    private String description;

    @NotNull
    private Disponiblite disponibilite;

    @Lob
    private byte[] imageEnAvant;

    private String imageEnAvantContentType;
    private LocalDate createdAt;

    private OuvrierDTO ouvrier;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitre() {
        return titre;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public Boolean getStatut() {
        return statut;
    }

    public void setStatut(Boolean statut) {
        this.statut = statut;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Disponiblite getDisponibilite() {
        return disponibilite;
    }

    public void setDisponibilite(Disponiblite disponibilite) {
        this.disponibilite = disponibilite;
    }

    public byte[] getImageEnAvant() {
        return imageEnAvant;
    }

    public void setImageEnAvant(byte[] imageEnAvant) {
        this.imageEnAvant = imageEnAvant;
    }

    public String getImageEnAvantContentType() {
        return imageEnAvantContentType;
    }

    public void setImageEnAvantContentType(String imageEnAvantContentType) {
        this.imageEnAvantContentType = imageEnAvantContentType;
    }

    public LocalDate getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
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
        if (!(o instanceof AnnonceDTO)) {
            return false;
        }

        AnnonceDTO annonceDTO = (AnnonceDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, annonceDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "AnnonceDTO{" +
            "id=" + getId() +
            ", titre='" + getTitre() + "'" +
            ", statut='" + getStatut() + "'" +
            ", description='" + getDescription() + "'" +
            ", disponibilite='" + getDisponibilite() + "'" +
            ", imageEnAvant='" + getImageEnAvant() + "'" +
            ", createdAt='" + getCreatedAt() + "'" +
            ", ouvrier=" + getOuvrier() +
            "}";
    }
}
