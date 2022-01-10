const {fastify, fs, util, path, uuidv4, pump, exec} = require('../imports.js')

const confuserConfig = (id, metadata) => {
    
    folder_path = './files/' + id + '/'
    base = process.cwd()

    // Create config file
    config_file = folder_path + id + ".crproj"


    // Construct config file
    // Basic structure
    line = '<project outputDir="' + base + '\\files\\' + id + '\\Confused" baseDir="' + base + '\\files\\' + id + '\\" xmlns="http://confuser.codeplex.com">\n'
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

const runConfuser = async (id,metadata) => {

    // TODO find a beter way to store the location of the confuser binary
    base = process.cwd()
    const ConfuserExPath = 'CHANGEME '
    folder_path = './files/' + id + '/'
    config_file = folder_path + id + ".crproj"

    // Run ConfuserEx and store the output
    try {
        await exec(ConfuserExPath + config_file)
    } catch (error) {
        return error.stdout
    }
}

const confuserError = async (id,metadata) => {

}
    


module.exports = { confuserConfig, runConfuser }
