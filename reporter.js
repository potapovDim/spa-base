const {assertResultDirExist, generateReport} = require('./utils')

const {Step} = require('./step')

function Spa() {
    function toLastDay(time) {
        let lastDay = 0
        const arr = time.split('')
        for(let i = arr.length - 1; i > 0; i--) {
            arr[i] = '0'; lastDay++
            if(lastDay === 8) return arr.join('')
        }
    }

    this.dirName = toLastDay(`${Date.now()}`)
    this.runName = 'Run ' + new Date().toDateString() + ' ' + new Date().getHours() + ':' + new Date().getMinutes()
    this.opts = {}
    this.suits = []
    this.currentSuit = null
    this.stats = null
}

Spa.prototype.runSuit = function(suit) {
    assertResultDirExist(this.dirName)
    this.currentSuit = suit
    this.suits.push(suit)
}

Spa.prototype.attachStackError = function(err) {
    if(this.getCurrentSuit().getCurrentTest()) {
        this.getCurrentSuit().getCurrentTest().attachStackError(err)
    } else if(this.getCurrentSuit().getCurrentHook()) {
        this.getCurrentSuit().getCurrentHook().attachStackError(err)
        this.getCurrentSuit().endHook()
    }
}

Spa.prototype.getCurrentSuit = function() {return this.currentSuit}

Spa.prototype.addRunName = function(name) {this.runName = name}

Spa.prototype.attachData = function(data) {
    var currentTest = this.getCurrentSuit().getCurrentTest()
    var currentHook = this.getCurrentSuit().getCurrentHook()
    if(currentHook) {currentHook.attachFile(this.dirName, data)}
    else {currentTest.attachFile(this.dirName, data)}
}

Spa.prototype.createStep = function(title) {
    var currentTest = this.getCurrentSuit().getCurrentTest()
    var currentHook = this.getCurrentSuit().getCurrentHook()
    if(currentHook) {currentHook.addStep(new Step(title))}
    else {currentTest.addStep(new Step(title))}
}

Spa.prototype.addTestOptions = function(opts) {
    this.getCurrentSuit().getCurrentTest().addTestOptions(opts)
}

Spa.prototype.endSuit = function() {this.currentSuit = null}

Spa.prototype.toJSON = function(stats) {
    const self = this
    return {
        stats,
        runName: self.runName,
        opts: self.opts,
        browser: self.browser,
        suits: [...self.suits.map(suit => suit.toJSON())]
    }
}

Spa.prototype.currentBrowser = function(browser) {this.getCurrentSuit().addBrowser(browser)}

Spa.prototype.addEnvOpts = function(opts) {this.opts = Object.assign(this.opts, opts)}

Spa.prototype.createReport = function(stats) {
    const fs = require('fs')
    const path = require('path')
    const data = this.toJSON(stats)
    generateReport(this.dirName, data)
}


Spa.prototype.buidPublickApi = function() {
    const self = this
    return {
        addTestOptions: self.addTestOptions.bind(self),
        createStep: self.createStep.bind(self),
        attachData: self.attachData.bind(self),
        currentBrowser: self.currentBrowser.bind(self),
        setEnvOpts: self.addEnvOpts.bind(self)
    }
}

module.exports = {
    Spa
}