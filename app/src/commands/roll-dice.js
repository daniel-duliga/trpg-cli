var inquirer = require('inquirer')

class RollDiceCommand {
  name = 'Roll dice'

  execute() {
    return inquirer
      .prompt([
        {
          type: 'input',
          name: 'formula',
          message: 'Formula:',
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
        result += this.roll(count, dice)
      }
    }

    console.log('Result: ', result)
  }

  roll(count, dice) {
    let message = `Rolling ${count}d${dice}: `

    let result = 0

    if (dice === 1) {
      result = +count
      message += `${result}`
    } else {
      while (count > 0) {
        let roll = 1 + Math.floor(Math.random() * dice)
        message += `${roll}, `
        result += roll
        count--
      }
      message = message.slice(0, message.length - 2)
    }
    
    console.log(message)

    return result
  }
}

module.exports = RollDiceCommand
