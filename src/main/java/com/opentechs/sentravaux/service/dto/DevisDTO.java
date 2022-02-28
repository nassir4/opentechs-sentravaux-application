package com.opentechs.sentravaux.service.dto;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A DTO for the {@link com.opentechs.sentravaux.domain.Devis} entity.
 */
public class DevisDTO implements Serializable {

    private Long id;

    private LocalDate dateDevis;

    private Integer manoeuvre;

    private Integer sommeTotal;

    private DevisDTO ouvrier;

    private ClientDTO client;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDateDevis() {
        return dateDevis;
    }

    public void setDateDevis(LocalDate dateDevis) {
        this.dateDevis = dateDevis;
    }

    public Integer getManoeuvre() {
        return manoeuvre;
    }

    public void setManoeuvre(Integer manoeuvre) {
        this.manoeuvre = manoeuvre;
    }

    public Integer getSommeTotal() {
        return sommeTotal;
    }

    public void setSommeTotal(Integer sommeTotal) {
        this.sommeTotal = sommeTotal;
    }

    public DevisDTO getOuvrier() {
        return ouvrier;
    }

    public void setOuvrier(DevisDTO ouvrier) {
        this.ouvrier = ouvrier;
    }

    public ClientDTO getClient() {
        return client;
    }

    public void setClient(ClientDTO client) {
        this.client = client;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DevisDTO)) {
            return false;
        }

        DevisDTO devisDTO = (DevisDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, devisDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "DevisDTO{" +
            "id=" + getId() +
            ", dateDevis='" + getDateDevis() + "'" +
            ", manoeuvre=" + getManoeuvre() +
            ", sommeTotal=" + getSommeTotal() +
            ", ouvrier=" + getOuvrier() +
            ", client=" + getClient() +
            "}";
    }
}
