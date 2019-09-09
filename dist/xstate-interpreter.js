"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const xstate_1 = require("xstate");
module.exports = function (RED) {
    function StateMachineNode(config) {
        RED.nodes.createNode(this, config);
        let toggleMachineConfig;
        // Todo: is there native JSON support in node-red
        try {
            toggleMachineConfig = JSON.parse(config.machineDefinition);
        }
        catch (e) {
            toggleMachineConfig = {
                id: 'toggle',
                initial: 'inactive',
                states: {
                    inactive: { on: { TOGGLE: 'active' } },
                    active: { on: { TOGGLE: 'inactive' } }
                }
            };
        }
        const toggleMachine = xstate_1.Machine(toggleMachineConfig);
        const toggleService = xstate_1.interpret(toggleMachine);
        toggleService
            .onTransition(state => {
            this.send({ payload: state.value });
        })
            .start();
        this.on('input', msg => {
            toggleService.send(msg.payload);
        });
    }
    RED.nodes.registerType('xstate-interpreter', StateMachineNode);
};
