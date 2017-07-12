package fr.jp.perso.domotik.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.StringJoiner;
import java.util.stream.Collectors;

import org.json.JSONException;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;

import fr.jp.perso.domotik.CommandDto;
import fr.jp.perso.domotik.domain.Brand;
import fr.jp.perso.domotik.domain.Command;
import fr.jp.perso.domotik.domain.Model;
import fr.jp.perso.domotik.repository.BrandRepository;

@Component
public class BrandService {
    private final Logger log = LoggerFactory.getLogger(BrandService.class);

    private final BrandRepository brandRepository;
    private final ModelService modelService;
    private final CommandService commandService;

    public BrandService(BrandRepository brandRepository, ModelService modelService, CommandService commandService) {
        this.brandRepository = brandRepository;
        this.modelService = modelService;
        this.commandService = commandService;
    }

    public Brand findOne(long id) {
        return brandRepository.findOne(id);
    }

    public List<Brand> findAll() {
        return brandRepository.findAll();
    }

    public void delete(long id) {
        brandRepository.delete(id);
    }

    public Brand save(Brand brand) {
        return brandRepository.save(brand);
    }

    public Brand createBrand(Brand brand) {
        List<Model> models = fetchModels(brand);
        Map<Model, List<Command>> commandsByModel = fetchCommands(models);
        List<Command> commands = commandsByModel.values().stream().flatMap(List::stream).collect(Collectors.toList());
        return saveDatas(brand, models, commands);
    }

    public void synchronizeBrand(Brand brand) {
        List<Model> models = fetchModels(brand);
        modelService.mergeModels(models);
        Map<Model, List<Command>> commandsByModel = fetchCommands(models);
        for (Map.Entry<Model, List<Command>> entry : commandsByModel.entrySet()) {
            commandService.mergeCommands(entry.getKey(), entry.getValue());
        }
    }

    private List<Model> fetchModels(Brand brand) {
        try {
            StringJoiner urlJoiner = new StringJoiner("/");
            urlJoiner.add("http://localhost:10081");
            urlJoiner.add(brand.getApi());
            urlJoiner.add("model");

            RestTemplate restTemplate = new RestTemplate();
            List<Model> models = new ArrayList<>();

            String apiResponse = restTemplate.getForObject(urlJoiner.toString(), String.class);
            ObjectMapper mapper = new ObjectMapper();
            JavaType type = mapper.getTypeFactory().constructCollectionType(List.class, String.class);
            List<String> modelNames = mapper.readValue(apiResponse, type);
            for(String modelName : modelNames) {
                Model model = new Model();
                model.setName(modelName);
                model.setBrand(brand);
                models.add(model);
            }
            return models;
        } catch (Exception ex) {
            log.error(ex.getMessage(), ex);
            throw new RuntimeException("Problem during fetching models for brand: " + brand.getName());
        }
    }

    private Map<Model, List<Command>> fetchCommands(List<Model> models) {
        Map<Model, List<Command>> commandsByModel = new HashMap<>();
        for (Model model : models) {
            commandsByModel.put(model, fetchCommands(model));
        }

        return commandsByModel;
    }

    private List<Command> fetchCommands(Model model) {
        try {
            StringJoiner urlJoiner = new StringJoiner("/");
            urlJoiner.add("http://localhost:10081");
            urlJoiner.add(model.getBrand().getApi());
            urlJoiner.add(model.getName());
            urlJoiner.add("command");

            RestTemplate restTemplate = new RestTemplate();
            List<Command> commands = new ArrayList<>();

            String apiResponse = restTemplate.getForObject(urlJoiner.toString(), String.class);
            ObjectMapper mapper = new ObjectMapper();
            JavaType type = mapper.getTypeFactory().constructCollectionType(List.class, CommandDto.class);
            List<CommandDto> commandDtos = mapper.readValue(apiResponse, type);
            for(CommandDto commandDto : commandDtos) {
                Command command = new Command();
                command.setName(commandDto.getName());
                command.setModel(model);
                commands.add(command);
            }
            return commands;
        } catch (Exception ex) {
            log.error(ex.getMessage(), ex);
            throw new RuntimeException("Problem during fetching commands for model: " + model.getName());
        }
    }

    @Transactional
    private Brand saveDatas(Brand brand, List<Model> models, List<Command> commands) {
        Brand savedBrand = brandRepository.save(brand);
        for (Model model : models) {
            modelService.save(model);
        }
        for (Command command : commands) {
            commandService.save(command);
        }

        return savedBrand;
    }

    private String processError(Exception initialError, String command) {
        String response = initialError.getMessage();
        if (initialError instanceof HttpClientErrorException) {
            if (((HttpClientErrorException)initialError).getStatusCode() == HttpStatus.NOT_FOUND) {
                response = String.format("The command '%s' does not exist: %s", command, initialError.getMessage());
            }
        } else {
            response = "Error sending the command: " + initialError.getMessage();
        }

        JSONObject jsonResponse = new JSONObject();
        try {
            jsonResponse.put("Error", response);
        } catch(JSONException e) {
            log.error("Error converting response into json: " + response);
        }

        return jsonResponse.toString();
    }
}
