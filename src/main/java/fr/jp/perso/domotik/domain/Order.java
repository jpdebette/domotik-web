package fr.jp.perso.domotik.domain;

public class Order {
    private SmartDevice smartDevice;
    private Command command;

    public SmartDevice getSmartDevice() {
        return smartDevice;
    }

    public Command getCommand() {
        return command;
    }
}
