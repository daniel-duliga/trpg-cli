import inquirer from 'inquirer'
import { BaseCommand } from './base-command'

export class LogCommand extends BaseCommand {
  name = '✒️ Log'

  execute(): Promise<boolean> {
    return inquirer
      .prompt({
        type: 'input',
        name: 'log',
        message: "Log:",
      })
      .then(() => super.execute())
  }
}
