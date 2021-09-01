import { CommandBase } from "./base-command"

export class QuitCommand extends CommandBase {
    name = '❌ Quit'
    
    execute() {
        return process.exit()
    }
}