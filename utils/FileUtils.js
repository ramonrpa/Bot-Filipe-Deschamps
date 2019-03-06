// by switchblade

const fs = require('fs')
const { promisify } = require('util')
const readdir = promisify(fs.readdir)
const path = require('path')

class FileUtils {
  static getFiles (dirPath, sucess, error) {
    const files = await readdir(dirPath)
    const filesObject = {}
    return Promise.all(files.map(async file => {
      const fullPath = path.resolve(dirPath, file)
      if ((/(.js)$/g).test(file)) {
        try {
          const required = require(fullPath)
          if (success) success(required, file.replace(/(.js)$/g, ''))
          filesObject[file] = required
          return required
        } catch (e) {
          error(e)
        }
      } 
    })).then(() => filesObject).catch(console.error)
  }
}

module.exports = FileUtils
