package fr.jp.perso.domotik.web.rest;

import com.codahale.metrics.annotation.Timed;
import fr.jp.perso.domotik.domain.CommandParameter;

import fr.jp.perso.domotik.repository.CommandParameterRepository;
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
 * REST controller for managing CommandParameter.
 */
@RestController
@RequestMapping("/api")
public class CommandParameterResource {

    private final Logger log = LoggerFactory.getLogger(CommandParameterResource.class);

    private static final String ENTITY_NAME = "commandParameter";

    private final CommandParameterRepository commandParameterRepository;

    public CommandParameterResource(CommandParameterRepository commandParameterRepository) {
        this.commandParameterRepository = commandParameterRepository;
    }

    /**
     * POST  /command-parameters : Create a new commandParameter.
     *
     * @param commandParameter the commandParameter to create
     * @return the ResponseEntity with status 201 (Created) and with body the new commandParameter, or with status 400 (Bad Request) if the commandParameter has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/command-parameters")
    @Timed
    public ResponseEntity<CommandParameter> createCommandParameter(@Valid @RequestBody CommandParameter commandParameter) throws URISyntaxException {
        log.debug("REST request to save CommandParameter : {}", commandParameter);
        if (commandParameter.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new commandParameter cannot already have an ID")).body(null);
        }
        CommandParameter result = commandParameterRepository.save(commandParameter);
        return ResponseEntity.created(new URI("/api/command-parameters/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /command-parameters : Updates an existing commandParameter.
     *
     * @param commandParameter the commandParameter to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated commandParameter,
     * or with status 400 (Bad Request) if the commandParameter is not valid,
     * or with status 500 (Internal Server Error) if the commandParameter couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/command-parameters")
    @Timed
    public ResponseEntity<CommandParameter> updateCommandParameter(@Valid @RequestBody CommandParameter commandParameter) throws URISyntaxException {
        log.debug("REST request to update CommandParameter : {}", commandParameter);
        if (commandParameter.getId() == null) {
            return createCommandParameter(commandParameter);
        }
        CommandParameter result = commandParameterRepository.save(commandParameter);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, commandParameter.getId().toString()))
            .body(result);
    }

    /**
     * GET  /command-parameters : get all the commandParameters.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of commandParameters in body
     */
    @GetMapping("/command-parameters")
    @Timed
    public List<CommandParameter> getAllCommandParameters() {
        log.debug("REST request to get all CommandParameters");
        return commandParameterRepository.findAll();
    }

    /**
     * GET  /command-parameters/:id : get the "id" commandParameter.
     *
     * @param id the id of the commandParameter to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the commandParameter, or with status 404 (Not Found)
     */
    @GetMapping("/command-parameters/{id}")
    @Timed
    public ResponseEntity<CommandParameter> getCommandParameter(@PathVariable Long id) {
        log.debug("REST request to get CommandParameter : {}", id);
        CommandParameter commandParameter = commandParameterRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(commandParameter));
    }

    /**
     * DELETE  /command-parameters/:id : delete the "id" commandParameter.
     *
     * @param id the id of the commandParameter to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/command-parameters/{id}")
    @Timed
    public ResponseEntity<Void> deleteCommandParameter(@PathVariable Long id) {
        log.debug("REST request to delete CommandParameter : {}", id);
        commandParameterRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
