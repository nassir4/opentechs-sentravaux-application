package com.opentechs.sentravaux.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.opentechs.sentravaux.domain.enumeration.Disponiblite;
import java.io.Serializable;
import java.time.LocalDate;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Annonce.
 */
@Entity
@Table(name = "annonce")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Annonce implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "titre", nullable = false)
    private String titre;

    @Column(name = "statut")
    private Boolean statut;

    @NotNull
    @Column(name = "description", nullable = false)
    private String description;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "disponibilite", nullable = false)
    private Disponiblite disponibilite;

    @Lob
    @Column(name = "image_en_avant", nullable = false)
    private byte[] imageEnAvant;

    @NotNull
    @Column(name = "image_en_avant_content_type", nullable = false)
    private String imageEnAvantContentType;

    @Column(name = "created_at")
    private LocalDate createdAt;

    @ManyToOne
    @JsonIgnoreProperties(value = { "user", "adresse" }, allowSetters = true)
    private Ouvrier ouvrier;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Annonce id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitre() {
        return this.titre;
    }

    public Annonce titre(String titre) {
        this.setTitre(titre);
        return this;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public Boolean getStatut() {
        return this.statut;
    }

    public Annonce statut(Boolean statut) {
        this.setStatut(statut);
        return this;
    }

    public void setStatut(Boolean statut) {
        this.statut = statut;
    }

    public String getDescription() {
        return this.description;
    }

    public Annonce description(String description) {
        this.setDescription(description);
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Disponiblite getDisponibilite() {
        return this.disponibilite;
    }

    public Annonce disponibilite(Disponiblite disponibilite) {
        this.setDisponibilite(disponibilite);
        return this;
    }

    public void setDisponibilite(Disponiblite disponibilite) {
        this.disponibilite = disponibilite;
    }

    public byte[] getImageEnAvant() {
        return this.imageEnAvant;
    }

    public Annonce imageEnAvant(byte[] imageEnAvant) {
        this.setImageEnAvant(imageEnAvant);
        return this;
    }

    public void setImageEnAvant(byte[] imageEnAvant) {
        this.imageEnAvant = imageEnAvant;
    }

    public String getImageEnAvantContentType() {
        return this.imageEnAvantContentType;
    }

    public Annonce imageEnAvantContentType(String imageEnAvantContentType) {
        this.imageEnAvantContentType = imageEnAvantContentType;
        return this;
    }

    public void setImageEnAvantContentType(String imageEnAvantContentType) {
        this.imageEnAvantContentType = imageEnAvantContentType;
    }

    public LocalDate getCreatedAt() {
        return this.createdAt;
    }

    public Annonce createdAt(LocalDate createdAt) {
        this.setCreatedAt(createdAt);
        return this;
    }

    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
    }

    public Ouvrier getOuvrier() {
        return this.ouvrier;
    }

    public void setOuvrier(Ouvrier ouvrier) {
        this.ouvrier = ouvrier;
    }

    public Annonce ouvrier(Ouvrier ouvrier) {
        this.setOuvrier(ouvrier);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Annonce)) {
            return false;
        }
        return id != null && id.equals(((Annonce) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Annonce{" +
            "id=" + getId() +
            ", titre='" + getTitre() + "'" +
            ", statut='" + getStatut() + "'" +
            ", description='" + getDescription() + "'" +
            ", disponibilite='" + getDisponibilite() + "'" +
            ", imageEnAvant='" + getImageEnAvant() + "'" +
            ", imageEnAvantContentType='" + getImageEnAvantContentType() + "'" +
            ", createdAt='" + getCreatedAt() + "'" +
            "}";
    }
}
