const fastify = require('fastify') ({logger: true})
const fs = require('fs')
const util = require('util')
const path = require('path')
const { v4: uuidv4 } = require('uuid');
const { pipeline } = require('stream')
const pump = util.promisify(pipeline)
const { promisify } = require('util')
const exec = promisify(require('child_process').exec)


module.exports = {fastify, fs, util, path, uuidv4, pump, exec}