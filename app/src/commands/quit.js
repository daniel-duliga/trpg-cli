export default class QuitCommand {
    name = 'Quit'
    
    execute() {
        process.exit()
    }
}