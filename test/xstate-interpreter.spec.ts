import * as should from 'should'
import * as helper from 'node-red-node-test-helper'
import * as xstateInterpreterNode from '../src/xstate-interpreter'

helper.init(require.resolve('node-red'))

describe('xstate-interpreter Node', function() {
  beforeEach(done => helper.startServer(done))

  afterEach(done => {
    helper.unload()
    helper.stopServer(done)
  })

  it('should be loaded', done => {
    const flow = [{ id: 'n1', type: 'xstate-interpreter', name: 'test name' }]
    helper.load(xstateInterpreterNode, flow, () => {
      const n1 = helper.getNode('n1')
      n1.should.have.property('name', 'test name')
      done()
    })
  })


  //   it('should make payload lower case', function (done) {
  //     var flow = [{ id: "n1", type: "xstate-interpreter", name: "test name",wires:[["n2"]] },
  //     { id: "n2", type: "helper" }];
  //     helper.load(xstateInterpreterNode, flow, function () {
  //       var n2 = helper.getNode("n2");
  //       var n1 = helper.getNode("n1");
  //       n2.on("input", function (msg) {
  //         msg.should.have.property('payload', 'uppercase');
  //         done();
  //       });
  //       n1.receive({ payload: "UpperCase" });
  //     });
  //   });
})
