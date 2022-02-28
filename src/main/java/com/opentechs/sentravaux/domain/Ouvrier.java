package com.opentechs.sentravaux.domain;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Ouvrier.
 */
@Entity
@Table(name = "ouvrier")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Ouvrier implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "telephone", nullable = false)
    private Integer telephone;

    @OneToOne
    @JoinColumn(unique = true)
    private User user;

    @ManyToOne
    private Adresse adresse;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Ouvrier id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getTelephone() {
        return this.telephone;
    }

    public Ouvrier telephone(Integer telephone) {
        this.setTelephone(telephone);
        return this;
    }

    public void setTelephone(Integer telephone) {
        this.telephone = telephone;
    }

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Ouvrier user(User user) {
        this.setUser(user);
        return this;
    }

    public Adresse getAdresse() {
        return this.adresse;
    }

    public void setAdresse(Adresse adresse) {
        this.adresse = adresse;
    }

    public Ouvrier adresse(Adresse adresse) {
        this.setAdresse(adresse);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Ouvrier)) {
            return false;
        }
        return id != null && id.equals(((Ouvrier) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Ouvrier{" +
            "id=" + getId() +
            ", telephone=" + getTelephone() +
            "}";
    }
}
