import { CommandBase } from "./command-base"

export class QuitCommand extends CommandBase {
    name = '❌ Quit'
    
    execute() {
        return process.exit()
    }
}