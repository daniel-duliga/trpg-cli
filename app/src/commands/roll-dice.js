import inquirer from 'inquirer'

import { logProgress, logResult } from '../utils/console-util.js'
import { parse } from '../utils/dice-util.js'

export default class RollDiceCommand {
  name = '🎲 Roll dice'

  execute() {
    return inquirer
      .prompt([
        {
          type: 'input',
          name: 'formula',
          message: 'Dice formula:',
        },
      ])
      .then((answers) => {
        const [result, messages] = parse(answers.formula)
        for (const message of messages) {
          logProgress(message)
        }
        logResult(result)
        return
      })
  }
}