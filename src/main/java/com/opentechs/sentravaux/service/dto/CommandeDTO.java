package com.opentechs.sentravaux.service.dto;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A DTO for the {@link com.opentechs.sentravaux.domain.Commande} entity.
 */
public class CommandeDTO implements Serializable {

    private Long id;

    private Integer quantiteTotal;

    private Integer prixTotal;

    private LocalDate createdAt;

    private ClientDTO client;

    private OuvrierDTO ouvrier;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getQuantiteTotal() {
        return quantiteTotal;
    }

    public void setQuantiteTotal(Integer quantiteTotal) {
        this.quantiteTotal = quantiteTotal;
    }

    public Integer getPrixTotal() {
        return prixTotal;
    }

    public void setPrixTotal(Integer prixTotal) {
        this.prixTotal = prixTotal;
    }

    public LocalDate getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
    }

    public ClientDTO getClient() {
        return client;
    }

    public void setClient(ClientDTO client) {
        this.client = client;
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
        if (!(o instanceof CommandeDTO)) {
            return false;
        }

        CommandeDTO commandeDTO = (CommandeDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, commandeDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CommandeDTO{" +
            "id=" + getId() +
            ", quantiteTotal=" + getQuantiteTotal() +
            ", prixTotal=" + getPrixTotal() +
            ", createdAt='" + getCreatedAt() + "'" +
            ", client=" + getClient() +
            ", ouvrier=" + getOuvrier() +
            "}";
    }
}
