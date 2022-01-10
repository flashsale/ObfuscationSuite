const {confuserConfig, runConfuser} = require('./obfuscation')
const {fastify, fs, util, path, uuidv4, pump} = require('../imports.js')

const serveFile = async (req, reply) => {

}

const outputPage = async (req, reply) => {

    const { id } = req.params
    meta_file = './files/' + id + '/meta.txt'

    // Read metadata file for the provided id
    if (!fs.existsSync(meta_file)) { 
        return reply.view('pages/output.ejs', { error_id: "404", err: "Job ID does not exist" }) 
    }
    let raw = fs.readFileSync(meta_file)
    let data = JSON.parse(raw)

    if (data.err != "") { 
        let re = /(\[ERROR\]).*/g
        let msg = data.err.match(re)
        return reply.view('pages/output.ejs', { error_id: "Confuser Error", err: msg, data: "test"})
    }

    return reply.view('pages/output.ejs', { id: id, data: data, err: "" })
}

const uploadFile = async (req, reply) => {

    // Create directory for this upload
    folder_id = uuidv4()
    folder_root = './files/'

    // Check if /files exists, make if not
    if (!fs.existsSync(folder_root)) { fs.mkdirSync(folder_root) }

    folder_path = folder_root + folder_id + '/'
    fs.mkdirSync(folder_path)

    // JSON object for metadata
    data_object = {
        files: [],
        flags: [],
        err: ""
    }

    // Create metadata file
    fs.createWriteStream(folder_path + 'meta.txt')

    // Parse the post data for files and flags
    const parts = req.parts()
    for await (const part of parts) {
        // If the part is a file
        if (part.file) {
            // Generate random filename
            filename = part.filename

            // Add the file to the metadata
            data_object.files.push(filename)

            // Construct the path and write the file to disk
            file_path = folder_path + filename
            await pump(part.file, fs.createWriteStream(file_path))
            
        // If it not a file, it is a flag - add each flag to the array in the object
        } else {
            flag = part.fieldname
            data_object.flags.push(flag)
        }
    }

    // Write the metadata object to the file
    let metadata = JSON.stringify(data_object)
    fs.writeFileSync(folder_path + 'meta.txt', metadata)

    // Obfuscation
    confuserConfig(folder_id, data_object)
    const err = await runConfuser(folder_id, data_object)

    if (err) {
        data_object.err = err
        metadata = JSON.stringify(data_object)
        fs.writeFileSync(folder_path + 'meta.txt', metadata)
    }

    // Zip folder for serving


    // Send to downloads page
    reply.redirect('/output/' + folder_id)
}

module.exports = { uploadFile, serveFile, outputPage }