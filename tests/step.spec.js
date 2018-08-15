const {expect} = require('chai')
const {Step} = require('../step')

describe('step module', () => {
  it('toJson', async () => {
    const step = new Step('test step')
    expect(step.title).to.eql('test step')
    const jsonData = step.toJSON()

    expect(jsonData.title).to.eql('test step')
    expect(jsonData.files).to.eql([])
  })
})
