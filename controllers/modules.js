const {fastify, fs, util, path, uuidv4, pump} = require('../imports.js')

const generateFilename = (original_filename) => {
    uuid = uuidv4()
    ext = original_filename.split('.')[1]
    new_name = uuid + '.' + ext

    return new_name
}

module.exports = { generateFilename }