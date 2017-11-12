const {
    assertRootDirExist,
    assertResultDirExist,
    generateReport,
    writeFile
} = require('./utils')

const { Step } = require('./step')

function Spa() {
    this.dirName = `Date-${new Date().toLocaleDateString()}@Time-${new Date().getHours()}-${new Date().getMinutes()}`
    this.opts = {}
    this.suits = []
    this.currentSuit = null
    this.stats = null
}

Spa.prototype.runSuit = function (suit) {
    assertResultDirExist(this.dirName)
    this.currentSuit = suit
    this.suits.push(suit)
}

Spa.prototype.attachStackError = function (err) {
    if (this.getCurrentSuit().getCurrentTest()) {
        this.getCurrentSuit().getCurrentTest().attachStackError(err)
    } else if(this.getCurrentSuit().getCurrentHook()) {
        this.getCurrentSuit().getCurrentHook().attachStackError(err)
        this.getCurrentSuit().endHook()
    }
}

Spa.prototype.getCurrentSuit = function () {
    return this.currentSuit
}

Spa.prototype.attachData = function (data) {
    this.getCurrentSuit().getCurrentTest().attachFile(this.dirName, data)
}

Spa.prototype.createStep = function (title) {
    this.getCurrentSuit().getCurrentTest().addStep(new Step(title))
}

Spa.prototype.endSuit = function () {
    this.currentSuit = null
}

Spa.prototype.toJSON = function (stats) {
    const self = this
    return {
        stats,
        suits: [...self.suits.map(suit => suit.toJSON())]
    }
}

Spa.prototype.createReport = function (stats) {
    const fs = require('fs')
    const path = require('path')
    const data = this.toJSON(stats)
    generateReport(this.dirName, data)
}


Spa.prototype.buidPublickApi = function () {
    const self = this
    return {
        createStep: self.createStep.bind(self),
        attachData: self.attachData.bind(self)
    }
}

module.exports = {
    Spa
}