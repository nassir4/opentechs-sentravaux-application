package com.opentechs.sentravaux.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.LocalDate;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Devis.
 */
@Entity
@Table(name = "devis")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Devis implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "date_devis")
    private LocalDate dateDevis;

    @Column(name = "manoeuvre")
    private Integer manoeuvre;

    @Column(name = "somme_total")
    private Integer sommeTotal;

    @ManyToOne
    @JsonIgnoreProperties(value = { "ouvrier", "client" }, allowSetters = true)
    private Devis ouvrier;

    @ManyToOne
    @JsonIgnoreProperties(value = { "user", "adresse" }, allowSetters = true)
    private Client client;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Devis id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDateDevis() {
        return this.dateDevis;
    }

    public Devis dateDevis(LocalDate dateDevis) {
        this.setDateDevis(dateDevis);
        return this;
    }

    public void setDateDevis(LocalDate dateDevis) {
        this.dateDevis = dateDevis;
    }

    public Integer getManoeuvre() {
        return this.manoeuvre;
    }

    public Devis manoeuvre(Integer manoeuvre) {
        this.setManoeuvre(manoeuvre);
        return this;
    }

    public void setManoeuvre(Integer manoeuvre) {
        this.manoeuvre = manoeuvre;
    }

    public Integer getSommeTotal() {
        return this.sommeTotal;
    }

    public Devis sommeTotal(Integer sommeTotal) {
        this.setSommeTotal(sommeTotal);
        return this;
    }

    public void setSommeTotal(Integer sommeTotal) {
        this.sommeTotal = sommeTotal;
    }

    public Devis getOuvrier() {
        return this.ouvrier;
    }

    public void setOuvrier(Devis devis) {
        this.ouvrier = devis;
    }

    public Devis ouvrier(Devis devis) {
        this.setOuvrier(devis);
        return this;
    }

    public Client getClient() {
        return this.client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public Devis client(Client client) {
        this.setClient(client);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Devis)) {
            return false;
        }
        return id != null && id.equals(((Devis) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Devis{" +
            "id=" + getId() +
            ", dateDevis='" + getDateDevis() + "'" +
            ", manoeuvre=" + getManoeuvre() +
            ", sommeTotal=" + getSommeTotal() +
            "}";
    }
}
