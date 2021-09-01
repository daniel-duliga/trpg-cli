export function parse(formula) {
  const operatorsRegEx = /[+]/g

  let diceArray = formula.split(operatorsRegEx)
  diceArray = diceArray.map((element) => element.trim())

  // Not used for now:
  // const operators = formula.match(operatorsRegEx)

  let result = 0
  let messages = []
  while (diceArray.length > 0) {
    const diceRoll = diceArray.pop().split('d')
    if (diceRoll.length > 0) {
      const count = diceRoll[0]
      const dice = diceRoll.length > 1 ? diceRoll[1] : 1
      const [roll, rollMessage] = rollDice(count, dice)
      result += roll
      messages.push(rollMessage)
    }
  }

  return [result, messages]
}

export function rollDice(count, dice) {
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
  
    return [result, message]
  }