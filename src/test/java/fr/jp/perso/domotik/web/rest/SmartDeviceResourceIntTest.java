package fr.jp.perso.domotik.web.rest;

import fr.jp.perso.domotik.DomotikWebApp;

import fr.jp.perso.domotik.domain.SmartDevice;
import fr.jp.perso.domotik.repository.SmartDeviceRepository;
import fr.jp.perso.domotik.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the SmartDeviceResource REST controller.
 *
 * @see SmartDeviceResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DomotikWebApp.class)
public class SmartDeviceResourceIntTest {

    private static final String DEFAULT_IP_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_IP_ADDRESS = "BBBBBBBBBB";

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private SmartDeviceRepository smartDeviceRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSmartDeviceMockMvc;

    private SmartDevice smartDevice;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        SmartDeviceResource smartDeviceResource = new SmartDeviceResource(smartDeviceRepository);
        this.restSmartDeviceMockMvc = MockMvcBuilders.standaloneSetup(smartDeviceResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SmartDevice createEntity(EntityManager em) {
        SmartDevice smartDevice = new SmartDevice()
            .ipAddress(DEFAULT_IP_ADDRESS)
            .name(DEFAULT_NAME);
        return smartDevice;
    }

    @Before
    public void initTest() {
        smartDevice = createEntity(em);
    }

    @Test
    @Transactional
    public void createSmartDevice() throws Exception {
        int databaseSizeBeforeCreate = smartDeviceRepository.findAll().size();

        // Create the SmartDevice
        restSmartDeviceMockMvc.perform(post("/api/smart-devices")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(smartDevice)))
            .andExpect(status().isCreated());

        // Validate the SmartDevice in the database
        List<SmartDevice> smartDeviceList = smartDeviceRepository.findAll();
        assertThat(smartDeviceList).hasSize(databaseSizeBeforeCreate + 1);
        SmartDevice testSmartDevice = smartDeviceList.get(smartDeviceList.size() - 1);
        assertThat(testSmartDevice.getIpAddress()).isEqualTo(DEFAULT_IP_ADDRESS);
        assertThat(testSmartDevice.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createSmartDeviceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = smartDeviceRepository.findAll().size();

        // Create the SmartDevice with an existing ID
        smartDevice.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSmartDeviceMockMvc.perform(post("/api/smart-devices")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(smartDevice)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<SmartDevice> smartDeviceList = smartDeviceRepository.findAll();
        assertThat(smartDeviceList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkIpAddressIsRequired() throws Exception {
        int databaseSizeBeforeTest = smartDeviceRepository.findAll().size();
        // set the field null
        smartDevice.setIpAddress(null);

        // Create the SmartDevice, which fails.

        restSmartDeviceMockMvc.perform(post("/api/smart-devices")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(smartDevice)))
            .andExpect(status().isBadRequest());

        List<SmartDevice> smartDeviceList = smartDeviceRepository.findAll();
        assertThat(smartDeviceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = smartDeviceRepository.findAll().size();
        // set the field null
        smartDevice.setName(null);

        // Create the SmartDevice, which fails.

        restSmartDeviceMockMvc.perform(post("/api/smart-devices")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(smartDevice)))
            .andExpect(status().isBadRequest());

        List<SmartDevice> smartDeviceList = smartDeviceRepository.findAll();
        assertThat(smartDeviceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSmartDevices() throws Exception {
        // Initialize the database
        smartDeviceRepository.saveAndFlush(smartDevice);

        // Get all the smartDeviceList
        restSmartDeviceMockMvc.perform(get("/api/smart-devices?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(smartDevice.getId().intValue())))
            .andExpect(jsonPath("$.[*].ipAddress").value(hasItem(DEFAULT_IP_ADDRESS.toString())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void getSmartDevice() throws Exception {
        // Initialize the database
        smartDeviceRepository.saveAndFlush(smartDevice);

        // Get the smartDevice
        restSmartDeviceMockMvc.perform(get("/api/smart-devices/{id}", smartDevice.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(smartDevice.getId().intValue()))
            .andExpect(jsonPath("$.ipAddress").value(DEFAULT_IP_ADDRESS.toString()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSmartDevice() throws Exception {
        // Get the smartDevice
        restSmartDeviceMockMvc.perform(get("/api/smart-devices/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSmartDevice() throws Exception {
        // Initialize the database
        smartDeviceRepository.saveAndFlush(smartDevice);
        int databaseSizeBeforeUpdate = smartDeviceRepository.findAll().size();

        // Update the smartDevice
        SmartDevice updatedSmartDevice = smartDeviceRepository.findOne(smartDevice.getId());
        updatedSmartDevice
            .ipAddress(UPDATED_IP_ADDRESS)
            .name(UPDATED_NAME);

        restSmartDeviceMockMvc.perform(put("/api/smart-devices")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSmartDevice)))
            .andExpect(status().isOk());

        // Validate the SmartDevice in the database
        List<SmartDevice> smartDeviceList = smartDeviceRepository.findAll();
        assertThat(smartDeviceList).hasSize(databaseSizeBeforeUpdate);
        SmartDevice testSmartDevice = smartDeviceList.get(smartDeviceList.size() - 1);
        assertThat(testSmartDevice.getIpAddress()).isEqualTo(UPDATED_IP_ADDRESS);
        assertThat(testSmartDevice.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingSmartDevice() throws Exception {
        int databaseSizeBeforeUpdate = smartDeviceRepository.findAll().size();

        // Create the SmartDevice

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restSmartDeviceMockMvc.perform(put("/api/smart-devices")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(smartDevice)))
            .andExpect(status().isCreated());

        // Validate the SmartDevice in the database
        List<SmartDevice> smartDeviceList = smartDeviceRepository.findAll();
        assertThat(smartDeviceList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteSmartDevice() throws Exception {
        // Initialize the database
        smartDeviceRepository.saveAndFlush(smartDevice);
        int databaseSizeBeforeDelete = smartDeviceRepository.findAll().size();

        // Get the smartDevice
        restSmartDeviceMockMvc.perform(delete("/api/smart-devices/{id}", smartDevice.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<SmartDevice> smartDeviceList = smartDeviceRepository.findAll();
        assertThat(smartDeviceList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SmartDevice.class);
        SmartDevice smartDevice1 = new SmartDevice();
        smartDevice1.setId(1L);
        SmartDevice smartDevice2 = new SmartDevice();
        smartDevice2.setId(smartDevice1.getId());
        assertThat(smartDevice1).isEqualTo(smartDevice2);
        smartDevice2.setId(2L);
        assertThat(smartDevice1).isNotEqualTo(smartDevice2);
        smartDevice1.setId(null);
        assertThat(smartDevice1).isNotEqualTo(smartDevice2);
    }
}
