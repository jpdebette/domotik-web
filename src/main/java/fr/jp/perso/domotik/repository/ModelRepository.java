package fr.jp.perso.domotik.repository;

import fr.jp.perso.domotik.domain.Model;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Model entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ModelRepository extends JpaRepository<Model,Long> {
    
}
