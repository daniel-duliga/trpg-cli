import inquirer from 'inquirer'
import { ConsoleUtil } from '../utils/console-util'
import { Dice } from '../trpg/dice'

import { CommandBase } from './command-base'

export class DiceCommand extends CommandBase {
  name = '🎲 Roll Dice'

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
        const rollResult = Dice.rollDiceFormula(answer.formula)
        for (const message of rollResult.messages) {
          ConsoleUtil.logProgress(message)
        }
        ConsoleUtil.logStringResult(rollResult.value.toString())
        return super.execute()
      })
  }
}