const {expect} = require('chai')
const fs = require('fs')
const path = require('path')

const {assertResultDirExist} = require('../utils')

describe('util module', () => {
  it('assertResultDirExist', async () => {
    const sleep = (time) => new Promise(res => setTimeout(res, time))
    try {
      assertResultDirExist('test')
      await sleep(1000)
      expect(fs.readdirSync(path.resolve(__dirname, '../spa-report')).length).to.eql(1)
      expect(fs.readdirSync(path.resolve(__dirname, '../spa-report'))).to.eql(['test'])
    } catch(e) {
      console.error(e)
      throw e
    }
  })
})