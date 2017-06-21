package fr.jp.perso.domotik.web.rest;

import fr.jp.perso.domotik.DomotikWebApp;

import fr.jp.perso.domotik.domain.CommandParameter;
import fr.jp.perso.domotik.repository.CommandParameterRepository;
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
 * Test class for the CommandParameterResource REST controller.
 *
 * @see CommandParameterResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DomotikWebApp.class)
public class CommandParameterResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private CommandParameterRepository commandParameterRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCommandParameterMockMvc;

    private CommandParameter commandParameter;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        CommandParameterResource commandParameterResource = new CommandParameterResource(commandParameterRepository);
        this.restCommandParameterMockMvc = MockMvcBuilders.standaloneSetup(commandParameterResource)
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
    public static CommandParameter createEntity(EntityManager em) {
        CommandParameter commandParameter = new CommandParameter()
            .name(DEFAULT_NAME);
        return commandParameter;
    }

    @Before
    public void initTest() {
        commandParameter = createEntity(em);
    }

    @Test
    @Transactional
    public void createCommandParameter() throws Exception {
        int databaseSizeBeforeCreate = commandParameterRepository.findAll().size();

        // Create the CommandParameter
        restCommandParameterMockMvc.perform(post("/api/command-parameters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(commandParameter)))
            .andExpect(status().isCreated());

        // Validate the CommandParameter in the database
        List<CommandParameter> commandParameterList = commandParameterRepository.findAll();
        assertThat(commandParameterList).hasSize(databaseSizeBeforeCreate + 1);
        CommandParameter testCommandParameter = commandParameterList.get(commandParameterList.size() - 1);
        assertThat(testCommandParameter.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createCommandParameterWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = commandParameterRepository.findAll().size();

        // Create the CommandParameter with an existing ID
        commandParameter.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCommandParameterMockMvc.perform(post("/api/command-parameters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(commandParameter)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<CommandParameter> commandParameterList = commandParameterRepository.findAll();
        assertThat(commandParameterList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = commandParameterRepository.findAll().size();
        // set the field null
        commandParameter.setName(null);

        // Create the CommandParameter, which fails.

        restCommandParameterMockMvc.perform(post("/api/command-parameters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(commandParameter)))
            .andExpect(status().isBadRequest());

        List<CommandParameter> commandParameterList = commandParameterRepository.findAll();
        assertThat(commandParameterList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCommandParameters() throws Exception {
        // Initialize the database
        commandParameterRepository.saveAndFlush(commandParameter);

        // Get all the commandParameterList
        restCommandParameterMockMvc.perform(get("/api/command-parameters?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(commandParameter.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void getCommandParameter() throws Exception {
        // Initialize the database
        commandParameterRepository.saveAndFlush(commandParameter);

        // Get the commandParameter
        restCommandParameterMockMvc.perform(get("/api/command-parameters/{id}", commandParameter.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(commandParameter.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCommandParameter() throws Exception {
        // Get the commandParameter
        restCommandParameterMockMvc.perform(get("/api/command-parameters/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCommandParameter() throws Exception {
        // Initialize the database
        commandParameterRepository.saveAndFlush(commandParameter);
        int databaseSizeBeforeUpdate = commandParameterRepository.findAll().size();

        // Update the commandParameter
        CommandParameter updatedCommandParameter = commandParameterRepository.findOne(commandParameter.getId());
        updatedCommandParameter
            .name(UPDATED_NAME);

        restCommandParameterMockMvc.perform(put("/api/command-parameters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCommandParameter)))
            .andExpect(status().isOk());

        // Validate the CommandParameter in the database
        List<CommandParameter> commandParameterList = commandParameterRepository.findAll();
        assertThat(commandParameterList).hasSize(databaseSizeBeforeUpdate);
        CommandParameter testCommandParameter = commandParameterList.get(commandParameterList.size() - 1);
        assertThat(testCommandParameter.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingCommandParameter() throws Exception {
        int databaseSizeBeforeUpdate = commandParameterRepository.findAll().size();

        // Create the CommandParameter

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCommandParameterMockMvc.perform(put("/api/command-parameters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(commandParameter)))
            .andExpect(status().isCreated());

        // Validate the CommandParameter in the database
        List<CommandParameter> commandParameterList = commandParameterRepository.findAll();
        assertThat(commandParameterList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCommandParameter() throws Exception {
        // Initialize the database
        commandParameterRepository.saveAndFlush(commandParameter);
        int databaseSizeBeforeDelete = commandParameterRepository.findAll().size();

        // Get the commandParameter
        restCommandParameterMockMvc.perform(delete("/api/command-parameters/{id}", commandParameter.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CommandParameter> commandParameterList = commandParameterRepository.findAll();
        assertThat(commandParameterList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CommandParameter.class);
        CommandParameter commandParameter1 = new CommandParameter();
        commandParameter1.setId(1L);
        CommandParameter commandParameter2 = new CommandParameter();
        commandParameter2.setId(commandParameter1.getId());
        assertThat(commandParameter1).isEqualTo(commandParameter2);
        commandParameter2.setId(2L);
        assertThat(commandParameter1).isNotEqualTo(commandParameter2);
        commandParameter1.setId(null);
        assertThat(commandParameter1).isNotEqualTo(commandParameter2);
    }
}
