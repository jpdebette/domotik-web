package fr.jp.perso.domotik.web.rest;

import com.codahale.metrics.annotation.Timed;
import fr.jp.perso.domotik.domain.Command;

import fr.jp.perso.domotik.repository.CommandRepository;
import fr.jp.perso.domotik.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Command.
 */
@RestController
@RequestMapping("/api")
public class CommandResource {

    private final Logger log = LoggerFactory.getLogger(CommandResource.class);

    private static final String ENTITY_NAME = "command";

    private final CommandRepository commandRepository;

    public CommandResource(CommandRepository commandRepository) {
        this.commandRepository = commandRepository;
    }

    /**
     * POST  /commands : Create a new command.
     *
     * @param command the command to create
     * @return the ResponseEntity with status 201 (Created) and with body the new command, or with status 400 (Bad Request) if the command has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/commands")
    @Timed
    public ResponseEntity<Command> createCommand(@Valid @RequestBody Command command) throws URISyntaxException {
        log.debug("REST request to save Command : {}", command);
        if (command.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new command cannot already have an ID")).body(null);
        }
        Command result = commandRepository.save(command);
        return ResponseEntity.created(new URI("/api/commands/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /commands : Updates an existing command.
     *
     * @param command the command to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated command,
     * or with status 400 (Bad Request) if the command is not valid,
     * or with status 500 (Internal Server Error) if the command couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/commands")
    @Timed
    public ResponseEntity<Command> updateCommand(@Valid @RequestBody Command command) throws URISyntaxException {
        log.debug("REST request to update Command : {}", command);
        if (command.getId() == null) {
            return createCommand(command);
        }
        Command result = commandRepository.save(command);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, command.getId().toString()))
            .body(result);
    }

    /**
     * GET  /commands : get all the commands.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of commands in body
     */
    @GetMapping("/commands")
    @Timed
    public List<Command> getAllCommands() {
        log.debug("REST request to get all Commands");
        return commandRepository.findAll();
    }

    /**
     * GET  /commands/:id : get the "id" command.
     *
     * @param id the id of the command to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the command, or with status 404 (Not Found)
     */
    @GetMapping("/commands/{id}")
    @Timed
    public ResponseEntity<Command> getCommand(@PathVariable Long id) {
        log.debug("REST request to get Command : {}", id);
        Command command = commandRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(command));
    }

    /**
     * DELETE  /commands/:id : delete the "id" command.
     *
     * @param id the id of the command to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/commands/{id}")
    @Timed
    public ResponseEntity<Void> deleteCommand(@PathVariable Long id) {
        log.debug("REST request to delete Command : {}", id);
        commandRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
