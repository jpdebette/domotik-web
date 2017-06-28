package fr.jp.perso.domotik.web.rest;

import java.net.URISyntaxException;
import java.util.Optional;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.codahale.metrics.annotation.Timed;

import fr.jp.perso.domotik.Model;
import fr.jp.perso.domotik.SmartDeviceDto;
import fr.jp.perso.domotik.domain.Order;
import io.github.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing Brand.
 */
@RestController
@RequestMapping("/api")
public class OrderResource {

    private final Logger log = LoggerFactory.getLogger(OrderResource.class);

    /**
     * POST  /orders : Send an order.
     *
     * @param order the order to send
     * @return the ResponseEntity with status 200 (OK), or with status 400 (Bad Request) if a problem occured.
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/orders")
    @Timed
    public ResponseEntity<String> sendOrder(@Valid @RequestBody Order order) throws URISyntaxException {
        log.debug("REST request to send Order : {}", order);

        SmartDeviceDto smartDeviceDto = new SmartDeviceDto(Model.TpLink_HS105, order.getSmartDevice().getIpAddress());

        RestTemplate restTemplate = new RestTemplate();
        String response = restTemplate.postForObject("http://localhost:10000/tplink/systemInfo", smartDeviceDto, String.class);

        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(response));
    }
}
