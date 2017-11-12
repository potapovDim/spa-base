const { idGenerator, outputFile } = require('./utils')

function Step(title) {
    this.title = title
    this.files = []
}

Step.prototype.addFile = function (dir, file) {
    const id = idGenerator(25)
    this.files.push(id)
    try {
        outputFile(dir, file, id)
    } catch (e) {
        console.log(e)
    }
}

Step.prototype.toJSON = function () {
    const self = this
    return {
        title: self.title,
        files: self.files
    }
}

module.exports = {
    Step
}