package fr.jp.perso.domotik.web.rest;

import com.codahale.metrics.annotation.Timed;
import fr.jp.perso.domotik.domain.SmartDevice;

import fr.jp.perso.domotik.repository.SmartDeviceRepository;
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
 * REST controller for managing SmartDevice.
 */
@RestController
@RequestMapping("/api")
public class SmartDeviceResource {

    private final Logger log = LoggerFactory.getLogger(SmartDeviceResource.class);

    private static final String ENTITY_NAME = "smartDevice";

    private final SmartDeviceRepository smartDeviceRepository;

    public SmartDeviceResource(SmartDeviceRepository smartDeviceRepository) {
        this.smartDeviceRepository = smartDeviceRepository;
    }

    /**
     * POST  /smart-devices : Create a new smartDevice.
     *
     * @param smartDevice the smartDevice to create
     * @return the ResponseEntity with status 201 (Created) and with body the new smartDevice, or with status 400 (Bad Request) if the smartDevice has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/smart-devices")
    @Timed
    public ResponseEntity<SmartDevice> createSmartDevice(@Valid @RequestBody SmartDevice smartDevice) throws URISyntaxException {
        log.debug("REST request to save SmartDevice : {}", smartDevice);
        if (smartDevice.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new smartDevice cannot already have an ID")).body(null);
        }
        SmartDevice result = smartDeviceRepository.save(smartDevice);
        return ResponseEntity.created(new URI("/api/smart-devices/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /smart-devices : Updates an existing smartDevice.
     *
     * @param smartDevice the smartDevice to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated smartDevice,
     * or with status 400 (Bad Request) if the smartDevice is not valid,
     * or with status 500 (Internal Server Error) if the smartDevice couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/smart-devices")
    @Timed
    public ResponseEntity<SmartDevice> updateSmartDevice(@Valid @RequestBody SmartDevice smartDevice) throws URISyntaxException {
        log.debug("REST request to update SmartDevice : {}", smartDevice);
        if (smartDevice.getId() == null) {
            return createSmartDevice(smartDevice);
        }
        SmartDevice result = smartDeviceRepository.save(smartDevice);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, smartDevice.getId().toString()))
            .body(result);
    }

    /**
     * GET  /smart-devices : get all the smartDevices.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of smartDevices in body
     */
    @GetMapping("/smart-devices")
    @Timed
    public List<SmartDevice> getAllSmartDevices() {
        log.debug("REST request to get all SmartDevices");
        return smartDeviceRepository.findAll();
    }

    /**
     * GET  /smart-devices/:id : get the "id" smartDevice.
     *
     * @param id the id of the smartDevice to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the smartDevice, or with status 404 (Not Found)
     */
    @GetMapping("/smart-devices/{id}")
    @Timed
    public ResponseEntity<SmartDevice> getSmartDevice(@PathVariable Long id) {
        log.debug("REST request to get SmartDevice : {}", id);
        SmartDevice smartDevice = smartDeviceRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(smartDevice));
    }

    /**
     * DELETE  /smart-devices/:id : delete the "id" smartDevice.
     *
     * @param id the id of the smartDevice to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/smart-devices/{id}")
    @Timed
    public ResponseEntity<Void> deleteSmartDevice(@PathVariable Long id) {
        log.debug("REST request to delete SmartDevice : {}", id);
        smartDeviceRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
