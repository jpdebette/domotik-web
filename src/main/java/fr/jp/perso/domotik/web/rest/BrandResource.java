package fr.jp.perso.domotik.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.codahale.metrics.annotation.Timed;

import fr.jp.perso.domotik.domain.Brand;
import fr.jp.perso.domotik.service.BrandService;
import fr.jp.perso.domotik.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing Brand.
 */
@RestController
@RequestMapping("/api")
public class BrandResource {
    private final Logger log = LoggerFactory.getLogger(BrandResource.class);
    private final BrandService brandService;

    public BrandResource(BrandService brandService) {
        this.brandService = brandService;
    }

    /**
     * POST  /brands : Create a new brand.
     *
     * @param brand the brand to create
     * @return the ResponseEntity with status 201 (Created) and with body the new brand, or with status 400 (Bad Request) if the brand has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/brands")
    @Timed
    public ResponseEntity<Brand> createBrand(@Valid @RequestBody Brand brand) throws URISyntaxException {
        try {
            log.debug("REST request to save Brand : {}", brand);
            if(brand.getId() != null) {
                return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(Brand.ENTITY_NAME, "idexists", "A new brand cannot already have an ID")).body(null);
            }
            Brand result = brandService.createBrand(brand);
            return ResponseEntity.created(new URI("/api/brands/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(Brand.ENTITY_NAME, result.getId().toString()))
                .body(result);
        } catch(Exception ex) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(Brand.ENTITY_NAME, "error", ex.getMessage())).body(null);
        }
    }

    /**
     * PUT  /brands : Updates an existing brand.
     *
     * @param brand the brand to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated brand,
     * or with status 400 (Bad Request) if the brand is not valid,
     * or with status 500 (Internal Server Error) if the brand couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/brands")
    @Timed
    public ResponseEntity<Brand> updateBrand(@Valid @RequestBody Brand brand) throws URISyntaxException {
        log.debug("REST request to update Brand : {}", brand);
        if(brand.getId() == null) {
            return createBrand(brand);
        }
        Brand result = brandService.save(brand);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(Brand.ENTITY_NAME, brand.getId().toString()))
            .body(result);
    }

    @GetMapping("/brands/{id}/sync")
    @Timed
    public ResponseEntity<Void> synchronizeBrand(@PathVariable Long id) throws URISyntaxException {
        try {
            log.debug("REST request to sync Brand id : {}", id);
            Brand brand = brandService.findOne(id);
            brandService.synchronizeBrand(brand);
            return ResponseEntity.ok().headers(HeaderUtil.createEntityUpdateAlert(Brand.ENTITY_NAME, brand.getId().toString())).build();
        } catch(Exception ex) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(Brand.ENTITY_NAME, "error", ex.getMessage())).body(null);
        }
    }

    /**
     * GET  /brands : get all the brands.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of brands in body
     */
    @GetMapping("/brands")
    @Timed
    public List<Brand> getAllBrands() {
        log.debug("REST request to get all Brands");
        return brandService.findAll();
    }

    /**
     * GET  /brands/:id : get the "id" brand.
     *
     * @param id the id of the brand to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the brand, or with status 404 (Not Found)
     */
    @GetMapping("/brands/{id}")
    @Timed
    public ResponseEntity<Brand> getBrand(@PathVariable Long id) {
        log.debug("REST request to get Brand : {}", id);
        Brand brand = brandService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(brand));
    }

    /**
     * DELETE  /brands/:id : delete the "id" brand.
     *
     * @param id the id of the brand to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/brands/{id}")
    @Timed
    public ResponseEntity<Void> deleteBrand(@PathVariable Long id) {
        log.debug("REST request to delete Brand : {}", id);
        brandService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(Brand.ENTITY_NAME, id.toString())).build();
    }
}
