package fr.jp.perso.domotik.repository;

import fr.jp.perso.domotik.domain.Command;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Command entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CommandRepository extends JpaRepository<Command,Long> {
    
}
