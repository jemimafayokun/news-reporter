const endPoints = require('../endpoints.json')
const fs = require('fs/promises')

exports.allEndPoints = () => {
return fs.readFile(`${__dirname}/../endpoints.json`, "utf-8").then((fileContents) => {
const parsedFileContents = JSON.parse(fileContents)
return parsedFileContents
})
}