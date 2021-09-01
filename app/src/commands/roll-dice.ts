import inquirer from 'inquirer'

import { logProgress, logResult } from '../utils/console-util'
import { rollDiceFormula } from '../utils/dice-util'
import { CommandBase } from './base-command'

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
        const rollResult = rollDiceFormula(answers.formula)
        for (const message of rollResult.messages) {
          logProgress(message)
        }
        logResult(rollResult.value.toString())
        return new Promise(resolve => resolve(true));
      })
  }
}