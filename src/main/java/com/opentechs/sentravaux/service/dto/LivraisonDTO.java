package com.opentechs.sentravaux.service.dto;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.opentechs.sentravaux.domain.Livraison} entity.
 */
public class LivraisonDTO implements Serializable {

    private Long id;

    @NotNull
    private String quartier;

    private LocalDate dateLivraison;

    private CommandeDTO commande;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getQuartier() {
        return quartier;
    }

    public void setQuartier(String quartier) {
        this.quartier = quartier;
    }

    public LocalDate getDateLivraison() {
        return dateLivraison;
    }

    public void setDateLivraison(LocalDate dateLivraison) {
        this.dateLivraison = dateLivraison;
    }

    public CommandeDTO getCommande() {
        return commande;
    }

    public void setCommande(CommandeDTO commande) {
        this.commande = commande;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof LivraisonDTO)) {
            return false;
        }

        LivraisonDTO livraisonDTO = (LivraisonDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, livraisonDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "LivraisonDTO{" +
            "id=" + getId() +
            ", quartier='" + getQuartier() + "'" +
            ", dateLivraison='" + getDateLivraison() + "'" +
            ", commande=" + getCommande() +
            "}";
    }
}
