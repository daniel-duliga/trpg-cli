class QuitCommand {
    name = 'Quit'
    
    execute() {
        process.exit()
    }
}
module.exports = QuitCommand