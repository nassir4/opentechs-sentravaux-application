package com.opentechs.sentravaux.repository;

import com.opentechs.sentravaux.domain.Publicite;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Publicite entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PubliciteRepository extends JpaRepository<Publicite, Long> {}
