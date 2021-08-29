import inquirer from 'inquirer'

import { logProgress, logResult } from '../utils/console-util.js'
import { rollDice } from '../utils/dice-util.js'

export default class RollDiceCommand {
  name = 'Roll dice'

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
        return this.parse(answers.formula)
      })
  }

  parse(formula) {
    const operatorsRegEx = /[+]/g

    let diceArray = formula.split(operatorsRegEx)
    diceArray = diceArray.map((element) => element.trim())

    // Not used for now:
    // const operators = formula.match(operatorsRegEx)

    let result = 0
    while (diceArray.length > 0) {
      const diceRoll = diceArray.pop().split('d')
      if (diceRoll.length > 0) {
        const count = diceRoll[0]
        const dice = diceRoll.length > 1 ? diceRoll[1] : 1
        const [roll, message] = rollDice(count, dice)
        result += roll
        logProgress(message)
      }
    }

    logResult(result)
  }
}