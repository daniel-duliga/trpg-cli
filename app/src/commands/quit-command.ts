import { BaseCommand } from "./base-command"

export class QuitCommand extends BaseCommand {
    name = '❌ Quit'
    
    execute() {
        return process.exit()
    }
}