const {uploadFile} = require('../controllers/files')
const {fastify, fs, util, path, uuidv4, pump} = require('../imports.js')

const postFileOpts = {
    handler: uploadFile
}

function itemRoutes (fastify, options, done) {

    // Upload file
    fastify.post('/upload', postFileOpts)

    done ()
}

module.exports = itemRoutes