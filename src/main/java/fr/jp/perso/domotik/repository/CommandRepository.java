package fr.jp.perso.domotik.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import fr.jp.perso.domotik.domain.Command;
import fr.jp.perso.domotik.domain.Model;


/**
 * Spring Data JPA repository for the Command entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CommandRepository extends JpaRepository<Command,Long> {
    List<Command> findAllCommandsByModel(Model model);
}
