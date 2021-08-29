export class QuitCommand {
    name = 'Quit'
    
    execute() {
        process.exit()
    }
}