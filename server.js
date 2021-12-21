const {fastify, fs, util, path, uuidv4, pump} = require('./imports.js')

fastify.register(require('fastify-multipart'))
fastify.register(require('fastify-static'), {
    root: path.join(__dirname, 'pages'),
    prefix: '/pages/', // optional: default '/'
})
fastify.register(require('fastify-swagger'), {
    exposeRoute: true, 
    routePrefix: '/docs',
    swagger: {
        info: { title: 'Obfuscator Swagger Docs'}
    }
})
fastify.register(require('./routes/files'))
fastify.register(require('point-of-view'), {
    engine: {
        ejs: require('ejs'),
    },
})

fastify.get('/obfuscator', function (req, reply) {
    return reply.sendFile('obfuscator.html')
})

fastify.get('/', function (req, reply) {
    return reply.redirect('/obfuscator')
})

PORT = 7777


const start = async () => {
    try {
        await fastify.listen(PORT)
    } catch (error) {
        fastify.log.error(error)
        process.exit(1)
    }
}

start()