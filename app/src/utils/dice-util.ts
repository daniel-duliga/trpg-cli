class DiceRoll {
  constructor(
    public value: number = 0,
    public messages: string[] = []
  ) {}
}

export function rollDiceFormula(formula: string): DiceRoll {
  const operatorsRegEx = /[+]/g

  let diceArray = formula.split(operatorsRegEx)
  diceArray = diceArray.map((element) => element.trim())

  // Not used for now:
  // const operators = formula.match(operatorsRegEx)

  let result = new DiceRoll();
  while (diceArray.length > 0) {
    let formulaPart = diceArray.pop()
    if (formulaPart) {
      const formulaParts = formulaPart.split('d')
      if (formulaParts.length > 0) {
        const count = +formulaParts[0]
        const dice = formulaParts.length > 1 ? +formulaParts[1] : 1
        const diceRollResult = rollDice(count, dice)
        result.value += diceRollResult.value;
        result.messages.push(diceRollResult.message);
      }
    }
  }

  return result;
}

class IndividualDiceRoll {
  constructor(
    public value: number,
    public message: string
  ) {}
}

export function rollDice(count: number, dice: number): IndividualDiceRoll {
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
  
    return new IndividualDiceRoll(result, message)
  }