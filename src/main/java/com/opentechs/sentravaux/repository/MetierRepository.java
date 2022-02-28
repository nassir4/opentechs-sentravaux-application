package com.opentechs.sentravaux.repository;

import com.opentechs.sentravaux.domain.Metier;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Metier entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MetierRepository extends JpaRepository<Metier, Long> {}
