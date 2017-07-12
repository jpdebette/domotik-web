package fr.jp.perso.domotik.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import fr.jp.perso.domotik.domain.Command;
import fr.jp.perso.domotik.domain.Model;
import fr.jp.perso.domotik.repository.CommandRepository;

@Component
public class CommandService {
    @Autowired
    private CommandRepository commandRepository;

    public void mergeCommands(Model model, List<Command> commands) {
        List<Command> currentCommands = commandRepository.findAllCommandsByModel(model);
        for (Command command : commands) {
            Optional<Command> optionalCommand = currentCommands.stream().filter(c -> c.getName().equals(command.getName())).findFirst();
            if (optionalCommand.isPresent()) {
                command.setId(optionalCommand.get().getId());
                currentCommands.remove(optionalCommand.get());
            } else {
                save(command);
            }
        }
        commandRepository.delete(currentCommands);
    }

    public Command save(Command command) {
        return commandRepository.save(command);
    }

    public void delete(Command command) {
        commandRepository.delete(command);
    }
}
