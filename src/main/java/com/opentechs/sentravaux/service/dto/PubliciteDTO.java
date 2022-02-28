package com.opentechs.sentravaux.service.dto;

import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Lob;

/**
 * A DTO for the {@link com.opentechs.sentravaux.domain.Publicite} entity.
 */
public class PubliciteDTO implements Serializable {

    private Long id;

    @Lob
    private byte[] image;

    private String imageContentType;

    @Lob
    private byte[] video;

    private String videoContentType;
    private String description;

    private Boolean statut;

    private AdminDTO admin;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getImageContentType() {
        return imageContentType;
    }

    public void setImageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
    }

    public byte[] getVideo() {
        return video;
    }

    public void setVideo(byte[] video) {
        this.video = video;
    }

    public String getVideoContentType() {
        return videoContentType;
    }

    public void setVideoContentType(String videoContentType) {
        this.videoContentType = videoContentType;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean getStatut() {
        return statut;
    }

    public void setStatut(Boolean statut) {
        this.statut = statut;
    }

    public AdminDTO getAdmin() {
        return admin;
    }

    public void setAdmin(AdminDTO admin) {
        this.admin = admin;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PubliciteDTO)) {
            return false;
        }

        PubliciteDTO publiciteDTO = (PubliciteDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, publiciteDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PubliciteDTO{" +
            "id=" + getId() +
            ", image='" + getImage() + "'" +
            ", video='" + getVideo() + "'" +
            ", description='" + getDescription() + "'" +
            ", statut='" + getStatut() + "'" +
            ", admin=" + getAdmin() +
            "}";
    }
}
