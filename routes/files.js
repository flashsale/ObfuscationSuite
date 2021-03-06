const {uploadFile, serveFile, outputPage} = require('../controllers/files')
const {fastify, fs, util, path, uuidv4, pump} = require('../imports.js')

const postFileOpts = {
    handler: uploadFile
}

const outputOpts = {
    handler: outputPage
}

const serveOpts = {
    handler: serveFile
}

function itemRoutes (fastify, options, done) {

    // Upload file
    fastify.post('/upload', postFileOpts)

    fastify.get('/output/:id', outputOpts)

    fastify.get('/download/:id/:file', serveOpts)

    done ()
}

module.exports = itemRoutes