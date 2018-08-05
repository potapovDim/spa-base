const {idGenerator, outputFile} = require('./utils')

function Step(title) {
    this.title = title
    this.files = []
}

Step.prototype.addFile = function(dir, file) {
    const id = idGenerator(25)
    const self = this
    function cb(fileWithType) {
        self.files.push(fileWithType)
    }
    try {
        outputFile(dir, file, id, cb)
    } catch(e) {
        console.log(e)
    }
}

Step.prototype.toJSON = function() {
    const self = this
    return {
        title: self.title,
        files: self.files
    }
}

module.exports = {
    Step
}