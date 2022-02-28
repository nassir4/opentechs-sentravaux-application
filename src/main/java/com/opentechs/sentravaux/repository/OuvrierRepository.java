package com.opentechs.sentravaux.repository;

import com.opentechs.sentravaux.domain.Ouvrier;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Ouvrier entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OuvrierRepository extends JpaRepository<Ouvrier, Long> {}
