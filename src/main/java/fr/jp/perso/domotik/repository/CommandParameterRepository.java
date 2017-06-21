package fr.jp.perso.domotik.repository;

import fr.jp.perso.domotik.domain.CommandParameter;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the CommandParameter entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CommandParameterRepository extends JpaRepository<CommandParameter,Long> {
    
}
