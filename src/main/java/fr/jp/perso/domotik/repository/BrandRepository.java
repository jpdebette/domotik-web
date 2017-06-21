package fr.jp.perso.domotik.repository;

import fr.jp.perso.domotik.domain.Brand;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Brand entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BrandRepository extends JpaRepository<Brand,Long> {
    
}
