import { Node, NodeProperties, Red } from 'node-red'
import { interpret, Machine } from 'xstate'

interface IStateMachineConfig extends NodeProperties {
  machineDefinition: string
}

module.exports = function(RED: Red) {
  function StateMachineNode(this: Node, config: IStateMachineConfig) {
    RED.nodes.createNode(this, config)
    
    let toggleMachineConfig 
    // Todo: is there native JSON support in node-red
    try {
      toggleMachineConfig = JSON.parse(config.machineDefinition)
    } catch (e){
      toggleMachineConfig = {
        id: 'toggle',
        initial: 'inactive',
        states: {
          inactive: { on: { TOGGLE: 'active' } },
          active: { on: { TOGGLE: 'inactive' } }
        }
      }
    }


    const toggleMachine = Machine(toggleMachineConfig)
    const toggleService = interpret(toggleMachine)

    toggleService
      .onTransition(state => {
        this.send({ payload: state.value })
      })
      .start()

    this.on('input', msg => {
      toggleService.send(msg.payload)
    })
  }

  RED.nodes.registerType('xstate-interpreter', StateMachineNode)
}
