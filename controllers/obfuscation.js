const {fastify, fs, util, path, uuidv4, pump} = require('../imports.js')

const obfuscator = (id, metadata) => {
    
    folder_path = './files/' + id + '/'
    base = process.cwd()

    // Create config file
    config_file = folder_path + id + ".crproj"


    // Construct config file
    // Basic structure
    line = '<project outputDir="' + base + '\\files\\' + id + '\\Confused" baseDir="' + base + '\\files" xmlns="http://confuser.codeplex.com">\n'
    fs.appendFileSync(config_file, line, (err) => {if (err) throw err})
    line = '  <rule pattern="true" inherit="false">\n'
    fs.appendFileSync(config_file, line, (err) => {if (err) throw err})

    // Add flags
    metadata.flags.forEach(flag => {
        line = '    <protection id="' + flag + '" />\n'
        fs.appendFileSync(config_file, line, (err) => {if (err) throw err})
    });

    // Continued structure
    line = '  </rule>\n'
    fs.appendFileSync(config_file, line, (err) => {if (err) throw err})

    // Add files
    metadata.files.forEach(file => {
        line = '  <module path="' + file + '" />\n'
        fs.appendFileSync(config_file, line, (err) => {if (err) throw err})
    })

    // Finish structure
    line = '</project>'
    fs.appendFileSync(config_file, line, (err) => {if (err) throw err})


}

    


module.exports = { obfuscator }