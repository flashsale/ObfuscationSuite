const {generateFilename} = require('./modules')
const {fastify, fs, util, path, uuidv4, pump} = require('../imports.js')


const uploadFile = async (req, reply) => {

    // Create directory for this upload
    folder_id = uuidv4()
    folder_path = './files/' + folder_id + '/'
    fs.mkdirSync(folder_path)

    // JSON object for metadata
    data_object = {
        files: [],
        flags: []
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

    reply.send()
}

module.exports = { uploadFile }