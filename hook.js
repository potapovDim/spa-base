
const { idGenerator, outputFile } = require('./utils')

function Hook(title) {
    this.timeStart = +new Date()
    this.timeEnd = null
    this.speed = null
    this.state = null
    this.errorStack = null
    this.title = title
    this.steps = []
    this.files = []
    this.currentStep = null
}

Hook.prototype.addStep = function (step) {
    this.currentStep = step
    this.steps.push(step)
}

Hook.prototype.attachStackError = function (stack) {
    this.errorStack = stack
}

Hook.prototype.getCurrentStep = function () {
    return this.currentStep
}

Hook.prototype.addFile = function (dir, data) {
    const id = idGenerator(25)
    this.files.push(id)
    outputFile(dir, data, id)
}

Hook.prototype.attachFile = function (dir, file) {
    this.getCurrentStep()
        ? this.getCurrentStep().addFile(dir, file)
        : this.addFile(dir, file)
}

Hook.prototype.endHook = function (date) {
    this.state = date.state
    this.speed = date.speed
    this.timeEnd = + new Date()
}

Hook.prototype.toJSON = function () {
    const self = this
    return {
        title: self.title,
        state: self.state,
        speed: self.speed,
        timeStart: self.timeStart,
        timeEnd: self.timeEnd,
        errorStack: self.errorStack,
        durration: self.timeEnd - self.timeStart,
        steps: [...self.steps.map(step => step.toJSON())]
    }
}

module.exports = {
    Hook
}