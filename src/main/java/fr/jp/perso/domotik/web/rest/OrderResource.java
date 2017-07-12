package fr.jp.perso.domotik.web.rest;

import java.net.URISyntaxException;
import java.util.Optional;
import java.util.StringJoiner;

import javax.validation.Valid;

import com.codahale.metrics.annotation.Timed;
import fr.jp.perso.domotik.ApiResponseDto;
import fr.jp.perso.domotik.domain.Order;
import io.github.jhipster.web.util.ResponseUtil;
import org.json.JSONException;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

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

        StringJoiner urlJoiner = new StringJoiner("/");
        urlJoiner.add("http://localhost:10081");
        urlJoiner.add(order.getSmartDevice().getModel().getBrand().getApi());
        urlJoiner.add(order.getSmartDevice().getModel().getName());
        urlJoiner.add(order.getSmartDevice().getIpAddress());
        urlJoiner.add(order.getCommand().getName());

        RestTemplate restTemplate = new RestTemplate();
        String response;
        try {
            ApiResponseDto apiResponse = restTemplate.getForObject(urlJoiner.toString(), ApiResponseDto.class);
            response = apiResponse.getResponse();
        } catch (Exception ex) {
            response = processError(ex, order.getCommand().getName());
        }

        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(response));
    }

    private String processError(Exception initialError, String command) {
        String response = initialError.getMessage();
        if (initialError instanceof HttpClientErrorException) {
            if (((HttpClientErrorException) initialError).getStatusCode() == HttpStatus.NOT_FOUND) {
                response = String.format("The command '%s' does not exist: %s", command, initialError.getMessage());
            }
        } else {
            response = "Error sending the command: " + initialError.getMessage();
        }

        JSONObject jsonResponse = new JSONObject();
        try {
            jsonResponse.put("Error", response);
        } catch (JSONException e) {
            log.error("Error converting response into json: " + response);
        }

        return jsonResponse.toString();
    }
}
