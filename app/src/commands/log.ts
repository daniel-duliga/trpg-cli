import inquirer from 'inquirer'
import { CommandBase } from './command-base'

export class LogCommand extends CommandBase {
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
