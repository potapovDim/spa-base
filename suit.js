function Suit(title, status = 'executed') {
    this.status = status
    this.browser = ''
    this.title = title
    this.runned = false
    this.tests = []
    this.hooks = []
    this.currentTest = null
    this.currentHook = null
}

Suit.prototype.startHook = function(hook) {
    this.currentHook = hook
    this.hooks.push(hook)
}


Suit.prototype.getCurrentHook = function() {
    return this.currentHook
}

Suit.prototype.endHook = function(data) {
    this.currentHook = null
}

Suit.prototype.startTest = function(test) {
    this.currentTest = test
    this.tests.push(test)
}

Suit.prototype.getCurrentTest = function() {
    return this.currentTest
}

Suit.prototype.endTest = function(date) {
    this.getCurrentTest().endTest(date)
    this.currentTest = null
}

Suit.prototype.addBrowser = function(browser) {
    this.browser = browser
}

Suit.prototype.toJSON = function() {
    const self = this
    return {
        title: self.title,
        status: self.status,
        browser: self.browser,
        hooks: [...self.hooks.map(hook => hook.toJSON())],
        tests: [...self.tests.map(test => test.toJSON())]
    }
}

module.exports = {
    Suit
}