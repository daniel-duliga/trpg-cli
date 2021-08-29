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