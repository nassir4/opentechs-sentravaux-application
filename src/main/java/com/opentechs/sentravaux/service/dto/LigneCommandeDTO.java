package com.opentechs.sentravaux.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.opentechs.sentravaux.domain.LigneCommande} entity.
 */
public class LigneCommandeDTO implements Serializable {

    private Long id;

    private Integer quantite;

    private Integer prix;

    private CommandeDTO commande;

    private ProduitDTO produit;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getQuantite() {
        return quantite;
    }

    public void setQuantite(Integer quantite) {
        this.quantite = quantite;
    }

    public Integer getPrix() {
        return prix;
    }

    public void setPrix(Integer prix) {
        this.prix = prix;
    }

    public CommandeDTO getCommande() {
        return commande;
    }

    public void setCommande(CommandeDTO commande) {
        this.commande = commande;
    }

    public ProduitDTO getProduit() {
        return produit;
    }

    public void setProduit(ProduitDTO produit) {
        this.produit = produit;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof LigneCommandeDTO)) {
            return false;
        }

        LigneCommandeDTO ligneCommandeDTO = (LigneCommandeDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, ligneCommandeDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "LigneCommandeDTO{" +
            "id=" + getId() +
            ", quantite=" + getQuantite() +
            ", prix=" + getPrix() +
            ", commande=" + getCommande() +
            ", produit=" + getProduit() +
            "}";
    }
}
