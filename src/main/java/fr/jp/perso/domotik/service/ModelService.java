package fr.jp.perso.domotik.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import fr.jp.perso.domotik.domain.Model;
import fr.jp.perso.domotik.repository.ModelRepository;

@Component
public class ModelService {
    @Autowired
    private ModelRepository modelRepository;

    public void mergeModels(List<Model> models) {
        List<Model> currentModels = modelRepository.findAll();
        for (Model model : models) {
            Optional<Model> optionalModel = currentModels.stream().filter(c -> c.getName().equals(model.getName())).findFirst();
            if (optionalModel.isPresent()) {
                model.setId(optionalModel.get().getId());
                currentModels.remove(optionalModel.get());
            } else {
                save(model);
            }
        }
        modelRepository.delete(currentModels);
    }

    public Model save(Model model) {
        return modelRepository.save(model);
    }

    public void delete(Model model) {
        modelRepository.delete(model);
    }
}
