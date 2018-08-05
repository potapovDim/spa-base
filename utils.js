const fs = require('fs')
const path = require('path')

const idGenerator = (length) => {
    const stringId = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890'
    let id = '';
    const rand = () => parseInt((Math.random() * 55).toFixed(0))
    for(let i = 0; i < 12; i++) {
        id += stringId[rand()]
    }
    return id
}

const assertConvertToJson = (data) => {
    if(typeof data === 'string') {return false}
    try {JSON.stringify(data); return true}
    catch(e) {return false}
}

const outputFile = (dir, data, id, cb) => {
    if(data instanceof Buffer && data.length !== 0) {
        const fileName = `${id}.png`; cb(fileName)
        fs.writeFileSync(path.resolve(process.cwd(), `./spa-report/${dir}/${fileName}`), data)
    } else if(assertConvertToJson(data)) {
        const fileName = `${id}.json`; cb(fileName)
        fs.writeFileSync(path.resolve(process.cwd(), `./spa-report/${dir}/${fileName}`), JSON.stringify(data, null, '\t'))
    } else {
        const fileName = `${id}.txt`; cb(fileName)
        fs.writeFileSync(path.resolve(process.cwd(), `./spa-report/${dir}/${fileName}`), data)
    }
}

const generateReport = (dir, runStructure) => {
    fs.writeFileSync(`./spa-report/${dir}/${idGenerator(8)}-suit.json`, JSON.stringify(runStructure, null, '\t'))
}

const assertRootDirExist = () => {
    const rootDirs = fs.readdirSync(process.cwd())
    if(!rootDirs.includes('spa-report')) {
        fs.mkdirSync(path.resolve(process.cwd(), './spa-report'))
    }
}

const assertResultDirExist = (outputDirResult) => {
    assertRootDirExist()
    const rootDirs = fs.readdirSync(path.resolve(process.cwd(), './spa-report'))
    if(!rootDirs.includes(outputDirResult)) {
        fs.mkdir(path.resolve(process.cwd() + '/spa-report/', outputDirResult), (err) => {
            if(err) throw err
        })
    }
}

module.exports = {
    assertRootDirExist,
    assertResultDirExist,
    generateReport,
    idGenerator,
    outputFile
}