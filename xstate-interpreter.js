//@ts-check
const Xstate = require('xstate')
const { Machine, interpret } = Xstate


module.exports = function(RED) {
    function StateMachineNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
   
        this.toggleMachineConfig = JSON.parse(config.machineDefinition) || {
            id: 'toggle',
            initial: 'inactive',
            states: {
              inactive: { on: { TOGGLE: 'active' } },
              active: { on: { TOGGLE: 'inactive' } }
            }
          }

          this.toggleMachine = Machine(this.toggleMachineConfig)
          this.toggleService = interpret(this.toggleMachine)
          this.toggleService.onTransition(function(state){
                    node.send({payload: state.value})
               })
            .start();

        
        node.on('input', function(msg) {
            node.toggleService.send(msg.payload)
        });

    }

    RED.nodes.registerType("xstate-interpreter",StateMachineNode);
}