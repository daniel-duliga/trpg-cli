export class DiceUtil {
  
  static rollDiceFormula(formula: string): DiceRoll {
    const operatorsRegEx = /[+]/g

    let diceArray = formula.split(operatorsRegEx)
    diceArray = diceArray.map((element) => element.trim())

    // Not used for now:
    // const operators = formula.match(operatorsRegEx)

    const result = new DiceRoll()
    while (diceArray.length > 0) {
      const formulaPart = diceArray.pop()
      if (formulaPart) {
        const formulaParts = formulaPart.split('d')
        if (formulaParts.length > 0) {
          const count = +formulaParts[0]
          const dice = formulaParts.length > 1 ? +formulaParts[1] : 1
          const diceRollResult = DiceUtil.rollDice(count, dice)
          result.value += diceRollResult.value
          result.messages.push(diceRollResult.message)
        }
      }
    }

    return result
  }

  static rollDice(count: number, dice: number): IndividualDiceRoll {
    let message = `Rolling ${count}d${dice}: `
    let result = 0

    if (dice === 1) {
      result = +count
      message += `${result}`
    } else {
      while (count > 0) {
        const roll = 1 + Math.floor(Math.random() * dice)
        message += `${roll}, `
        result += roll
        count--
      }
      message = message.slice(0, message.length - 2)
    }

    return new IndividualDiceRoll(result, message)
  }
}

class DiceRoll {
  constructor(
    public value: number = 0,
    public messages: string[] = []
  ) { }
}
class IndividualDiceRoll {
  constructor(
    public value: number,
    public message: string
  ) { }
}