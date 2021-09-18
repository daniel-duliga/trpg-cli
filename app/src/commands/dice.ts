import inquirer from 'inquirer'
import { ConsoleUtil } from '../utils/console-util'
import { DiceUtil } from '../utils/dice-util'

import { CommandBase } from './command-base'

export class DiceCommand extends CommandBase {
  name = '🎲 Dice'

  execute(): Promise<boolean> {
    return inquirer
      .prompt([
        {
          type: 'input',
          name: 'formula',
          message: 'Dice formula:',
        },
      ])
      .then((answer) => {
        const rollResult = DiceUtil.rollDiceFormula(answer.formula)
        for (const message of rollResult.messages) {
          ConsoleUtil.logProgress(message)
        }
        ConsoleUtil.logStringResult(rollResult.value.toString())
        return super.execute()
      })
  }
}