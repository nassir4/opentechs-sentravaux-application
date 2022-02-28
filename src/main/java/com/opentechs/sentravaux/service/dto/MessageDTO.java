package com.opentechs.sentravaux.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.opentechs.sentravaux.domain.Message} entity.
 */
public class MessageDTO implements Serializable {

    private Long id;

    private String message;

    private OuvrierDTO ouvrier;

    private ClientDTO client;

    private MediaDTO media;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public OuvrierDTO getOuvrier() {
        return ouvrier;
    }

    public void setOuvrier(OuvrierDTO ouvrier) {
        this.ouvrier = ouvrier;
    }

    public ClientDTO getClient() {
        return client;
    }

    public void setClient(ClientDTO client) {
        this.client = client;
    }

    public MediaDTO getMedia() {
        return media;
    }

    public void setMedia(MediaDTO media) {
        this.media = media;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof MessageDTO)) {
            return false;
        }

        MessageDTO messageDTO = (MessageDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, messageDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "MessageDTO{" +
            "id=" + getId() +
            ", message='" + getMessage() + "'" +
            ", ouvrier=" + getOuvrier() +
            ", client=" + getClient() +
            ", media=" + getMedia() +
            "}";
    }
}
