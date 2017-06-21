package fr.jp.perso.domotik.repository;

import fr.jp.perso.domotik.domain.SmartDevice;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the SmartDevice entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SmartDeviceRepository extends JpaRepository<SmartDevice,Long> {
    
}
