import inquirer from 'inquirer'
import { ConsoleUtil } from '../utils/console-util'
import { DiceUtil } from '../utils/dice-util'

import { CommandBase } from './command-base'

export class RollDiceCommand extends CommandBase {
  name = '🎲 Roll dice'

  execute(): Promise<boolean> {
    return inquirer
      .prompt([
        {
          type: 'input',
          name: 'formula',
          message: 'Dice formula:',
        },
      ])
      .then((answers) => {
        const rollResult = DiceUtil.rollDiceFormula(answers.formula)
        for (const message of rollResult.messages) {
          ConsoleUtil.logProgress(message)
        }
        ConsoleUtil.logResult(rollResult.value.toString())
        return super.execute()
      })
  }
}